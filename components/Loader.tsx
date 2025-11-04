import React from 'react';

export const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-brand-primary"></div>
        <h2 className="mt-6 text-xl font-semibold text-text-primary">AI가 생각 중입니다...</h2>
        <p className="mt-2 text-text-secondary">비디오 브리프와 스크린샷을 만들고 있습니다. 잠시만 기다려주세요.</p>
    </div>
);