
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => (
    <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3">
             <SparklesIcon className="w-10 h-10 text-brand-primary" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
                에듀브리프 에이전트
            </h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
            AI의 힘으로 원고를 매력적인 비디오 브리프로 바꿔보세요.
        </p>
    </header>
);