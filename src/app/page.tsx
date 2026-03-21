import { ScrollProvider } from "@/components/core/ScrollProvider";
import { CheetahCanvas } from "@/components/canvas/CheetahCanvas";
import { OverlaySections } from "@/components/ui/OverlaySections";
import { IntroOverlay } from "@/components/ui/IntroOverlay";
import { NavBar } from "@/components/ui/NavBar";

export default function Home() {
  return (
    <ScrollProvider>
      <div className="relative bg-midnight-blue">
        {/* Background Canvas Layer */}
        <CheetahCanvas
          videoSrc="/sequence/cheetah_run.mp4"
          loopCount={3}
          fadeOutStart={0.45}
          fadeOutEnd={0.55}
        />

        {/* Paw prints background overlay */}
        <div className="paw-prints-scattered" aria-hidden="true" />

        {/* Navigation */}
        <NavBar />

        {/* Foreground Content Layer */}
        <OverlaySections />

        {/* Intro Layer */}
        <IntroOverlay />
      </div>
    </ScrollProvider>
  );
}
