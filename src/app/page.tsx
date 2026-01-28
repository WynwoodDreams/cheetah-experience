import { ScrollProvider } from "@/components/core/ScrollProvider";
import { CheetahCanvas } from "@/components/canvas/CheetahCanvas";
import { OverlaySections } from "@/components/ui/OverlaySections";
import { IntroOverlay } from "@/components/ui/IntroOverlay";

export default function Home() {
  return (
    <ScrollProvider>
      <div className="relative bg-midnight-blue">
        {/* Background Canvas Layer */}
        {/* Video fades to black after ~2 screen scrolls */}
        <CheetahCanvas
          videoSrc="/sequence/cheetah_run.mp4"
          loopCount={2}
          fadeOutStart={0.08}
          fadeOutEnd={0.12}
        />

        {/* Foreground Content Layer */}
        <OverlaySections />

        {/* Intro Layer */}
        <IntroOverlay />
      </div>
    </ScrollProvider>
  );
}
