import axios from "axios";
import { NextResponse } from "next/server";
import OpenAI from "openai";
const client = new OpenAI();

export async function POST(req: Request) {
  console.log("🚀 ~ POST ~ req:", req);
  console.log(process.env.OPENAI_API_KEY);
  try {
    const body = await req.json();
    const userMessage = body.message;
    const { previousResponseId } = body;

    // const response = await fetch("https://api.openai.com/v1/chat/completions", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-4o",
    //     messages: [{ role: "user", content: userMessage }],
    //   }),
    // });

    // const data = await response.json();

    const response = await client.responses.create({
      model: "gpt-4o",
      input: userMessage,
      instructions:
        "Respond with robotic language. Add robotic emojis to responses",
      previous_response_id: previousResponseId,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
