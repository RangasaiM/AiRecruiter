import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  const { conversation } = await req.json();
  
  if (!conversation) {
    return NextResponse.json(
      { error: 'No conversation data provided' },
      { status: 400 }
    );
  }
  
  const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
    "{{conversation}}",
    JSON.stringify(conversation)
  );

  try {
    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "deepseek/deepseek-r1-0528-qwen3-8b:free",
      messages: [{ role: "user", content: FINAL_PROMPT }],
    });

    console.log(completion.choices[0].message);
    return NextResponse.json(completion.choices[0].message);
  } catch (e) {
    console.error('AI Feedback Error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to generate feedback' },
      { status: 500 }
    );
  }
}
