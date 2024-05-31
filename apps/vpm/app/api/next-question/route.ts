"use server";
import { NextRequest, NextResponse } from "next/server";
import customizePrompt from "./customize-prompt";
import { getNextQuestion } from "@/lib/nextquestion";

export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const currentResponses = body.responses || {};
    const { mode } = body;
    const numQuestions = body.numQuestions || 3;
    const { question: nextQuestion, options: nextOptions } =
      await getNextQuestion(
        currentResponses,
        mode,
        Object.keys(currentResponses).length,
        numQuestions
      );

    if (nextQuestion) {
      currentResponses[nextQuestion] = "";
      return new NextResponse(
        JSON.stringify({ question: nextQuestion, options: nextOptions }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      const finalPrompt = await customizePrompt(currentResponses, mode);
      return new NextResponse(JSON.stringify({ finalPrompt: finalPrompt }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ error: e.message }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }
}
