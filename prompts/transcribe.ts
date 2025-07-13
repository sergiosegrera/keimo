import { google } from "@ai-sdk/google";
import { generateText } from "ai";

const TASK = `You are a transcription assistant.

You will be given an audio file and you will need to transcribe it into text.

<instructions>
- Transcribe the audio file into text.
- The text should be in the same language as the audio file.
- The text should be as accurate as possible.
</instructions>
`;

export const TRANSCRIBE_PROMPT = async (args: { url: URL }) => {
  const { url } = args;

  const { text } = await generateText({
    model: google("gemini-2.0-flash-lite"),
    system: TASK,
    messages: [
      {
        role: "system",
        content: TASK,
      },
      {
        role: "user",
        content: [
          {
            type: "file",
            data: url,
            mimeType: "audio/wav",
          },
        ],
      },
    ],
  });

  return text;
};
