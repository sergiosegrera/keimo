import Camera from "@/components/camera";
import CameraButton from "@/components/camera-button";
import Keimo from "@/components/keimo";
import Nav from "@/components/nav";
import SpeakButton from "@/components/speak-button";

export default function ChatPage() {
  return (
    <>
      <Nav />
      <main className="container mx-auto flex-1 flex flex-col items-center justify-end relative overflow-hidden">
        <Keimo width={500} />
        <div className="absolute bottom-0 right-0 p-4 flex flex-row gap-4">
          <SpeakButton />
          <CameraButton />
        </div>
        <Camera />
      </main>
    </>
  );
}
