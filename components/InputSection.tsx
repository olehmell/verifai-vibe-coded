import React, { useState } from 'react';
import { InputType } from '../types';
import { Link, FileText, Search, Loader2, Sparkles } from 'lucide-react';

interface InputSectionProps {
  onVerify: (type: InputType, content: string) => void;
  isLoading: boolean;
}

const EXAMPLE_TEXT = `Офис Президента дал силовикам приказ для начала обыска у Кличка и его окружения, — пишет политический эксперт Светлана Кушнир.
С ближайшего понедельника маски-шоу планируют посетить мэра Киева Виталия Кличко. Причина: Кличко своими международными связями с ЕС и США, а также влиянием в Киеве раздражает Офис Президента. Кроме того, позиции ОП в столице не усиливаются – глава городской военной администрации Попко до сих пор почти не влияет на процессы в столице.
Последней каплей для ОП стало то, что Кличко поднял три десятка мэров и привез их на суд во Львов поддержать мэра Чернигова Атрошенко.
Именно поэтому на совещании в Офисе Президента решили передать «привет» Кличко. Была дана команда на Кличко для обысков, а также задача пройтись с обысками по домам его окружения, – пишет политический эксперт Светлана Кушнир.`;

const EXAMPLE_LINK = `https://www.rfi.fr/ru/%D1%83%D0%BA%D1%80%D0%B0%D0%B8%D0%BD%D0%B0/20250723-%D0%B7%D0%B5%D0%BB%D0%B5%D0%BD%D1%81%D0%BA%D0%B8%D0%B9-%D0%BF%D0%BE%D0%B4%D0%BF%D0%B8%D1%81%D0%B0%D0%BB-%D0%BE-%D0%B7%D0%B0%D0%BA%D0%BE%D0%BD-%D0%BE%D0%B1-%D0%BE%D0%B3%D1%80%D0%B0%D0%BD%D0%B8%D1%87%D0%B5%D0%BD%D0%B8%D1%8F%D1%85-%D0%B4%D0%BB%D1%8F-%D0%BD%D0%B0%D1%87%D0%B0%D0%BB%D0%B8%D1%81%D1%8C-%D0%BF%D1%80%D0%BE%D1%82%D0%B5%D1%81%D1%82%D1%8B`;

const InputSection: React.FC<InputSectionProps> = ({ onVerify, isLoading }) => {
  const [activeTab, setActiveTab] = useState<InputType>(InputType.URL);
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onVerify(activeTab, content);
  };

  const handleExampleClick = (type: InputType, text: string) => {
    setActiveTab(type);
    setContent(text);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 transform transition-all">
      {/* Tabs */}
      <div className="flex border-b border-slate-100">
        <button
          onClick={() => setActiveTab(InputType.URL)}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === InputType.URL
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <Link className="w-4 h-4" />
          Verify Link
        </button>
        <button
          onClick={() => setActiveTab(InputType.TEXT)}
          className={`flex-1 py-4 text-sm font-medium flex items-center justify-center gap-2 transition-colors ${
            activeTab === InputType.TEXT
              ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
          }`}
        >
          <FileText className="w-4 h-4" />
          Verify Text
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-8 pb-4">
        <div className="mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            {activeTab === InputType.URL ? 'Paste URL to analyze' : 'Paste text or claim to verify'}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-32 p-4 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-50 transition-all resize-none text-slate-700 placeholder:text-slate-400"
            placeholder={
              activeTab === InputType.URL
                ? 'https://example.com/article/...'
                : 'e.g., "Scientists discovered a new planet made of diamond..."'
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !content.trim()}
          className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:from-blue-700 hover:to-indigo-700 transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Verifying with Gemini...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Verify Credibility
            </>
          )}
        </button>
        
        <p className="mt-4 text-center text-xs text-slate-400">
          Powered by Gemini 3.0 Pro & Google Search Grounding
        </p>
      </form>

      {/* Examples Section */}
      <div className="px-8 pb-8 pt-2">
        <div className="border-t border-slate-100 pt-4">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
            Try a quick example:
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
             <button
                type="button"
                onClick={() => handleExampleClick(InputType.TEXT, EXAMPLE_TEXT)}
                disabled={isLoading}
                className="flex-1 flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all text-left group disabled:opacity-50"
             >
                <div className="mt-1">
                   <Sparkles className="w-4 h-4 text-orange-500" />
                </div>
                <div>
                   <span className="block text-xs font-bold text-slate-700 group-hover:text-blue-600">Manipulation Example</span>
                   <span className="block text-xs text-slate-500 line-clamp-1 mt-0.5">Political expert claims about Klitschko...</span>
                </div>
             </button>
             
             <button
                type="button"
                onClick={() => handleExampleClick(InputType.URL, EXAMPLE_LINK)}
                disabled={isLoading}
                className="flex-1 flex items-start gap-3 p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg transition-all text-left group disabled:opacity-50"
             >
                <div className="mt-1">
                   <Link className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                   <span className="block text-xs font-bold text-slate-700 group-hover:text-blue-600">Fake/Future News Example</span>
                   <span className="block text-xs text-slate-500 line-clamp-1 mt-0.5">RFI Article dated 2025 (Future)</span>
                </div>
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputSection;