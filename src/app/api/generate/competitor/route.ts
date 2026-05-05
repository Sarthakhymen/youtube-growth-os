import { NextResponse } from 'next/server';
import { generateStructuredCompletion } from '@/lib/ai';

export async function POST(req: Request) {
  try {
    const { competitorUrl, niche } = await req.json();

    if (!competitorUrl) {
      return NextResponse.json({ error: 'Competitor URL is required' }, { status: 400 });
    }

    const systemPrompt = `
      You are a YouTube Growth Strategist specializing in Competitor Intelligence.
      Your goal is to analyze a competitor's content strategy (based on the provided niche and URL) and identify "Content Gaps" — topics that perform well but aren't being fully explored.
      
      Respond ONLY with a JSON object in this format:
      {
        "competitorStrengths": ["...", "..."],
        "contentGaps": [
          { "topic": "...", "potentialViews": "High/Medium", "reason": "..." },
          ...
        ],
        "winningStrategy": "..."
      }
    `;

    const prompt = `Analyze the competitor at: ${competitorUrl} in the niche: ${niche}`;

    const result = await generateStructuredCompletion<any>(prompt, systemPrompt);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Competitor analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze competitor' }, { status: 500 });
  }
}
