
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { StepIndicator } from './components/StepIndicator';
import { Step1Upload } from './components/Step1Upload';
import { Step2Style } from './components/Step2Style';
import { Step3Brief } from './components/Step3Brief';
import { Loader } from './components/Loader';
import { analyzeContent, generateBrief } from './services/geminiService';
import type { ContentAnalysis, VideoStyle, VideoBrief, AppStep } from './types';

const App: React.FC = () => {
    const [step, setStep] = useState<AppStep>('upload');
    const [manuscript, setManuscript] = useState<string>('');
    const [analysis, setAnalysis] = useState<ContentAnalysis | null>(null);
    const [videoStyle, setVideoStyle] = useState<VideoStyle | null>(null);
    const [brief, setBrief] = useState<VideoBrief | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = useCallback(async (text: string) => {
        setManuscript(text);
        setIsLoading(true);
        setError(null);
        try {
            const result = await analyzeContent(text);
            setAnalysis(result);
            setStep('style');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred during analysis.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleGenerateBrief = useCallback(async (style: VideoStyle) => {
        if (!analysis) {
            setError('Content analysis is missing.');
            return;
        }
        setVideoStyle(style);
        setIsLoading(true);
        setError(null);
        try {
            const result = await generateBrief(analysis, style);
            setBrief(result);
            setStep('brief');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unknown error occurred while generating the brief.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [analysis]);
    
    const handleReset = () => {
        setStep('upload');
        setManuscript('');
        setAnalysis(null);
        setVideoStyle(null);
        setBrief(null);
        setError(null);
        setIsLoading(false);
    };

    const renderContent = () => {
        if (isLoading) {
            return <Loader />;
        }
        if (error) {
            return (
                <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
                    <h3 className="text-xl font-bold text-red-400">An Error Occurred</h3>
                    <p className="mt-2 text-red-300">{error}</p>
                    <button onClick={handleReset} className="mt-6 bg-brand-primary hover:bg-brand-secondary text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Start Over
                    </button>
                </div>
            );
        }
        switch (step) {
            case 'upload':
                return <Step1Upload onAnalyze={handleAnalyze} />;
            case 'style':
                return <Step2Style onGenerateBrief={handleGenerateBrief} analysis={analysis} />;
            case 'brief':
                return <Step3Brief brief={brief} setBrief={setBrief} onReset={handleReset}/>;
            default:
                return <Step1Upload onAnalyze={handleAnalyze} />;
        }
    };
    
    return (
        <div className="min-h-screen bg-base-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-5xl mx-auto">
                <Header />
                <StepIndicator currentStep={step} />
                <main className="mt-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default App;
