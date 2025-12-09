import { GoogleGenAI } from "@google/genai";
import { VerificationResult, InputType, ManipulationTechnique } from "../types";

const processEnvApiKey = process.env.API_KEY;

if (!processEnvApiKey) {
  console.error("API_KEY is missing from environment variables.");
}

const ai = new GoogleGenAI({ apiKey: processEnvApiKey || "" });

// --- PROMPT TEMPLATES & CONSTANTS ---

const MANIPULATION_TECHNIQUE_DESCRIPTIONS: Record<string, string> = {
  "emotional_manipulation": "Емоційна маніпуляція - Використовує експресивну мову з сильним емоційним забарвленням або ейфорійний тон для підняття бойового духу та впливу на думку",
  "fear_appeals": "Апеляції до страху - Грає на страхах, стереотипах чи упередженнях. Включає тактики страху, невизначеності та сумнівів (FUD)",
  "bandwagon_effect": "Ефект натовпу - Використовує загальні позитивні концепції або заклики до мас ('всі так думають') для заохочення згоди",
  "selective_truth": "Селективна правда - Використовує логічні помилки, такі як вибірковий відбір фактів, whataboutism для відвернення критики, або створення опудальних аргументів",
  "cliche": "Думко-припиняючі кліше - Використовує формульні фрази, розроблені для припинення критичного мислення та завершення дискусії. Приклади: 'Все не так однозначно', 'Де ви були 8 років?'"
};

const MANIPULATION_CLASSIFIER_SYSTEM_PROMPT = `You are an expert content analyst specializing in detecting manipulation techniques and disinformation in Ukrainian-language content. Your expertise includes:

- Identifying psychological manipulation tactics
- Recognizing disinformation patterns
- Analyzing emotional and logical manipulation techniques
- Maintaining objectivity and critical thinking in analysis

Your task is to analyze content for manipulation techniques and provide structured, accurate assessments. Always respond in Ukrainian language.`;

const NARRATIVE_EXPLANATION_SYSTEM_PROMPT = `You are an expert analyst of the Ukrainian information space. Your goal is to explain narratives from a Ukrainian perspective.
You have deep knowledge of Ukrainian history, culture, and the current socio-political context.
Your explanations should be objective but grounded in the Ukrainian national interest and perspective.
Keep your responses concise, focused, and directly addressing the context.
Always respond in Ukrainian.`;

const FACT_CHECKER_SYSTEM_PROMPT = `You are an expert fact-checker and search query analyst specializing in verifying claims in Ukrainian-language content. Your expertise includes:

- Generating precise, factual search queries
- Analyzing search results for factual accuracy
- Identifying verifiable claims vs. opinions
- Cross-referencing multiple sources for verification

Your task is to create effective search queries and analyze fact-checking results. Always respond in Ukrainian language for outputs.`;

const VERIFIER_SYSTEM_PROMPT = `You are an expert content verification analyst specializing in synthesizing multi-source analysis results. Your expertise includes:

- Integrating manipulation detection, narrative analysis, and fact-checking results
- Making final determinations about content credibility
- Identifying disinformation patterns
- Providing clear, structured explanations of verification findings

Your task is to synthesize all analysis results and provide a final structured assessment. Always respond in Ukrainian language for outputs.`;

// --- HELPERS ---

const getCurrentDate = () => new Date().toLocaleDateString('uk-UA', { year: 'numeric', month: 'long', day: 'numeric' });

// --- PROMPT BUILDERS ---

function buildManipulationClassifierPrompt(content: string): string {
  const techniquesDescriptionsText = Object.entries(MANIPULATION_TECHNIQUE_DESCRIPTIONS)
    .map(([name, desc]) => `- ${name}: ${desc}`)
    .join("\n");

  return `Your task is to analyze Ukrainian-language content for manipulation techniques and disinformation patterns.

Context:
- You are analyzing content that may contain psychological manipulation or disinformation
- The results will be used by a fact-checking system to identify potentially misleading content
- This analysis is part of a multi-agent verification pipeline

Available manipulation techniques:
${techniquesDescriptionsText}

Instructions:
1. Carefully read the entire content
2. Identify any manipulation techniques from the list above
3. Assess the overall manipulation probability (0.0 = no manipulation, 1.0 = strong manipulation)
4. Only include techniques that are clearly present in the content
5. Be objective and critical - do not overclassify or underclassify
6. If no manipulation is detected, set manipulation_probability = 0.0 and manipulation_techniques = []

Output format:
Provide your analysis as a JSON object with exactly this structure:
{
    "manipulation_probability": float (0.0 to 1.0),
    "manipulation_techniques": [array of technique names from the list]
}

Examples:

<example>
Input: "Всі нормальні люди підтримують цю ідею. Якщо ви не згодні, ви просто не розумієте ситуацію."
Analysis:
- Uses bandwagon effect ("всі нормальні люди")
- Uses emotional manipulation through pressure and exclusion
- Low manipulation probability as it's relatively mild

Output:
{
    "manipulation_probability": 0.4,
    "manipulation_techniques": ["bandwagon_effect", "emotional_manipulation"]
}
</example>

Now analyze this content:

Content to analyze:
${content}

Provide your analysis as a JSON object only, without any additional text or explanation.`;
}

