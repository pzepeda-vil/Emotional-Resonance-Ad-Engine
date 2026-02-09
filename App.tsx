
import React, { useState, useCallback } from 'react';
import { generateAdCopy } from './services/geminiService';
import { AdCopy, FormState } from './types';
import { TARGET_PLATFORMS, AD_COPY_GOALS, TONE_PREFERENCES } from './constants';
import Input from './components/Input';
import Select from './components/Select';
import Button from './components/Button';
import AdCopyDisplay from './components/AdCopyDisplay';
import LoadingSpinner from './components/LoadingSpinner';

const App: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    brandName: '',
    platform: TARGET_PLATFORMS[0],
    goal: AD_COPY_GOALS[0],
    tone: TONE_PREFERENCES[0],
  });
  const [adCopy, setAdCopy] = useState<AdCopy | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSubmittedBrand, setLastSubmittedBrand] = useState<string>('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.brandName.trim()) {
      setError('Please enter a brand or product name.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAdCopy(null);
    setLastSubmittedBrand(formState.brandName);

    try {
      const result = await generateAdCopy(formState);
      setAdCopy(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-indigo-950 text-gray-200 font-sans flex items-center justify-center p-4">
      <main className="w-full max-w-2xl mx-auto py-12">
        <div className="text-center mb-10 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-indigo-600/30 border border-indigo-500 rounded-full text-xs font-bold uppercase tracking-widest text-indigo-300">
            Powered by Gemini AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Emotional Resonance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Ad Engine</span>
          </h1>
          <p className="text-indigo-200/70 max-w-xl mx-auto text-lg">
            Scan real-world reviews and sentiment to craft campaign copy that truly resonates.
          </p>
        </div>

        <div className="bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl border border-indigo-800/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              id="brandName"
              name="brandName"
              label="Brand/Product to Analyze"
              value={formState.brandName}
              onChange={handleChange}
              placeholder="e.g., 'Aero Sneakers' or 'FreshBrew Coffee'"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Select
                id="platform"
                name="platform"
                label="Target Platform"
                value={formState.platform}
                onChange={handleChange}
                options={TARGET_PLATFORMS}
              />
              <Select
                id="goal"
                name="goal"
                label="Ad Campaign Goal"
                value={formState.goal}
                onChange={handleChange}
                options={AD_COPY_GOALS}
              />
              <Select
                id="tone"
                name="tone"
                label="Tone"
                value={formState.tone}
                onChange={handleChange}
                options={TONE_PREFERENCES}
              />
            </div>
            <Button type="submit" isLoading={isLoading}>
              Analyze Sentiment & Generate
            </Button>
          </form>
        </div>

        <div className="mt-10 min-h-[100px]">
          {isLoading && <LoadingSpinner />}
          {error && (
            <div className="text-center animate-shake">
              <div className="inline-block text-red-400 bg-red-900/30 border border-red-800 p-4 rounded-xl">
                <p className="font-semibold mb-1">Error</p>
                <p className="text-sm opacity-90">{error}</p>
              </div>
            </div>
          )}
          {adCopy && !isLoading && (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <AdCopyDisplay adCopy={adCopy} brandName={lastSubmittedBrand} />
             </div>
          )}
          {!isLoading && !error && !adCopy && (
            <div className="text-center text-indigo-400/50 p-12 border-2 border-dashed border-indigo-900 rounded-3xl">
              <svg className="mx-auto h-12 w-12 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <p className="text-lg font-medium">Your creative insights will appear here.</p>
              <p className="text-sm mt-1">Ready to find the perfect resonance?</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
