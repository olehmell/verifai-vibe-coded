import React from 'react';
import { ShieldCheck, ArrowRight, BrainCircuit, Globe, Zap, Search } from 'lucide-react';

interface LandingPageProps {
  onNavigate: (page: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] pb-12">
      
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto px-6 pt-12 pb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-blue-700 font-semibold text-sm mb-8">
          <Zap className="w-4 h-4 fill-current" />
          <span>Powered by Gemini 3.0 Pro & Google Search</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-tight">
          Truth in the age of <br/>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Artificial Intelligence
          </span>
        </h1>
        
        <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          VerifAI combines advanced psychological analysis, historical context, and real-time fact-checking to detect manipulation and verify claims instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button 
            onClick={() => onNavigate('app')}
            className="px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex items-center gap-2 group"
          >
            Launch Verifier
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('architecture')}
            className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-full font-bold text-lg hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            How it works
          </button>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6 w-full animate-fade-in-up delay-200">
        
        {/* Context Card */}
        <div 
          onClick={() => onNavigate('context')}
          className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-blue-100 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Context: Why?</h3>
            <p className="text-slate-600 leading-relaxed">
              Misinformation is a global threat. Understand the mission behind VerifAI and its potential impact on information integrity.
            </p>
            <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
              Read Manifesto <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Tech Card */}
        <div 
          onClick={() => onNavigate('architecture')}
          className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl border border-slate-100 hover:border-purple-100 transition-all cursor-pointer relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-full -mr-16 -mt-16 opacity-50 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Architecture: How?</h3>
            <p className="text-slate-600 leading-relaxed">
              Dive into our Multi-Agent System powered by Gemini 3. See how we chain reasoning, narrative extraction, and search grounding.
            </p>
            <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
              View Architecture <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </div>

        {/* Demo Card */}
        <div 
          onClick={() => onNavigate('app')}
          className="group bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all cursor-pointer relative overflow-hidden text-white"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-16 -mt-16 group-hover:scale-125 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-white mb-6 backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-3">Try the Demo</h3>
            <p className="text-slate-300 leading-relaxed">
              Experience the power of Gemini 3 directly. Verify links and text with our live tool.
            </p>
            <div className="mt-6 flex items-center text-white font-semibold group-hover:translate-x-2 transition-transform">
              Start Now <Zap className="w-4 h-4 ml-2 fill-current" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LandingPage;