import { NextRequest, NextResponse } from "next/server";
import { NewResponsesType } from "@/utils/types";
import { getNextQuestion } from "@/lib/nextquestion";

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.json();
    const mode: string = body.mode;
    const numQuestions: number = body.numQuestions;

    if (!mode) {
      return new NextResponse(JSON.stringify({ error: "Mode is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const currentResponses: NewResponsesType = {};
    const { question: firstQuestion, options: firstOptions } =
      await getNextQuestion(currentResponses, mode, 0, numQuestions);

    if (firstQuestion) {
      return new NextResponse(
        JSON.stringify({ question: firstQuestion, options: firstOptions }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      return new NextResponse(
        JSON.stringify({ error: "No questions available" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error(`Error: ${error}`);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