function buildFactCheckPrompt(content: string, narrative: string): string {
  const currentDate = getCurrentDate();
  return `Your task is to verify the factual accuracy of the following content.

Current Date: ${currentDate}

Content: ${content}
Extracted Narrative: ${narrative}

Instructions:
1. Identify verifiable factual claims, statistics, and events.
2. Verify them against authoritative sources using the Google Search tool.
3. Determine the publication date or timeframe of the events described.
4. Verify if the facts were true *at the time they occurred*.
5. CRITICAL: Do NOT classify content as false or misleading simply because it is old.
   - If the content is an old news report (e.g., from 2022) and accurately describes events from 2022, it is FACTUAL.
   - Only classify as misleading if the content explicitly claims to be happening *now* (on ${currentDate}) when it actually happened in the past.
6. Provide a concise analysis citing sources found.

Focus on:
- Verification of facts relative to their specific timeframe
- Accurate dating of the events
- Overall assessment of factual accuracy
- References to sources used
`;
}

function buildExplanationPrompt(narrative: string, content: string, searchResults: any[] = []): string {
  const currentDate = getCurrentDate();
  let context = "";
  if (searchResults.length > 0) {
    context = "\n\nSearch Results for Context:\n" + searchResults.map(r => `- ${r.snippet || r.text}`).slice(0, 5).join("\n");
  }

  return `Analyze the following narrative from a Ukrainian perspective.

Current Date: ${currentDate}
Narrative: ${narrative}
Content: ${content}
${context}

Provide a concise explanation (max 3-4 sentences) that:
1. Clearly identifies when the event took place (e.g., "This event occurred in [Year/Date]...").
2. Explains the context of that time. Do not judge it from today's perspective (e.g. don't say "this is irrelevant now"), but explain what it meant *then* and its historical significance.
3. Explains the Ukrainian context/POV.
4. Only mention "outdated" if the content is falsely presented as breaking news.

Format the response as a short, clear paragraph in Ukrainian.`;
}

function buildVerifierPrompt(
  content: string,
  manipulationProbability: number,
  manipulationTechniques: string[],
  narrative: string,
  factCheckResults: string,
  narrativeExplanation: string
): string {
  return `Your task is to synthesize all analysis results from a multi-agent verification system and provide a final structured assessment of Ukrainian-language content.

Context:
- You are the final step in a multi-agent fact-checking and manipulation detection pipeline
- Previous agents have analyzed manipulation techniques, extracted narratives, and fact-checked claims
- Your output will be used to inform users about content credibility
- The manipulation threshold is 0.15 - content with probability >= 0.15 is considered manipulative

Input data:
- Original content
- Manipulation analysis results
- Extracted narrative
- Fact-checking results
- Narrative explanation (Ukrainian POV)

Instructions:
1. Review all analysis results comprehensively.
2. Determine if manipulation is present (probability >= 0.15 AND techniques found).
3. Identify specific disinformation items (false claims, contradictions, etc.).
4. HANDLE OLD NEWS CORRECTLY:
   - If the content is old but factually accurate for its time, it is Credible/True. Do NOT mark it as Disinformation.
   - Do NOT penalize the credibility score for old news unless it is deceptively presented as new.
5. Ensure consistency between manipulation detection, narrative, and fact-check results.
6. Provide a clear explanation of the overall assessment.
7. Format your response as JSON only.

Output format:
Provide your assessment as a JSON object with exactly this structure:
{
    "manipulation": boolean (true if probability >= 0.15 AND techniques found),
    "techniques": [array of detected manipulation techniques],
    "disinfo": [array of disinformation items, format: "claim: explanation"],
    "explanation": "Overall summary in Ukrainian explaining the complete analysis"
}

ORIGINAL CONTENT:
${content}

MANIPULATION ANALYSIS:
- Probability: ${manipulationProbability.toFixed(3)}
- Detected techniques: ${JSON.stringify(manipulationTechniques)}

NARRATIVE EXTRACTION:
${narrative}

FACT-CHECK RESULTS:
${factCheckResults}

NARRATIVE EXPLANATION (Ukrainian POV):
${narrativeExplanation}

Provide your final assessment as a JSON object only, without any additional text or explanation.`;
}

// --- MAIN SERVICE ---

