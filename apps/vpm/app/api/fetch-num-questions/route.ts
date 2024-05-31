import { NextRequest, NextResponse } from "next/server";
import questionsFile from "../questions.json";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { mode } = body;

  if (typeof mode !== "string") {
    // Returning a 400 response with an error message
    return new NextResponse(
      JSON.stringify({ error: "Invalid mode parameter" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Ensure that questionsFile and its property questions_data have been loaded properly
  if (!questionsFile?.questions_data) {
    return new NextResponse(
      JSON.stringify({ error: "Questions data not found" }),
      {
        status: 404,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const questions = questionsFile.questions_data as any;

  // Check if the provided mode has corresponding data in questions
  if (!(mode in questions)) {
    // Return a 400 response if the mode is not found
    return new NextResponse(JSON.stringify({ error: "Mode not supported" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // It's safe to assume questions[mode] is defined here
  const keys = Object.keys(questions[mode] ?? {});
  const response_data = { options: keys };
  // Returning a 200 response with the keys
  return new NextResponse(JSON.stringify(response_data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
