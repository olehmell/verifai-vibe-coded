import React from 'react';
import { BrainCircuit, Search, Database, Scale, ArrowDown, Zap, GitMerge, FileText, CheckCircle } from 'lucide-react';

interface ArchitecturePageProps {
  onNavigate: (page: string) => void;
}

const ArchitecturePage: React.FC<ArchitecturePageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 border border-purple-100 rounded-full text-purple-700 font-semibold text-sm mb-6">
          <BrainCircuit className="w-4 h-4" />
          <span>Technical Deep Dive</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          Built on <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">Gemini 3.0 Pro</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
          VerifAI utilizes a Multi-Agent System (MAS) architecture to simulate a human fact-checking team, leveraging Gemini 3's advanced reasoning and native grounding.
        </p>
      </div>

      {/* Architecture Diagram */}
      <div className="relative mb-20">
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-100 -ml-0.5 hidden md:block z-0"></div>
        
        {/* Step 1: Input */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-12 relative z-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 w-full md:w-80 text-center">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-600">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">User Input</h3>
            <p className="text-sm text-slate-500 mt-2">URL or Text Claim</p>
          </div>
        </div>

        {/* Step 2: Parallel Agents */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-24 mb-12 relative z-10">
           
           {/* Agent 1 */}
           <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-500 w-full">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                    <Zap className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900">Agent: Manipulation Classifier</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                 <span className="font-semibold text-slate-800">Role:</span> Expert Psychologist
              </p>
              <p className="text-sm text-slate-600">
                 Analyzes tone, logical fallacies, emotional pressure, and specific propaganda techniques (e.g., Fear Appeals, Bandwagon).
              </p>
           </div>

           {/* Agent 2 */}
           <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500 w-full">
              <div className="flex items-center gap-3 mb-4">
                 <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <Database className="w-5 h-5" />
                 </div>
                 <h3 className="font-bold text-slate-900">Agent: Narrative Analyst</h3>
              </div>
              <p className="text-sm text-slate-600 mb-3">
                 <span className="font-semibold text-slate-800">Role:</span> Historian & Context Expert
              </p>
              <p className="text-sm text-slate-600">
                 Extracts the core narrative and provides Ukrainian historical context. Identifies timeframe to prevent "future fake" errors.
              </p>
           </div>
        </div>

        {/* Step 3: Tool Use */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-12 relative z-10">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-green-200 w-full md:w-96 text-center border-t-4 border-t-green-500">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900">Agent: Fact Checker</h3>
            <p className="text-sm text-slate-500 mt-2 mb-4">Powered by Google Search Grounding</p>
            <div className="bg-green-50 p-3 rounded-lg text-xs text-left text-green-800 font-mono">
               tool: googleSearch(query)<br/>
               verify_date_context()<br/>
               cross_reference_sources()
            </div>
          </div>
        </div>

        {/* Step 4: Synthesis */}
        <div className="flex flex-col md:flex-row items-center justify-center mb-4 relative z-10">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl w-full md:w-[500px] text-white text-center ring-4 ring-slate-100">
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <Scale className="w-8 h-8 text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Final Verifier Agent</h3>
            <p className="text-slate-300 mb-6">Synthesis & Judgment</p>
            <p className="text-sm text-slate-300 leading-relaxed mb-4">
               Combines manipulation probability, narrative context, and hard facts. Resolves conflicts (e.g., "Old news is factual, not fake"). Produces the final Trust Score.
            </p>
            <div className="flex justify-center gap-2">
               <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-xs font-bold border border-green-500/30">Reasoning</span>
               <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-xs font-bold border border-blue-500/30">Grounding</span>
               <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs font-bold border border-purple-500/30">Context</span>
            </div>
          </div>
        </div>

      </div>

      {/* Capabilities Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
         <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Long Context Window</h3>
            <p className="text-sm text-slate-600">Analyzing entire articles and multiple search results simultaneously to maintain full context.</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Native Multimodality</h3>
            <p className="text-sm text-slate-600">The architecture is designed to scale to Image and Video verification in the next iteration.</p>
         </div>
         <div className="bg-white p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-900 mb-2">Advanced Reasoning</h3>
            <p className="text-sm text-slate-600">Moving beyond keyword matching to understanding nuance, satire, and complex manipulation tactics.</p>
         </div>
      </div>

      <div className="text-center">
        <button 
            onClick={() => onNavigate('app')}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            Try the Architecture
            <CheckCircle className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default ArchitecturePage;