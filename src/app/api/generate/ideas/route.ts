import { NextResponse } from 'next/server';
import { generateStructuredCompletion } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { niche } = await req.json();

    if (!niche) {
      return NextResponse.json({ error: 'Niche is required' }, { status: 400 });
    }

    const systemPrompt = `
      You are a Senior YouTube Content Strategist and Viral Growth Expert.
      Your goal is to generate 5 high-potential, viral video ideas for a specific niche.
      
      Each idea MUST include:
      1. A high-click-rate Title (using psychological triggers).
      2. A Viral Score (0-100) based on current interest levels.
      3. A high-retention Hook (the first 5 seconds).
      4. Trend Analysis: Why this topic is blowing up right now or why it's a "timeless" viral candidate.
      5. Target Audience: Who exactly is this for?
      
      Respond ONLY with a JSON object in this format:
      {
        "ideas": [
          { 
            "title": "...", 
            "viralScore": number, 
            "hook": "...", 
            "trendAnalysis": "...", 
            "targetAudience": "..." 
          },
          ...
        ]
      }
    `;

    const prompt = `Generate 5 viral video ideas for the niche: ${niche}`;

    const result = await generateStructuredCompletion<{ ideas: any[] }>(prompt, systemPrompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to generate ideas' }, { status: 500 });
  }
}
