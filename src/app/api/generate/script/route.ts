import { NextResponse } from 'next/server';
import { generateStructuredCompletion } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { topic, niche, tone, length } = await req.json();

    if (!topic) {
      return NextResponse.json({ error: 'Topic is required' }, { status: 400 });
    }

    const systemPrompt = `
      You are a World-Class YouTube Scriptwriter and Retention Engineer.
      Your goal is to write a high-performance video script that maximizes watch time and engagement.
      
      The script MUST include:
      1. A Viral Score (0-100) based on topic trendiness and competition.
      2. 3 variations of a "Banger" Title (Curiosity, Benefit-driven, and Extreme).
      3. A high-impact Hook (first 5-10 seconds) designed to stop the scroll.
      4. A structured Script with Intro, Body (split into key points), and Outro.
      5. Pattern Interrupts: Specific moments where the tone, visual, or topic should shift to keep viewers engaged.
      6. Visual Cues: Recommendations for B-roll, text overlays, or screen changes.
      7. A compelling Call to Action (CTA).
      
      Respond ONLY with a JSON object in this format:
      {
        "viralScore": number,
        "titles": ["title 1", "title 2", "title 3"],
        "hook": "...",
        "script": "...",
        "retentionTips": [
          { "timestamp": "0:30", "tip": "...", "type": "Pattern Interrupt" },
          { "timestamp": "1:30", "tip": "...", "type": "Visual Cue" }
        ],
        "cta": "..."
      }
    `;

    const prompt = `
      Write a YouTube script for:
      Topic: ${topic}
      Niche: ${niche}
      Tone: ${tone || 'Professional yet energetic'}
      Target Length: ${length || '10 minutes'}
    `;

    const result = await generateStructuredCompletion<any>(prompt, systemPrompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Script generation error:', error);
    return NextResponse.json({ error: 'Failed to generate script' }, { status: 500 });
  }
}
