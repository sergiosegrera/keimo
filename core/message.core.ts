"use server";

import { google } from "@ai-sdk/google";
// import { openai } from "@ai-sdk/openai";
import { waitUntil } from "@vercel/functions";
import { embed } from "ai";
import { DateTime } from "luxon";
import db from "@/db";
import elevenlabs from "@/lib/elevenlabs/client";
import { CHAT_PROMPT } from "@/prompts/chat";
import { SAVE_MEMORY_PROMPT } from "@/prompts/save-memory";

// import { TRANSCRIBE_PROMPT } from "@/prompts/transcribe";

// const TRANSCRIPTION_MODEL = openai.transcription("whisper-1");
const VOICE_MODEL_ID = "Fahco4VZzobUeiPqni1S";

export const sendMessage = async (args: {
  audio: string;
  user_id: string;
  timezone: string;
  image?: string;
}) => {
  const { audio, user_id, timezone, image } = args;

  if (image) {
    console.log("Image received:", image.substring(0, 100));
  }

  const timer = performance.now();
  // const url = new URL(audio);

  // 1. Transcribe Audio
  // const transcription = await experimental_transcribe({
  //   model: TRANSCRIPTION_MODEL,
  //   audio: url,
  // });

  // Convert base64 data URL to buffer
  // The audio parameter is a data URL like "data:audio/webm;base64,SGVsbG8gV29ybGQ="
  const base64Data = audio.split(",")[1]; // Extract just the base64 part
  const buf = Buffer.from(base64Data, "base64");
  const audioBlob = new Blob([buf], { type: "audio/webm" });

  const transcription = await elevenlabs.speechToText.convert({
    file: audioBlob,
    modelId: "scribe_v1",
    languageCode: "en",
    tagAudioEvents: false,
    diarize: false,
  });

  console.log("Transcription", Number(performance.now() - timer).toFixed(2));

  const message = transcription.text;

  console.log("User Message", message);

  const now = DateTime.now().setZone(timezone).toJSDate();

  // 2. Query Previous Messages
  const getMessages = async () => {
    const previousMessages = await db.message.getPrevious({
      user_id,
      date: now,
    });

    // Display date in iso (yyyy-mm-dd hh:mm) format
    const messages = previousMessages.map((message) => {
      return `<message role="${message.role}" date="${message.created_at.toISOString()}" >${message.message}</message>`;
    });

    console.log(
      "Previous Messages",
      Number(performance.now() - timer).toFixed(2),
    );

    return messages.join("\n");
  };

  const getCoreMemories = async () => {
    const coreMemories = await db.memory.getCoreMemories({
      user_id,
    });

    const coreMemoriesText = coreMemories.map((memory) => {
      return `<core-memory index="${memory.core_memory_slot}" date="${memory.created_at.toISOString()}" >${memory.content}</core-memory>`;
    });

    return coreMemoriesText.join("\n");
  };

  // 3. Query Memories
  const getMemories = async () => {
    const embedding = await embed({
      model: google.textEmbeddingModel("text-embedding-004"),
      value: message,
    });

    const memories = await db.memory.getByEmbedding({
      user_id,
      embedding: embedding.embedding,
    });

    const memoriesText = memories.map((memory) => {
      return `<memory date="${memory.created_at.toISOString()}" >${memory.content}</memory>`;
    });

    console.log("Memories", Number(performance.now() - timer).toFixed(2));

    return memoriesText.join("\n");
  };

  // 4. Save Message
  const saveUserMessage = async () => {
    await db.message.create({
      user_id,
      message,
      role: "user",
      created_at: now,
    });

    console.log("Saved Message", Number(performance.now() - timer).toFixed(2));
  };

  const [previousMessages, memories, coreMemories] = await Promise.all([
    getMessages(),
    getMemories(),
    getCoreMemories(),
    saveUserMessage(),
  ]);

  console.log("Queries", Number(performance.now() - timer).toFixed(2));

  // 4. Create Memory if needed
  const response = await CHAT_PROMPT({
    previousMessages,
    coreMemories,
    memories,
    message,
    currentDate: now,
  });

  console.log("Response", response);
  console.log("Response Time", Number(performance.now() - timer).toFixed(2));

  // 5. Generate Speech
  const tts = await elevenlabs.textToSpeech.convert(VOICE_MODEL_ID, {
    text: response,
    modelId: "eleven_flash_v2_5",
  });

  console.log("TTS", Number(performance.now() - timer).toFixed(2));

  const reader = tts.getReader();
  const chunks: Uint8Array[] = [];

  while (true) {
    const { done, value } = await reader.read();

    if (done) break;
    chunks.push(value);
  }

  const audioBuffer = Buffer.concat(chunks);
  const base64 = audioBuffer.toString("base64");

  // wait until
  const save = async () => {
    const saveAssistantMessage = async () => {
      await db.message.create({
        user_id,
        message: response,
        role: "assistant",
        created_at: DateTime.now().setZone(timezone).toJSDate(),
      });
    };

    const saveMemory = async () => {
      const result = await SAVE_MEMORY_PROMPT({
        userMessage: message,
        assistantMessage: response,
        previousMessages,
        coreMemories,
        previousMemories: memories,
      });

      console.log("Save Memory Result", result);

      if (result) {
        if (result.core_memory_index) {
          await db.memory.createCoreMemory({
            user_id,
            content: result.memory,
            core_memory_slot: result.core_memory_index,
            created_at: now,
          });

          return;
        }

        const embedding = await embed({
          model: google.textEmbeddingModel("text-embedding-004"),
          value: result.memory,
        });

        await db.memory.create({
          user_id,
          content: result.memory,
          embedding: embedding.embedding,
          created_at: now,
        });
      }
    };

    await Promise.all([
      saveAssistantMessage(),
      saveMemory(),
      db.message.deleteExpired({
        user_id,
        date: now,
      }),
    ]);
  };

  waitUntil(save());

  return `data:audio/mpeg;base64,${base64}`;
};
