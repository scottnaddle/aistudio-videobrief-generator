
import React, { useState } from 'react';

interface Step1UploadProps {
    onAnalyze: (text: string) => void;
}

export const Step1Upload: React.FC<Step1UploadProps> = ({ onAnalyze }) => {
    const [text, setText] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (text.trim()) {
            onAnalyze(text);
        }
    };

    return (
        <div className="mt-16 bg-base-200 p-6 sm:p-8 rounded-xl shadow-2xl border border-base-300">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Upload Your Manuscript</h2>
            <p className="text-text-secondary mb-6">
                Paste your manuscript content below. For best results, use plain text or Markdown. The AI will analyze the structure and key points.
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Paste your full manuscript here..."
                    className="w-full h-64 p-4 bg-base-100 border border-base-300 rounded-lg text-text-secondary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-shadow"
                />
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                        Analyze Manuscript
                    </button>
                </div>
            </form>
        </div>
    );
};
