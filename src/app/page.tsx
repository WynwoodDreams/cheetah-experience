import { ScrollProvider } from "@/components/core/ScrollProvider";
import { CheetahCanvas } from "@/components/canvas/CheetahCanvas";
import { OverlaySections } from "@/components/ui/OverlaySections";
import { IntroOverlay } from "@/components/ui/IntroOverlay";

export default function Home() {
  return (
    <ScrollProvider>
      <div className="relative bg-midnight-blue">
        {/* Background Canvas Layer */}
        {/* Video fades to black after Speed Matters section (~3 screens) */}
        <CheetahCanvas
          videoSrc="/sequence/cheetah_run.mp4"
          loopCount={2}
          fadeOutStart={0.18}
          fadeOutEnd={0.22}
        />

        {/* Foreground Content Layer */}
        <OverlaySections />

        {/* Intro Layer */}
        <IntroOverlay />
      </div>
    </ScrollProvider>
  );
}
