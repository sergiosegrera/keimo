"use client";

// import { useEffect, useRef, useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { KeimoStatus, useKeimo } from "@/app/_components/keimo-provider";

import idleAnimation from "@/public/animations/keimo-idle.json";
import listeningAnimation from "@/public/animations/keimo-listening.json";
import keimoMouthAnimation from "@/public/animations/keimo-mouth.json";
import thinkingAnimation from "@/public/animations/keimo-thinking.json";
// import speakingAnimation from 'public/animations/keimo-speaking.json';

export default function Keimo({
  width = 300,
  className,
}: {
  width?: number;
  className?: string;
}) {
  const { state } = useKeimo();

  return (
    <div
      className={`${className} relative`}
      style={{
        width,
        height: width,
        marginTop: -width / 2,
        marginLeft: `-${(80 * width) / 600}px`,
        marginRight: `-${(140 * width) / 600}px`,
        overflowY: "hidden",
      }}
    >
      <Player
        className={`absolute z-0 bottom-0`}
        autoplay
        loop
        src={idleAnimation}
        style={{
          display:
            state === KeimoStatus.enum.idle ||
            state === KeimoStatus.enum.speaking
              ? "block"
              : "none",
        }}
      />
      <Player
        className={`absolute z-10 bottom-0`}
        autoplay
        loop
        src={keimoMouthAnimation}
        style={{
          display: state === KeimoStatus.enum.speaking ? "block" : "none",
        }}
      />
      <Player
        className={`absolute z-10 bottom-0`}
        autoplay
        loop
        src={listeningAnimation}
        style={{
          display: state === KeimoStatus.enum.listening ? "block" : "none",
        }}
      />
      <Player
        className={`absolute z-10 bottom-0`}
        autoplay
        loop
        src={thinkingAnimation}
        style={{
          display: state === KeimoStatus.enum.thinking ? "block" : "none",
        }}
      />
    </div>
  );
}
