"use client";

import { useKeimo } from "@/app/_components/keimo-provider";
import { cn } from "@/lib/utils";
import { CameraIcon } from "lucide-react";

export default function CameraButton({ className }: { className?: string }) {
  const { openCamera, isCameraOpen } = useKeimo();
  return (
    <button
      type="button"
      className={cn(
        "h-16 w-16 flex justify-center items-center bg-primary border-2 border-muted transition-colors duration-200 ease-in rounded-full cursor-pointer",
        isCameraOpen && "bg-blue-500",
        className,
      )}
      onClick={openCamera}
    >
      <CameraIcon className="w-4 h-4 text-white" />
    </button>
  );
}
