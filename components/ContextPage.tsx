import React from 'react';
import { Target, Users, AlertTriangle, Shield, ArrowRight } from 'lucide-react';

interface ContextPageProps {
  onNavigate: (page: string) => void;
}

const ContextPage: React.FC<ContextPageProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
          The Cost of <span className="text-blue-600">Disinformation</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Why we built VerifAI and why the fight for truth matters now more than ever.
        </p>
      </div>

      {/* Problem Section */}
      <div className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center text-red-600 mb-6">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Cognitive Warfare</h2>
          <p className="text-slate-600 text-lg leading-relaxed mb-6">
            We are no longer just fighting "fake news." We are facing sophisticated cognitive campaigns designed to exploit psychological biases, trigger emotional responses, and erode social trust.
          </p>
          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <span>Emotional manipulation tactics</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <span>Out-of-context historical narratives</span>
            </li>
            <li className="flex items-center gap-3 text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
              <span>Pseudo-logical fallacies</span>
            </li>
          </ul>
        </div>
        <div className="bg-slate-100 rounded-2xl p-8 border border-slate-200 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
          <div className="relative z-10 space-y-6">
             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
                <p className="text-sm text-slate-500 mb-1">Social Media Post</p>
                <p className="font-medium text-slate-800">"Everyone knows the economy is collapsing! Only a fool would believe official data..."</p>
             </div>
             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-orange-500 opacity-75">
                <p className="text-sm text-slate-500 mb-1">Viral Article</p>
                <p className="font-medium text-slate-800">"Secret documents reveal the shocking truth about..."</p>
             </div>
             <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500 opacity-50">
                <p className="text-sm text-slate-500 mb-1">Messaging App</p>
                <p className="font-medium text-slate-800">"Forward this to everyone you know before they delete it!"</p>
             </div>
          </div>
        </div>
      </div>

      {/* Solution Section */}
      <div className="bg-blue-600 rounded-3xl p-10 md:p-16 text-white text-center mb-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-blue-600 to-indigo-700"></div>
        <div className="relative z-10">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-white mx-auto mb-8 backdrop-blur-sm">
            <Shield className="w-8 h-8" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Democratizing Verification</h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed mb-10">
            VerifAI empowers every citizen with the capability of a professional fact-checking team. By combining Gemini's reasoning with instant access to the world's knowledge.
          </p>
          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
               <Target className="w-6 h-6 mb-4 text-blue-300" />
               <h3 className="font-bold text-lg mb-2">Precision</h3>
               <p className="text-sm text-blue-100">Distinguishing between satire, bias, and malicious intent.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
               <Users className="w-6 h-6 mb-4 text-blue-300" />
               <h3 className="font-bold text-lg mb-2">Accessibility</h3>
               <p className="text-sm text-blue-100">No paywalls, no complex tools. Just instant truth.</p>
            </div>
            <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
               <Shield className="w-6 h-6 mb-4 text-blue-300" />
               <h3 className="font-bold text-lg mb-2">Immunity</h3>
               <p className="text-sm text-blue-100">Building societal resilience against cognitive attacks.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button 
            onClick={() => onNavigate('app')}
            className="px-8 py-4 bg-slate-900 text-white rounded-full font-bold text-lg shadow-xl hover:bg-slate-800 hover:scale-105 transition-all flex items-center gap-2 mx-auto"
          >
            Start Verifying Now
            <ArrowRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};

export default ContextPage;