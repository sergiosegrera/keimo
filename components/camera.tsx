"use client";

import { useKeimo } from "@/app/_components/keimo-provider";
import { useUser } from "@/app/_components/user-provider";
import { sendMessage } from "@/core/message.core";
import { useRef, useEffect } from "react";

export default function Camera() {
  const {
    isCameraOpen,
    closeCamera,
    image,
    setImage,
    takePicture: takePictureFromKeimo,
  } = useKeimo();
  const user = useUser();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let stream: MediaStream;
    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
      }
    };

    if (isCameraOpen) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraOpen]);

  const takePicture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        setImage(dataUrl);
      }
    }
  };

  // Expose takePicture to KeimoProvider
  useEffect(() => {
    (takePictureFromKeimo as any) = takePicture;
  }, [takePictureFromKeimo]);

  const handleSendMessage = async () => {
    if (image && user) {
      // Create a dummy audio blob
      const audioBlob = new Blob([""], { type: "audio/webm" });
      const reader = new FileReader();
      reader.readAsDataURL(audioBlob);
      reader.onloadend = async () => {
        const base64Audio = reader.result as string;
        await sendMessage({
          audio: base64Audio,
          user_id: user.user_id,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          image: image,
        });
        setImage(null);
        closeCamera();
      };
    }
  };

  if (!isCameraOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <video ref={videoRef} autoPlay playsInline className="w-full h-auto" />
        <canvas ref={canvasRef} className="hidden" />
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={takePicture}>Capture photo</button>
          <button onClick={closeCamera}>Close camera</button>
        </div>
        {image && (
          <div className="mt-4">
            <h2 className="text-center">Preview</h2>
            <img src={image} alt="Screenshot" className="w-full h-auto" />
            <div className="flex justify-center gap-4 mt-4">
              <button onClick={handleSendMessage}>Send</button>
              <button onClick={() => setImage(null)}>Retake</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
