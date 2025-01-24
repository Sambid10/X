"use client";
import React, { useRef, useEffect, useState, useCallback } from "react";
import { useInView } from "react-intersection-observer";

interface LazyLoadVideoProps {
  videoUrl: string;
}

const usePlayIntersection = () => {
  const [observer, setObserver] = useState<IntersectionObserver | null>(null);

  useEffect(() => {
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        const video = target as HTMLVideoElement;
        if (isIntersecting) {
          video.muted = true;
          if (video.readyState >= 2) {
            video.play().catch(() => {}); // Ensure playback doesn't throw errors
          }
        } else {
          video.pause();
        }
      });
    };

    const rootMargin =
      window.innerWidth <= 1024 ? "50% 0% 50% 0%" : "-20% 0% -20% 0%";
    const obs = new IntersectionObserver(callback, {
      root: null,
      rootMargin,
      threshold: 0.5,
    });

    setObserver(obs);

    return () => {
      obs.disconnect();
    };
  }, []);

  const observe = useCallback(
    (el: HTMLVideoElement | null) => {
      if (observer && el) observer.observe(el);
    },
    [observer]
  );

  return observe;
};

const LazyLoadVideo: React.FC<LazyLoadVideoProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observe = usePlayIntersection();

  const { ref: lazyLoadRef, inView: isNearViewport } = useInView({
    rootMargin: "200px",
    threshold: 0.1,
    triggerOnce: false,
  });

  useEffect(() => {
    if (videoRef.current) {
      if (isNearViewport) {
        if (videoRef.current.src !== videoUrl) {
          videoRef.current.src = videoUrl; // Set src when entering viewport
        }
      }
    }
  }, [isNearViewport, videoUrl]);

  return (
    <div
      ref={lazyLoadRef}
      className="min-h-[30rem] flex items-center justify-center border border-gray-800 rounded-2xl"
    >
      <video
        ref={(el) => {
          videoRef.current = el;
          observe(el);
        }}
        loop
        preload="metadata"
        muted
        controls
        className="mx-auto w-full max-h-[30rem] rounded-2xl"
      />
    </div>
  );
};

export default LazyLoadVideo;
