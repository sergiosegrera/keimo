"use client";

import { createContext, useContext, useState } from "react";
import { z } from "zod/v4";

export const KeimoStatus = z.enum([
  "idle",
  "listening",
  "thinking",
  "speaking",
]);
export type KeimoStatus = z.infer<typeof KeimoStatus>;

type KeimoState = {
  state: KeimoStatus;
  setState: (state: KeimoStatus) => void;
};

const KeimoContext = createContext<KeimoState | null>(null);

export const useKeimo = () => {
  const context = useContext(KeimoContext);

  if (!context) {
    throw new Error("useKeimo must be used within a KeimoProvider");
  }

  return context;
};

export default function KeimoProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, setState] = useState<KeimoStatus>("idle");

  return <KeimoContext value={{ state, setState }}>{children}</KeimoContext>;
}