export const verifyContent = async (
  type: InputType,
  content: string
): Promise<VerificationResult> => {
  const modelId = "gemini-3-pro-preview"; // Using Gemini 3 as requested

  try {
    // --- Step 1: Parallel Execution of Manipulation Analysis and Narrative Extraction ---
    
    // 1.1 Manipulation Analysis
    const manipulationPromise = ai.models.generateContent({
      model: modelId,
      contents: buildManipulationClassifierPrompt(content),
      config: {
        systemInstruction: MANIPULATION_CLASSIFIER_SYSTEM_PROMPT,
        responseMimeType: "application/json"
      }
    });

    // 1.2 Narrative Extraction
    const narrativePromise = ai.models.generateContent({
      model: modelId,
      contents: `Analyze the following content and extract the underlying narrative or main claim in 1-2 concise sentences in Ukrainian.\n\nContent: ${content}`,
      config: {
        systemInstruction: "You are a precise content analyst. Return only the extracted narrative string."
      }
    });

    const [manipulationRes, narrativeRes] = await Promise.all([
      manipulationPromise,
      narrativePromise
    ]);

    const manipulationData = JSON.parse(manipulationRes.text || '{"manipulation_probability": 0, "manipulation_techniques": []}');
    const narrative = narrativeRes.text || "Narrative not extracted.";

    // --- Step 2: Fact Checking (Sequential - needs Narrative) ---
    // Using Google Search Tool
    const factCheckPromise = ai.models.generateContent({
      model: modelId,
      contents: buildFactCheckPrompt(content, narrative),
      config: {
        systemInstruction: FACT_CHECKER_SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }]
      }
    });

    const factCheckRes = await factCheckPromise;
    const factCheckText = factCheckRes.text || "No fact check analysis available.";
    
    // Extract sources and snippets from grounding metadata
    const chunks = factCheckRes.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .map((chunk: any) => chunk.web ? { title: chunk.web.title, uri: chunk.web.uri } : null)
      .filter((s: any) => s !== null);
    
    const searchSnippets = chunks
      .filter((chunk: any) => chunk.web)
      .map((chunk: any) => ({ snippet: chunk.web.title, url: chunk.web.uri }));

    // --- Step 3: Narrative Explanation (Ukrainian POV) ---
    // Depends on narrative and search results
    const explanationRes = await ai.models.generateContent({
      model: modelId,
      contents: buildExplanationPrompt(narrative, content, searchSnippets),
      config: {
        systemInstruction: NARRATIVE_EXPLANATION_SYSTEM_PROMPT
      }
    });

    const narrativeExplanation = explanationRes.text || "No explanation available.";

    // --- Step 4: Final Verification Synthesis ---
    const finalVerifierRes = await ai.models.generateContent({
      model: modelId,
      contents: buildVerifierPrompt(
        content,
        manipulationData.manipulation_probability,
        manipulationData.manipulation_techniques,
        narrative,
        factCheckText,
        narrativeExplanation
      ),
      config: {
        systemInstruction: VERIFIER_SYSTEM_PROMPT,
        responseMimeType: "application/json"
      }
    });

    const finalData = JSON.parse(finalVerifierRes.text || '{}');

    // --- Construct Final Result ---
    
    // Map technique IDs back to full objects
    const techniques: ManipulationTechnique[] = (manipulationData.manipulation_techniques || []).map((id: string) => ({
      id,
      name: MANIPULATION_TECHNIQUE_DESCRIPTIONS[id]?.split(' - ')[0] || id,
      description: MANIPULATION_TECHNIQUE_DESCRIPTIONS[id] || "Detected technique"
    }));

    // Calculate a score based on manipulation probability and checking
    let finalScore = Math.round(100 - (manipulationData.manipulation_probability * 100));
    
    // Adjust score if final verifier flagged it as manipulation explicitly
    if (finalData.manipulation && finalScore > 40) {
      finalScore = Math.min(finalScore, 35); // Cap at low credibility
    }

    const uniqueSources = sources.filter((v: any, i: any, a: any) => a.findIndex((v2: any) => (v2.uri === v.uri)) === i);

    return {
      score: finalScore,
      summary: finalData.explanation || factCheckText, // Use the synthesized explanation
      details: [
        narrative ? `Narrative: ${narrative}` : null,
        ... (finalData.disinfo || []).map((d: string) => `Disinfo: ${d}`)
      ].filter(Boolean) as string[],
      redFlags: (finalData.disinfo || []),
      confidence: "High",
      sources: uniqueSources,
      manipulation: {
        probability: manipulationData.manipulation_probability,
        techniques: techniques
      },
      narrative: narrative,
      narrativeExplanation: narrativeExplanation,
      disinfo: finalData.disinfo
    };

  } catch (error) {
    console.error("Gemini Verification Pipeline Error:", error);
    throw new Error("Failed to verify content. Please check your API key or connection.");
  }
};