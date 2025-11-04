
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
            <h2 className="text-2xl font-bold text-text-primary mb-2">원고 업로드</h2>
            <p className="text-text-secondary mb-6">
                아래에 원고 내용을 붙여넣으세요. 최상의 결과를 위해 일반 텍스트나 마크다운을 사용해주세요. AI가 구조와 핵심 사항을 분석합니다.
            </p>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="여기에 전체 원고를 붙여넣으세요..."
                    className="w-full h-64 p-4 bg-base-100 border border-base-300 rounded-lg text-text-secondary focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-shadow"
                />
                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={!text.trim()}
                        className="px-8 py-3 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-secondary disabled:bg-base-300 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                    >
                        원고 분석
                    </button>
                </div>
            </form>
        </div>
    );
};