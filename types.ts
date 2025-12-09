export interface Source {
  title: string;
  uri: string;
}

export interface ManipulationTechnique {
  id: string;
  name: string;
  description: string;
}

export interface VerificationResult {
  score: number;
  summary: string;
  details: string[];
  redFlags: string[];
  sources: Source[];
  confidence: string;
  manipulation: {
    probability: number;
    techniques: ManipulationTechnique[];
  };
  narrative?: string;
  narrativeExplanation?: string;
  disinfo?: string[];
}

export enum InputType {
  URL = 'URL',
  TEXT = 'TEXT',
}

export interface AnalysisRequest {
  type: InputType;
  content: string;
}
