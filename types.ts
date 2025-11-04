
export type AppStep = 'upload' | 'style' | 'brief';

export interface ContentAnalysis {
    coreTheme: string;
    learningObjectives: string[];
    chapterSummaries: {
        chapterTitle: string;
        keyConcepts: string[];
    }[];
    targetAudience: string;
    difficulty: '초급자' | '중급자' | '고급자';
    estimatedTime: number;
}

export interface VideoStyle {
    format: '강의' | '애니메이션' | '하이브리드';
    tone: '전문적' | '친근함' | '유머러스';
    visualStyle: '차트 & 다이어그램' | '실사 예시' | '미니멀 텍스트';
    platform: '유튜브' | '인스타그램 릴스' | '기업 교육';
}

export interface Script {
    narration: string;
    onScreenText: string;
    subtitles: string;
}

export interface Visuals {
    description: string;
    graphicsNeeded: string[];
}

export interface Audio {
    narrationStyle: string;
    backgroundMusic: string;
    soundEffects: string[];
}

export interface VideoBriefSlide {
    slideNumber: number;
    title: string;
    script: Script;
    visuals: Visuals;
    audio: Audio;
}

export type VideoBrief = VideoBriefSlide[];