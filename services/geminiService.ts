
import { GoogleGenAI, Type } from "@google/genai";
import type { ContentAnalysis, VideoStyle, VideoBrief } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function analyzeContent(manuscriptText: string): Promise<ContentAnalysis> {
    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are an expert educational content analyst. Analyze the following book manuscript. Provide a structured summary in JSON format. The manuscript is:

---
${manuscriptText}
---
`,
        config: {
            responseMimeType: "application/json",
            responseSchema: {
                type: Type.OBJECT,
                properties: {
                    coreTheme: { type: Type.STRING, description: "A concise sentence describing the central theme." },
                    learningObjectives: { type: Type.ARRAY, items: { type: Type.STRING }, description: "A list of 3-5 key learning objectives." },
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
                    targetAudience: { type: Type.STRING, description: "Description of the ideal reader/viewer." },
                    difficulty: { type: Type.STRING, enum: ['Beginner', 'Intermediate', 'Advanced'] },
                    estimatedTime: { type: Type.INTEGER, description: "Estimated time in minutes for a video presentation." }
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
    You are an expert video producer and scriptwriter. Your task is to create a comprehensive video brief based on a content analysis and specified video style.

    **Content Analysis:**
    ${JSON.stringify(analysis, null, 2)}

    **Video Style Guide:**
    ${JSON.stringify(style, null, 2)}

    Based on this information, generate a detailed video brief. The output must be a JSON array of "slide" objects. Each slide represents a scene or a key moment in the video.
    Generate a complete set of slides to cover the key concepts from the manuscript. Ensure the tone, style, and visuals match the user's requirements.
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
                        title: { type: Type.STRING, description: "A concise title for the slide/scene" },
                        script: {
                            type: Type.OBJECT,
                            properties: {
                                narration: { type: Type.STRING, description: "The full narration text for this slide. Include timing cues like [PAUSE]." },
                                onScreenText: { type: Type.STRING, description: "Key text or bullet points for the screen." },
                                subtitles: { type: Type.STRING, description: "The exact subtitle text." }
                            },
                            required: ["narration", "onScreenText", "subtitles"]
                        },
                        visuals: {
                            type: Type.OBJECT,
                            properties: {
                                description: { type: Type.STRING, description: "A text-based storyboard description." },
                                graphicsNeeded: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of required graphics." }
                            },
                            required: ["description", "graphicsNeeded"]
                        },
                        audio: {
                            type: Type.OBJECT,
                            properties: {
                                narrationStyle: { type: Type.STRING, description: "Instructions for the voice-over artist." },
                                backgroundMusic: { type: Type.STRING, description: "Suggestion for background music." },
                                soundEffects: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of suggested sound effects." }
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
