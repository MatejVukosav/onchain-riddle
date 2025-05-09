"use client";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

import celebrateAnimation from "@/animations/celebrate.json";

export function CelebrationOverlay({
  show,
  onHide,
}: {
  show: boolean;
  onHide: () => void;
}) {
  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      style={{
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
      }}
    >
      <Lottie
        animationData={celebrateAnimation}
        loop={false}
        autoplay={true}
        style={{
          width: "100vw",
          height: "100vh",
          objectFit: "cover",
        }}
        onComplete={onHide}
      />
    </div>
  );
}
