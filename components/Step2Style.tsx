
import React, { useState } from 'react';
import type { VideoStyle, ContentAnalysis } from '../types';

interface Step2StyleProps {
    analysis: ContentAnalysis | null;
    onGenerateBrief: (style: VideoStyle) => void;
}

type StyleOption = 'format' | 'tone' | 'visualStyle' | 'platform';

export const Step2Style: React.FC<Step2StyleProps> = ({ analysis, onGenerateBrief }) => {
    const [style, setStyle] = useState<Partial<VideoStyle>>({});

    const handleSelect = (option: StyleOption, value: any) => {
        setStyle(prev => ({ ...prev, [option]: value }));
    };

    const isComplete = Object.keys(style).length === 4;

    const handleSubmit = () => {
        if (isComplete) {
            onGenerateBrief(style as VideoStyle);
        }
    };

    const options = {
        format: ['Lecture', 'Animation', 'Hybrid'],
        tone: ['Professional', 'Friendly', 'Humorous'],
        visualStyle: ['Charts & Diagrams', 'Live Action Examples', 'Minimalist Text'],
        platform: ['YouTube', 'Instagram Reels', 'Corporate Training'],
    };

    const labels = {
        format: "Video Format",
        tone: "Tone & Manner",
        visualStyle: "Visual Style",
        platform: "Target Platform"
    };

    return (
        <div className="mt-16 bg-base-200 p-6 sm:p-8 rounded-xl shadow-2xl border border-base-300">
            <h2 className="text-2xl font-bold text-text-primary mb-2">Define Your Video Style</h2>
            <p className="text-text-secondary mb-8">
                Make selections to guide the AI in crafting the perfect video brief for your content.
            </p>

            <div className="space-y-8">
                {Object.keys(options).map(key => (
                    <div key={key}>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">{labels[key as StyleOption]}</h3>
                        <div className="flex flex-wrap gap-3">
                            {options[key as StyleOption].map(value => (
                                <button
                                    key={value}
                                    onClick={() => handleSelect(key as StyleOption, value)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                                        ${style[key as StyleOption] === value
                                            ? 'bg-brand-primary text-white ring-2 ring-offset-2 ring-offset-base-200 ring-brand-primary'
                                            : 'bg-base-300 text-text-secondary hover:bg-base-100 hover:text-text-primary'
                                        }`}
                                >
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-10 pt-6 border-t border-base-300 flex justify-end">
                <button
                    onClick={handleSubmit}
                    disabled={!isComplete}
                    className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                >
                    Generate Video Brief
                </button>
            </div>
        </div>
    );
};
