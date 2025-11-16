import { NextResponse } from "next/server";
import OpenAI from "openai";
import { QUESTIONS_PROMPT } from "@/services/Constants";

export async function POST(req) {
  const { jobPosition, jobDescription, duration, type } = await req.json();

  // Convert type array to string if it's an array
  const typeString = Array.isArray(type) ? type.join(', ') : type;

  const FINAL_PROMPT = QUESTIONS_PROMPT.replace("{{jobTitle}}", jobPosition)
    .replace("{{jobDescription}}", jobDescription)
    .replace("{{duration}}", duration)
    .replace("{{type}}", typeString);

  console.log(FINAL_PROMPT);

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
    console.error('AI Model Error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to generate questions' },
      { status: 500 }
    );
  }
}
