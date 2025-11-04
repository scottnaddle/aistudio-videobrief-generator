
import React, { useState } from 'react';
import type { VideoBrief, VideoBriefSlide } from '../types';

interface SlideProps {
    slide: VideoBriefSlide;
    index: number;
    setBrief: React.Dispatch<React.SetStateAction<VideoBrief | null>>;
}

const EditableField: React.FC<{ value: string; onSave: (newValue: string) => void; isTextArea?: boolean }> = ({ value, onSave, isTextArea = false }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentValue, setCurrentValue] = useState(value);

    const handleSave = () => {
        onSave(currentValue);
        setIsEditing(false);
    };

    if (isEditing) {
        return (
            <div className="w-full">
                {isTextArea ? (
                    <textarea 
                        value={currentValue} 
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="w-full p-2 bg-base-100 border border-brand-primary rounded-md text-text-primary"
                        rows={5}
                    />
                ) : (
                    <input 
                        type="text"
                        value={currentValue} 
                        onChange={(e) => setCurrentValue(e.target.value)}
                        className="w-full p-2 bg-base-100 border border-brand-primary rounded-md text-text-primary"
                    />
                )}
                <button onClick={handleSave} className="mt-2 px-3 py-1 bg-brand-primary text-white text-sm rounded hover:bg-brand-secondary">저장</button>
                <button onClick={() => setIsEditing(false)} className="mt-2 ml-2 px-3 py-1 bg-base-300 text-text-primary text-sm rounded hover:bg-base-100">취소</button>
            </div>
        );
    }

    return (
        <div onClick={() => setIsEditing(true)} className="cursor-pointer hover:bg-base-100/50 p-1 rounded">
             {value.split('\n').map((line, i) => <p key={i}>{line}</p>)}
        </div>
    );
};

export const Slide: React.FC<SlideProps> = ({ slide, index, setBrief }) => {
    
    const handleUpdate = (path: string, value: any) => {
        setBrief(prev => {
            if (!prev) return null;
            const newBrief = JSON.parse(JSON.stringify(prev));
            const keys = path.split('.');
            let current = newBrief[index];
            for (let i = 0; i < keys.length - 1; i++) {
                current = current[keys[i]];
            }
            current[keys[keys.length - 1]] = value;
            return newBrief;
        });
    };

    return (
        <div className="bg-base-200 p-6 rounded-xl shadow-lg border border-base-300 transition-all duration-300 hover:border-brand-primary">
            <h3 className="text-xl font-bold text-text-primary mb-4 flex items-center">
                <span className="text-brand-light mr-3">#{slide.slideNumber}</span>
                <EditableField value={slide.title} onSave={(val) => handleUpdate('title', val)} />
            </h3>

            <div className="grid md:grid-cols-3 gap-6">
                {/* Script */}
                <div className="bg-base-300/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-brand-light mb-3">📝 스크립트</h4>
                    <div className="space-y-3 text-sm text-text-secondary">
                        <strong className="text-text-primary">내레이션:</strong>
                        <EditableField value={slide.script.narration} onSave={(val) => handleUpdate('script.narration', val)} isTextArea />
                        <strong className="text-text-primary">화면 텍스트:</strong>
                        <EditableField value={slide.script.onScreenText} onSave={(val) => handleUpdate('script.onScreenText', val)} isTextArea />
                    </div>
                </div>

                {/* Visuals */}
                <div className="bg-base-300/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-brand-light mb-3">🎨 시각 자료</h4>
                     <div className="space-y-3 text-sm text-text-secondary">
                        <strong className="text-text-primary">설명:</strong>
                        <EditableField value={slide.visuals.description} onSave={(val) => handleUpdate('visuals.description', val)} isTextArea />
                        <strong className="text-text-primary">필요한 그래픽:</strong>
                        <EditableField value={slide.visuals.graphicsNeeded.join(', ')} onSave={(val) => handleUpdate('visuals.graphicsNeeded', val.split(',').map(s=>s.trim()))} />
                    </div>
                </div>

                {/* Audio */}
                <div className="bg-base-300/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-brand-light mb-3">🔊 오디오</h4>
                    <div className="space-y-3 text-sm text-text-secondary">
                        <strong className="text-text-primary">내레이션 스타일:</strong>
                        <EditableField value={slide.audio.narrationStyle} onSave={(val) => handleUpdate('audio.narrationStyle', val)} />
                        <strong className="text-text-primary">배경 음악:</strong>
                        <EditableField value={slide.audio.backgroundMusic} onSave={(val) => handleUpdate('audio.backgroundMusic', val)} />
                        <strong className="text-text-primary">음향 효과:</strong>
                        <EditableField value={slide.audio.soundEffects.join(', ')} onSave={(val) => handleUpdate('audio.soundEffects', val.split(',').map(s=>s.trim()))} />
                    </div>
                </div>
            </div>
        </div>
    );
};