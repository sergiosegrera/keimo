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
  isCameraOpen: boolean;
  openCamera: () => void;
  closeCamera: () => void;
  takePicture: () => void;
  image: string | null;
  setImage: (image: string | null) => void;
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
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);

  const openCamera = () => setIsCameraOpen(true);
  const closeCamera = () => setIsCameraOpen(false);
  const takePicture = () => {
    // This will be implemented in the Camera component
  };

  return (
    <KeimoContext.Provider
      value={{
        state,
        setState,
        isCameraOpen,
        openCamera,
        closeCamera,
        takePicture,
        image,
        setImage,
      }}
    >
      {children}
    </KeimoContext.Provider>
  );
}
