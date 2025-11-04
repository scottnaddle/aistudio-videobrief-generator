
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
## 슬라이드 ${slide.slideNumber}: ${slide.title}

### 📝 스크립트
**내레이션:**
${slide.script.narration}

**화면 텍스트:**
${slide.script.onScreenText}

**자막:**
${slide.script.subtitles}

### 🎨 시각 자료
**설명:**
${slide.visuals.description}

**필요한 그래픽:**
${slide.visuals.graphicsNeeded.map(g => `- ${g}`).join('\n')}

### 🔊 오디오
**내레이션 스타일:** ${slide.audio.narrationStyle}
**배경 음악:** ${slide.audio.backgroundMusic}
**음향 효과:**
${slide.audio.soundEffects.map(s => `- ${s}`).join('\n')}
            `).join('\n---\n');
        }
        navigator.clipboard.writeText(content).then(() => alert(`${format.toUpperCase()}가 클립보드에 복사되었습니다!`));
    };

    if (!brief) {
        return <div className="text-center text-text-secondary">생성된 브리프가 없습니다.</div>;
    }

    return (
        <div className="mt-16 space-y-6">
            <div className="bg-base-200 p-6 rounded-xl shadow-2xl border border-base-300 text-center">
                 <h2 className="text-3xl font-bold text-text-primary mb-2">비디오 브리프가 준비되었습니다!</h2>
                <p className="text-text-secondary mb-6">
                    아래에서 완성된 비디오 기획안을 검토, 수정하고 내보내세요.
                </p>
                <div className="flex justify-center gap-4 flex-wrap">
                    <button onClick={() => handleCopy('md')} className="px-5 py-2 bg-base-300 text-text-primary font-semibold rounded-lg hover:bg-base-100 transition-colors">
                        마크다운으로 복사
                    </button>
                    <button onClick={() => handleCopy('json')} className="px-5 py-2 bg-base-300 text-text-primary font-semibold rounded-lg hover:bg-base-100 transition-colors">
                        JSON으로 복사
                    </button>
                    <button onClick={onReset} className="px-5 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary transition-colors">
                        새 브리프 만들기
                    </button>
                </div>
            </div>

            {brief.map((slide, index) => (
                <Slide key={slide.slideNumber} slide={slide} index={index} setBrief={setBrief} />
            ))}
        </div>
    );
};