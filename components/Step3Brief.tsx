
import React from 'react';
import type { VideoBrief } from '../types';
import { Slide } from './Slide';

interface Step3BriefProps {
    brief: VideoBrief | null;
    setBrief: React.Dispatch<React.SetStateAction<VideoBrief | null>>;
    onReset: () => void;
}

export const Step3Brief: React.FC<Step3BriefProps> = ({ brief, setBrief, onReset }) => {

    const handleCopy = (format: 'json' | 'md') => {
        if (!brief) return;
        
        let content = '';
        if (format === 'json') {
            content = JSON.stringify(brief, null, 2);
        } else {
            content = brief.map(slide => `
## Slide ${slide.slideNumber}: ${slide.title}

### 📝 Script
**Narration:**
${slide.script.narration}

**On-screen Text:**
${slide.script.onScreenText}

**Subtitles:**
${slide.script.subtitles}

### 🎨 Visuals
**Description:**
${slide.visuals.description}

**Graphics Needed:**
${slide.visuals.graphicsNeeded.map(g => `- ${g}`).join('\n')}

### 🔊 Audio
**Narration Style:** ${slide.audio.narrationStyle}
**Background Music:** ${slide.audio.backgroundMusic}
**Sound Effects:**
${slide.audio.soundEffects.map(s => `- ${s}`).join('\n')}
            `).join('\n---\n');
        }
        navigator.clipboard.writeText(content).then(() => alert(`${format.toUpperCase()} copied to clipboard!`));
    };

    if (!brief) {
        return <div className="text-center text-text-secondary">No brief generated.</div>;
    }

    return (
        <div className="mt-16 space-y-6">
            <div className="bg-base-200 p-6 rounded-xl shadow-2xl border border-base-300 text-center">
                 <h2 className="text-3xl font-bold text-text-primary mb-2">Your Video Brief is Ready!</h2>
                <p className="text-text-secondary mb-6">
                    Review, edit, and export your complete video plan below.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => handleCopy('md')} className="px-5 py-2 bg-base-300 text-text-primary font-semibold rounded-lg hover:bg-base-100 transition-colors">
                        Copy as Markdown
                    </button>
                    <button onClick={() => handleCopy('json')} className="px-5 py-2 bg-base-300 text-text-primary font-semibold rounded-lg hover:bg-base-100 transition-colors">
                        Copy as JSON
                    </button>
                    <button onClick={onReset} className="px-5 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors">
                        Create New Brief
                    </button>
                </div>
            </div>

            {brief.map((slide, index) => (
                <Slide key={slide.slideNumber} slide={slide} index={index} setBrief={setBrief} />
            ))}
        </div>
    );
};
