
import { GoogleGenAI, Type } from "@google/genai";
import type { ContentAnalysis, VideoStyle, VideoBrief } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeContent(manuscriptText: string): Promise<ContentAnalysis> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `당신은 전문 교육 콘텐츠 분석가입니다. 다음 책 원고를 분석하고, 구조화된 요약본을 JSON 형식으로 제공해주세요. 원고는 다음과 같습니다:

---
${manuscriptText}
---
`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    coreTheme: { type: Type.STRING, description: "중심 주제를 설명하는 간결한 문장." },
                    learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "3-5개의 핵심 학습 목표 목록." },
                    chapterSummaries: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                chapterTitle: { type: Type.STRING },
                                keyConcepts: { type: Type.ARRAY, items: { type: Type.STRING } }
                            }
                        }
                    },
                    targetAudience: { type: Type.STRING, description: "이상적인 독자/시청자에 대한 설명." },
                    difficulty: { type: Type.STRING, enum: ['초급자', '중급자', '고급자'] },
                    estimatedTime: { type: Type.INTEGER, description: "비디오 프레젠테이션의 예상 소요 시간(분)." }
                },
                required: ["coreTheme", "learningObjectives", "chapterSummaries", "targetAudience", "difficulty", "estimatedTime"]
            },
        },
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as ContentAnalysis;
}

export async function generateBrief(analysis: ContentAnalysis, style: VideoStyle): Promise<VideoBrief> {
    const prompt = `
    당신은 전문 비디오 프로듀서이자 시나리오 작가입니다. 당신의 임무는 콘텐츠 분석과 지정된 비디오 스타일을 기반으로 포괄적인 비디오 브리프를 작성하는 것입니다.

    **콘텐츠 분석:**
    ${JSON.stringify(analysis, null, 2)}

    **비디오 스타일 가이드:**
    ${JSON.stringify(style, null, 2)}

    이 정보를 바탕으로 상세한 비디오 브리프를 생성해주세요. 출력은 "슬라이드" 객체의 JSON 배열이어야 합니다. 각 슬라이드는 비디오의 한 장면 또는 핵심 순간을 나타냅니다.
    원고의 핵심 개념을 모두 다루는 완전한 슬라이드 세트를 생성해주세요. 톤, 스타일, 시각 자료가 사용자의 요구 사항과 일치하는지 확인해주세요.
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.ARRAY,
                items: {
                    type: Type.OBJECT,
                    properties: {
                        slideNumber: { type: Type.INTEGER },
                        title: { type: Type.STRING, description: "슬라이드/장면에 대한 간결한 제목" },
                        script: {
                            type: Type.OBJECT,
                            properties: {
                                narration: { type: Type.STRING, description: "이 슬라이드의 전체 내레이션 텍스트. [잠시 멈춤]과 같은 타이밍 큐를 포함하세요." },
                                onScreenText: { type: Type.STRING, description: "화면에 표시될 핵심 텍스트 또는 글머리 기호." },
                                subtitles: { type: Type.STRING, description: "정확한 자막 텍스트." }
                            },
                            required: ["narration", "onScreenText", "subtitles"]
                        },
                        visuals: {
                            type: Type.OBJECT,
                            properties: {
                                description: { type: Type.STRING, description: "텍스트 기반 스토리보드 설명." },
                                graphicsNeeded: { type: Type.ARRAY, items: { type: Type.STRING }, description: "필요한 그래픽 목록." }
                            },
                            required: ["description", "graphicsNeeded"]
                        },
                        audio: {
                            type: Type.OBJECT,
                            properties: {
                                narrationStyle: { type: Type.STRING, description: "성우를 위한 지침." },
                                backgroundMusic: { type: Type.STRING, description: "배경 음악 제안." },
                                soundEffects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "제안된 음향 효과 목록." }
                            },
                            required: ["narrationStyle", "backgroundMusic", "soundEffects"]
                        }
                    },
                    required: ["slideNumber", "title", "script", "visuals", "audio"]
                }
            }
        }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as VideoBrief;
}