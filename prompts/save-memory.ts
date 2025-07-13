import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { z } from "zod";

const TASK = `Extract only high-value memorable information about the user from the CURRENT EXCHANGE that would meaningfully improve future interactions.

<instructions>
- PRIMARY FOCUS: Analyze the current user message and assistant response for new user insights
- Use previous messages ONLY as background context to avoid duplicating existing memories
- ONLY save memories that reveal user preferences, personality traits, important personal context, or recurring patterns
- DO NOT save: factual information easily available elsewhere, temporary situations, conversation topics, or one-off mentions
- Return null if the current exchange doesn't contain genuinely useful NEW user insights
- Focus on information that would help personalize responses or avoid repeating questions

Core Memory Guidelines (limit 10):
- Reserve for the most essential user characteristics that should never be forgotten
- Examples: name, profession, major life circumstances, strong preferences, values
- Save core memories by setting the core_memory_index to a number between 1 and 10. If you need to save a core memory, set it to null.
- You can override existing core memories with more important information

Regular Memory Guidelines:
- Save notable preferences, interests, or behavioral patterns revealed in current exchange
- Avoid saving obvious or easily inferred information
- Prioritize actionable insights over biographical details
</instructions>

<quality_filters>
SAVE: "prefers concise explanations", "vegetarian", "works night shifts", "has anxiety about public speaking"
DON'T SAVE: "asked about weather", "mentioned it's Tuesday", "said thanks", "discussed current events"
</quality_filters>`;

export const SAVE_MEMORY_PROMPT = async (args: {
  userMessage: string;
  assistantMessage: string;
  previousMessages?: string;
  coreMemories?: string;
  previousMemories?: string;
}) => {
  const {
    userMessage,
    assistantMessage,
    previousMessages,
    coreMemories,
    previousMemories,
  } = args;

  const PROMPT = `${TASK}

<existing_memories>
<core_memories>
${coreMemories || "No currently saved core memories, all indexes available."}
</core_memories>
<regular_memories>
${previousMemories || "No currently saved regular memories."}
</regular_memories>
</existing_memories>

<background_context>
${previousMessages ? `Previous conversation: ${previousMessages}` : "No previous context"}
</background_context>

<current_exchange>
<user_message>
${userMessage}
</user_message>
<assistant_message>
${assistantMessage}
</assistant_message>
</current_exchange>

Analyze the CURRENT EXCHANGE for new user insights. Extract memory (or return null if nothing valuable):`;

  const { object } = await generateObject({
    model: google("gemini-2.5-flash-lite-preview-06-17"),
    schema: z
      .object({
        reasoning: z
          .string()
          .describe(
            "Brief explanation of why this memory is valuable and if it should be a regular memory or a core memory",
          ),
        memory: z.string().describe("Concise, actionable user insight"),
        core_memory_index: z
          .number()
          //   .max(10)
          //   .min(1)
          .nullable()
          .describe(
            "Index 1-10 for critical user info, null for regular memory",
          ),
      })
      .nullable(),
    prompt: PROMPT,
    // providerOptions: {
    //   google: {
    //     propertyOrdering: ["reasoning", "memory", "core_memory_index"],
    //   } satisfies GoogleGenerativeAIProviderOptions,
    // },
  });

  return object;
};
