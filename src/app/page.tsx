import { ScrollProvider } from "@/components/core/ScrollProvider";
import { CheetahCanvas } from "@/components/canvas/CheetahCanvas";
import { OverlaySections } from "@/components/ui/OverlaySections";
import { IntroOverlay } from "@/components/ui/IntroOverlay";

export default function Home() {
  return (
    <ScrollProvider>
      <div className="relative min-h-[1000vh] bg-midnight-blue">
        {/* Background Canvas Layer */}
        {/* We pass a video source, but if it's missing, it will fallback to placeholder animation */}
        <CheetahCanvas videoSrc="/sequence/cheetah_run.mp4" loopCount={5} />

        {/* Paw prints background overlay */}
        <div className="paw-prints-scattered" aria-hidden="true" />

        {/* Foreground Content Layer */}
        <OverlaySections />

        {/* Intro Layer */}
        <IntroOverlay />
      </div>
    </ScrollProvider>
  );
}
