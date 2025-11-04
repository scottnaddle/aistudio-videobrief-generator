
export type AppStep = 'upload' | 'style' | 'brief';

export interface ContentAnalysis {
    coreTheme: string;
    learningObjectives: string[];
    chapterSummaries: {
        chapterTitle: string;
        keyConcepts: string[];
    }[];
    targetAudience: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    estimatedTime: number;
}

export interface VideoStyle {
    format: 'Lecture' | 'Animation' | 'Hybrid';
    tone: 'Professional' | 'Friendly' | 'Humorous';
    visualStyle: 'Charts & Diagrams' | 'Live Action Examples' | 'Minimalist Text';
    platform: 'YouTube' | 'Instagram Reels' | 'Corporate Training';
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
