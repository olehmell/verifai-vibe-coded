import React from 'react';
import { VerificationResult } from '../types';
import Gauge from './Gauge';
import { 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  ExternalLink, 
  Info,
  BrainCircuit,
  Zap,
  BookOpen,
  Flag
} from 'lucide-react';

interface ResultsSectionProps {
  result: VerificationResult;
  onReset: () => void;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ result, onReset }) => {
  
  const getScoreLabel = (score: number) => {
    if (score >= 80) return { text: "High Trust Score", color: "text-green-600", bg: "bg-green-50", icon: <CheckCircle className="w-6 h-6" /> };
    if (score >= 50) return { text: "Mixed Credibility", color: "text-yellow-600", bg: "bg-yellow-50", icon: <Info className="w-6 h-6" /> };
    return { text: "Low Trust Score", color: "text-red-600", bg: "bg-red-50", icon: <XCircle className="w-6 h-6" /> };
  };

  const status = getScoreLabel(result.score);
  const manipulationProb = result.manipulation?.probability || 0;
  const isHighManipulation = manipulationProb > 0.15;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 animate-fade-in-up pb-12">
      {/* Header Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            
            {/* Gauge Section */}
            <div className="w-64 flex-shrink-0 flex flex-col items-center">
              <Gauge score={result.score} />
              <span className="text-xs text-slate-400 mt-2 font-medium">TRUST SCORE</span>
            </div>

            {/* Summary Section */}
            <div className="flex-1 space-y-4">
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${status.bg} ${status.color} font-bold text-lg`}>
                {status.icon}
                <span>{status.text}</span>
              </div>
              <p className="text-slate-700 text-lg leading-relaxed font-medium">
                {result.summary}
              </p>
              
              {result.narrative && (
                <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm text-slate-600 italic">
                  <span className="font-semibold not-italic text-slate-800">Detected Narrative: </span>
                  "{result.narrative}"
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Manipulation Analysis Section */}
        <div className={`bg-white rounded-xl shadow-md overflow-hidden border ${isHighManipulation ? 'border-amber-200' : 'border-slate-100'} h-full`}>
          <div className="p-5 border-b border-slate-50 bg-slate-50/50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-purple-600" />
              Manipulation Analysis
            </h3>
            <span className={`font-bold ${isHighManipulation ? 'text-red-600' : 'text-green-600'}`}>
               {(manipulationProb * 100).toFixed(0)}% Risk
             </span>
          </div>
          
          <div className="p-5">
            {/* Progress Bar */}
            <div className="w-full bg-slate-100 rounded-full h-2 mb-6">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${isHighManipulation ? 'bg-gradient-to-r from-orange-500 to-red-600' : 'bg-green-500'}`} 
                style={{ width: `${Math.max(5, manipulationProb * 100)}%` }}
              ></div>
            </div>

            {result.manipulation?.techniques && result.manipulation.techniques.length > 0 ? (
              <div className="space-y-3">
                {result.manipulation.techniques.map((tech, idx) => (
                  <div key={idx} className="bg-slate-50 p-3 rounded-lg border border-slate-100">
                    <div className="flex items-start gap-2">
                      <Zap className="w-4 h-4 text-purple-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">{tech.name}</h4>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{tech.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-3 text-slate-500 italic text-sm">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>No active manipulation techniques detected.</span>
              </div>
            )}
          </div>
        </div>

        {/* Narrative Context Section (Ukrainian POV) */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-100 h-full flex flex-col">
          <div className="p-5 border-b border-slate-50 bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" />
              Context & Explanation
            </h3>
          </div>
          <div className="p-5 flex-1">
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
              {result.narrativeExplanation || "No additional context available."}
            </p>
          </div>
        </div>
      </div>

      {/* Disinformation & Red Flags */}
      {result.disinfo && result.disinfo.length > 0 && (
        <div className="bg-white rounded-xl shadow-md p-6 border border-red-100">
          <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Flag className="w-5 h-5 text-red-500" />
            Identified Disinformation & Issues
          </h3>
          <ul className="space-y-3">
            {result.disinfo.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 bg-red-50/50 p-3 rounded-lg border border-red-100">
                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sources */}
      <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
          <ExternalLink className="w-5 h-5 text-slate-500" />
          Verified Sources
        </h3>
        {result.sources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {result.sources.map((source, idx) => (
              <a 
                key={idx} 
                href={source.uri} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all"
              >
                <span className="text-sm font-medium text-slate-700 truncate mr-2 group-hover:text-blue-600">
                  {source.title || source.uri}
                </span>
                <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-blue-500" />
              </a>
            ))}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No specific source links were returned, but the analysis is based on general knowledge and available data.</p>
        )}
      </div>

      <div className="flex justify-center pt-8">
        <button 
          onClick={onReset}
          className="px-8 py-3 bg-white border border-slate-300 text-slate-700 font-semibold rounded-full shadow-sm hover:bg-slate-50 hover:shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0"
        >
          Verify Another Item
        </button>
      </div>
    </div>
  );
};

export default ResultsSection;