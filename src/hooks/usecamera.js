import { useRef, useState } from "react";

export function useCamera() {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);

  const startCamera = async () => {
    // 🔒 PREVENT RESTART
    if (active || streamRef.current) return;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 320, height: 240 },
        audio: false,
      });

      streamRef.current = stream;
      setActive(true);

      // 🔴 ATTACH STREAM ONLY ONCE
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // DO NOT force play repeatedly
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(() => {});
        };
      }
    } catch (err) {
      console.error("Camera error:", err);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
      setActive(false);
    }
  };

  return {
    videoRef,
    startCamera,
    stopCamera,
    active,
  };
}
