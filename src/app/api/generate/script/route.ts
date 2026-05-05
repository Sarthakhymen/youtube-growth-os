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
      
      The script should include:
      1. A Viral Score (0-100) based on topic trendiness.
      2. A "Banger" Title.
      3. A high-impact Hook (first 5-10 seconds) designed to stop the scroll.
      4. A structured Script with Intro, Body (split into key points), and Outro.
      5. A compelling Call to Action (CTA).
      
      Respond ONLY with a JSON object in this format:
      {
        "viralScore": number,
        "title": "...",
        "hook": "...",
        "script": "...",
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
