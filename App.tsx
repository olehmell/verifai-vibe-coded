import React, { useState } from 'react';
import { ShieldCheck, Home, Info, Layers, Play } from 'lucide-react';
import { InputType, VerificationResult } from './types';
import { verifyContent } from './services/geminiService';
import InputSection from './components/InputSection';
import ResultsSection from './components/ResultsSection';
import LandingPage from './components/LandingPage';
import ContextPage from './components/ContextPage';
import ArchitecturePage from './components/ArchitecturePage';

type Page = 'landing' | 'app' | 'context' | 'architecture';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (type: InputType, content: string) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await verifyContent(type, content);
      setResult(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong during verification.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-100">
      
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 bg-opacity-90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo / Home Link */}
          <div 
            onClick={() => navigateTo('landing')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-700">
              VerifAI
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1 rounded-full">
            <button 
              onClick={() => navigateTo('landing')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${currentPage === 'landing' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Home className="w-4 h-4" /> Home
            </button>
            <button 
              onClick={() => navigateTo('context')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${currentPage === 'context' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Info className="w-4 h-4" /> Context
            </button>
            <button 
              onClick={() => navigateTo('architecture')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${currentPage === 'architecture' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Layers className="w-4 h-4" /> Architecture
            </button>
            <button 
              onClick={() => navigateTo('app')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${currentPage === 'app' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              <Play className="w-4 h-4" /> Launch App
            </button>
          </nav>

          {/* Mobile Nav Button (Simplified for this version) */}
          <div className="md:hidden">
            <button onClick={() => navigateTo('app')} className="text-blue-600 font-bold text-sm">
              Launch App
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full">
        
        {currentPage === 'landing' && (
          <LandingPage onNavigate={navigateTo} />
        )}

        {currentPage === 'context' && (
          <ContextPage onNavigate={navigateTo} />
        )}

        {currentPage === 'architecture' && (
          <ArchitecturePage onNavigate={navigateTo} />
        )}

        {currentPage === 'app' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {!result && !isLoading && (
              <div className="text-center mb-12 animate-fade-in">
                <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4 tracking-tight">
                  Verify links & claims in <span className="text-blue-600">seconds</span>.
                </h1>
                <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                  Combating misinformation with AI. VerifAI uses Gemini's advanced reasoning and Google Search to cross-reference facts instantly.
                </p>
              </div>
            )}

            {!result && (
              <div className="animate-fade-in-up">
                <InputSection onVerify={handleVerify} isLoading={isLoading} />
                {error && (
                  <div className="mt-6 max-w-2xl mx-auto p-4 bg-red-50 text-red-700 border border-red-200 rounded-xl text-center">
                    {error}
                  </div>
                )}
              </div>
            )}

            {result && (
              <ResultsSection result={result} onReset={handleReset} />
            )}
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="bg-slate-50 border-t border-slate-200 py-12 text-center text-slate-400 text-sm">
        <p>© {new Date().getFullYear()} VerifAI Project. Built with Gemini 3.0 Pro for the Vibe Coding Hackathon.</p>
        <div className="flex justify-center gap-4 mt-4">
           <button onClick={() => navigateTo('context')} className="hover:text-blue-600 transition-colors">Impact</button>
           <button onClick={() => navigateTo('architecture')} className="hover:text-blue-600 transition-colors">Technology</button>
        </div>
      </footer>
    </div>
  );
};

export default App;