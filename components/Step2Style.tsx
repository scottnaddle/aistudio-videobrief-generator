
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
        format: ['강의', '애니메이션', '하이브리드'] as const,
        tone: ['전문적', '친근함', '유머러스'] as const,
        visualStyle: ['차트 & 다이어그램', '실사 예시', '미니멀 텍스트'] as const,
        platform: ['유튜브', '인스타그램 릴스', '기업 교육'] as const,
    };

    const labels: { [key in StyleOption]: string } = {
        format: "비디오 형식",
        tone: "톤 앤 매너",
        visualStyle: "시각 스타일",
        platform: "타겟 플랫폼"
    };

    return (
        <div className="mt-16 bg-base-200 p-6 sm:p-8 rounded-xl shadow-2xl border border-base-300">
            <h2 className="text-2xl font-bold text-text-primary mb-2">비디오 스타일 정의</h2>
            <p className="text-text-secondary mb-8">
                콘텐츠에 맞는 완벽한 비디오 브리프를 AI가 만들 수 있도록 스타일을 선택해주세요.
            </p>

            <div className="space-y-8">
                {(Object.keys(options) as StyleOption[]).map(key => (
                    <div key={key}>
                        <h3 className="text-lg font-semibold text-text-primary mb-3">{labels[key]}</h3>
                        <div className="flex flex-wrap gap-3">
                            {options[key].map(value => (
                                <button
                                    key={value}
                                    onClick={() => handleSelect(key, value)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all
                                        ${style[key] === value
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
                    비디오 브리프 생성
                </button>
            </div>
        </div>
    );
};