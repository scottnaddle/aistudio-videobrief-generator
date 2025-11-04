
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { ClapperboardIcon } from './icons/ClapperboardIcon';
import { FilmIcon } from './icons/FilmIcon';
import type { AppStep } from '../types';

interface StepIndicatorProps {
    currentStep: AppStep;
}

const steps = [
    { id: 'upload', name: '1. 콘텐츠 분석', icon: BookOpenIcon },
    { id: 'style', name: '2. 스타일 정의', icon: ClapperboardIcon },
    { id: 'brief', name: '3. 브리프 생성', icon: FilmIcon },
];

export const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
    const currentStepIndex = steps.findIndex(s => s.id === currentStep);

    return (
        <nav aria-label="Progress">
            <ol role="list" className="flex items-center justify-center">
                {steps.map((step, stepIdx) => (
                    <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                        {stepIdx < currentStepIndex ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-brand-primary" />
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center bg-brand-primary rounded-full">
                                    <step.icon className="w-6 h-6 text-white" aria-hidden="true" />
                                </div>
                                <span className="absolute -bottom-7 w-max left-1/2 -translate-x-1/2 text-sm text-text-primary">{step.name}</span>
                            </>
                        ) : stepIdx === currentStepIndex ? (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-base-300" />
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center bg-base-200 border-2 border-brand-primary rounded-full">
                                    <step.icon className="w-6 h-6 text-brand-primary" aria-hidden="true" />
                                </div>
                                <span className="absolute -bottom-7 w-max left-1/2 -translate-x-1/2 text-sm font-bold text-brand-light">{step.name}</span>
                            </>
                        ) : (
                            <>
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="h-0.5 w-full bg-base-300" />
                                </div>
                                <div className="relative w-10 h-10 flex items-center justify-center bg-base-300 rounded-full">
                                    <step.icon className="w-6 h-6 text-text-secondary" aria-hidden="true" />
                                </div>
                                <span className="absolute -bottom-7 w-max left-1/2 -translate-x-1/2 text-sm text-text-secondary">{step.name}</span>
                            </>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};