import { NextRequest } from "next/server";
import { portfolioContext } from "@/lib/ai";

// POST /api/chat — streams AI responses via Poe's OpenAI-compatible API
export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages)) {
    return Response.json({ error: "messages array is required" }, { status: 400 });
  }

  const apiKey = process.env.POE_API_KEY;
  if (!apiKey) {
    return Response.json({ error: "POE_API_KEY not configured" }, { status: 500 });
  }

  // Call Poe API (OpenAI-compatible format)
  const poeResponse = await fetch("https://api.poe.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "Claude-Sonnet-4.5",
      stream: true,
      messages: [
        { role: "system", content: portfolioContext },
        ...messages,
      ],
    }),
  });

  if (!poeResponse.ok) {
    const errorText = await poeResponse.text();
    console.error("Poe API error:", poeResponse.status, errorText);
    return Response.json(
      { error: "AI service error", details: errorText },
      { status: poeResponse.status }
    );
  }

  // Stream the response back to the client using a ReadableStream
  // This gives the "typing" effect as tokens arrive
  const stream = new ReadableStream({
    async start(controller) {
      const reader = poeResponse.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        controller.close();
        return;
      }

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (!line.startsWith("data: ")) continue;
            const data = line.slice(6).trim();
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(new TextEncoder().encode(content));
              }
            } catch {
              // Skip malformed JSON chunks
            }
          }
        }
      } catch (error) {
        console.error("Stream error:", error);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache",
    },
  });
}
