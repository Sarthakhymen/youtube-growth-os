import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY,
  baseURL: process.env.NVIDIA_BASE_URL || 'https://integrate.api.nvidia.com/v1',
});

export const generateCompletion = async (prompt: string, systemPrompt?: string) => {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.NVIDIA_MODEL || "qwen/qwen3-coder-480b-a35b-instruct",
      messages: [
        { role: "system", content: systemPrompt || "You are a Senior YouTube Content Strategist and Scriptwriter." },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
      top_p: 0.8,
      max_tokens: 4096,
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('AI Completion Error:', error);
    throw new Error('Failed to generate AI content');
  }
};

export const generateStructuredCompletion = async <T>(prompt: string, systemPrompt: string): Promise<T> => {
  try {
    const completion = await openai.chat.completions.create({
      model: process.env.NVIDIA_MODEL || "qwen/qwen3-coder-480b-a35b-instruct",
      messages: [
        { role: "system", content: `${systemPrompt}\n\nIMPORTANT: Respond ONLY with valid JSON.` },
        { role: "user", content: prompt }
      ],
      temperature: 0.2, // Lower temperature for more structured output
      response_format: { type: "json_object" }
    });

    const content = completion.choices[0]?.message?.content || '{}';
    return JSON.parse(content) as T;
  } catch (error) {
    console.error('Structured AI Completion Error:', error);
    throw new Error('Failed to generate structured AI content');
  }
};
