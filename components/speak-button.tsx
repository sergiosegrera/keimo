"use client";

import { useEffect, useRef } from "react";

import { DotStream, DotPulse } from "ldrs/react";
import "ldrs/react/DotStream.css";
import "ldrs/react/DotPulse.css";

// Default values shown
import useAudioRecorder from "@/lib/audio-recorder";
import { useKeimo } from "@/app/_components/keimo-provider";
import type { KeimoStatus } from "@/app/_components/keimo-provider";
import { Loader2Icon, MicIcon } from "lucide-react";
import { sendMessage } from "@/core/message.core";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";

export default function SpeakButton({ className }: { className?: string }) {
  const { user } = useUser();

  const audioRef = useRef<HTMLAudioElement>(null);
  const recorder = useAudioRecorder();
  const { state, setState } = useKeimo();

  useEffect(() => {
    recorder.onSound(async (sound) => {
      if (!user?.id || !audioRef.current) {
        return;
      }

      // TODO: Replace this with actual speech recognition
      // Simulate thinking, then speaking, then back to idling
      setState("thinking");

      const response = await sendMessage({
        audio: sound,
        user_id: user.id,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      });

      audioRef.current.src = response;
      audioRef.current.autoplay = true;

      setState("speaking");

      audioRef.current.addEventListener("ended", () => {
        setState("idle");
      });

      await audioRef.current.play();
    });
  }, [recorder.onSound, setState, user?.id]);

  useEffect(() => {
    switch (state) {
      // Whenever the state changes to listening, start recording
      case "listening":
        recorder.start();
        break;
    }
  }, [recorder.start, state]);

  const handleClick = () => {
    // Idle -> Listening
    // Change the state to listening
    if (state === "idle") {
      setState("listening");

      if (!audioRef.current) {
        audioRef.current = new Audio();
        audioRef.current.autoplay = true;
      }

      recorder.start();
    }

    if (state === "speaking") {
      recorder.stop();
      audioRef.current?.pause();
    }

    // Listening -> Thinking
    // Stop recording and start thinking :)
    if (state === "listening") {
      recorder.stop();
    }
  };

  const renderIcon = (state: KeimoStatus) => {
    switch (state) {
      case "listening":
        return <DotStream size="24" speed="2.5" color="white" />;
      case "thinking":
        return <DotPulse size="24" speed="2.5" color="white" />;
      default:
        return <MicIcon className="w-4 h-4 text-white" />;
    }
  };

  return (
    <button
      type="button"
      className={cn(
        "h-16 w-16 flex justify-center items-center bg-primary border-2 border-muted transition-colors duration-200 ease-in rounded-full cursor-pointer",
        state === "listening" && "bg-blue-500",
        state === "thinking" && "bg-purple-500",
        className,
      )}
      onClick={handleClick}
    >
      {renderIcon(state)}
    </button>
  );
}
