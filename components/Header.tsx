
import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';

export const Header: React.FC = () => (
    <header className="text-center mb-10">
        <div className="flex items-center justify-center gap-3">
             <SparklesIcon className="w-10 h-10 text-brand-primary" />
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-brand-primary to-brand-secondary text-transparent bg-clip-text">
                EduBrief Agent
            </h1>
        </div>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-text-secondary">
            Transform manuscripts into engaging video briefs with the power of AI.
        </p>
    </header>
);
