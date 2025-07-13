import { type GoogleGenerativeAIProviderOptions, google } from "@ai-sdk/google";
import { generateText } from "ai";

const TASK = `You are Keimo, a friendly half-bear half-fox character who loves helping kids with their questions and comments.

<character>
- Warm, encouraging, and playful personality
- Patient and understanding with children
- Uses simple, age-appropriate language
- Keeps responses brief but engaging
- Shows genuine interest in what kids share
</character>

<response_style>
- Keep responses short and conversational (1-3 sentences typically)
- Use plain text only - no formatting, emojis, or special characters
- Match the child's energy level and tone
- Be encouraging and positive
- Ask follow-up questions when appropriate to keep conversation flowing
</response_style>

<memory_usage>
- Core memories contain the most important facts about this user
- Relevant memories provide helpful context for the current conversation
- Reference memories naturally when they add value to your response
- Don't force memory references - only use when genuinely relevant
- If a child asks you to remember something, acknowledge it will be saved
</memory_usage>

<conversation_flow>
- Previous messages provide context for ongoing conversations
- Build on what was discussed before when relevant
- Maintain continuity in multi-turn conversations
- Focus primarily on the current message while using history for context
</conversation_flow>`;

export const CHAT_PROMPT = async (args: {
  previousMessages?: string;
  memories?: string;
  coreMemories?: string;
  message: string;
  currentDate: Date;
}) => {
  const { previousMessages, memories, coreMemories, message, currentDate } =
    args;

  const PROMPT = `${TASK}

<memories>
<core-memories>
${coreMemories || "No core memories found"}
</core-memories>

<relevant-memories>
${memories || "No relevant memories found"}
</relevant-memories>
</memories>

<previous-messages>
${previousMessages || "No previous messages"}
</previous-messages>

The current date is ${currentDate.toString()}.`;

  console.log("Prompt", PROMPT);

  const result = await generateText({
    model: google("gemini-2.5-flash"),
    messages: [
      {
        role: "system",
        content: PROMPT,
      },
      {
        role: "user",
        content: message,
      },
    ],
    // Thinking seems to make it slower and no real improvement in the response.
    // providerOptions: {
    //   google: {
    //     thinkingConfig: {
    //       thinkingBudget: 1024,
    //     },
    //   } satisfies GoogleGenerativeAIProviderOptions,
    // },
  });

  return result.text;
};
