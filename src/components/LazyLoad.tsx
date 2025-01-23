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
          video.play();
          video.muted = true; // Play video when visible
        } else {
          video.pause();
          video.muted = true; // Pause when not visible
        }
      });
    };

    const rootMargin =
      window.innerWidth <= 1024 ? "50% 0% 50% 0%" : "-20% 0% -20% 0%";
    const obs = new IntersectionObserver(callback, {
      root: null, // Observe relative to the viewport
      rootMargin,
      threshold: 0.5, // Fully visible
    });

    setObserver(obs);

    return () => {
      obs.disconnect(); // Clean up observer on unmount
    };
  }, []);

  const observe = useCallback(
    (el: HTMLVideoElement | null) => {
      if (observer && el) observer.observe(el); // Attach observer to video element
    },
    [observer]
  );

  return observe;
};

const LazyLoadVideo: React.FC<LazyLoadVideoProps> = ({ videoUrl }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const observe = usePlayIntersection(); // Use custom hook for play/pause

  // Lazy loading hook
  const { ref: lazyLoadRef, inView: isNearViewport } = useInView({
    rootMargin: "200px", // Start loading video when close to viewport
    threshold: 0.1, // Trigger when 10% is visible
    triggerOnce: false, // Reload when out of view
  });

  // Handle video loading and unloading
  useEffect(() => {
    if (videoRef.current) {
      if (isNearViewport) {
        videoRef.current.src = videoUrl; // Load video when near viewport
      }//  else {
      //   videoRef.current.removeAttribute("src"); // Unload video when out of viewport
      //   videoRef.current.load(); // Ensure the video element resets
      // }
    }
  }, [isNearViewport, videoUrl]);

  return (
    <div
      ref={lazyLoadRef} // Attach lazy-load observer
      className="min-h-[30rem] flex items-center justify-center border border-gray-800 rounded-2xl"
    >
      <video
        ref={(el) => {
          videoRef.current = el; // Assign ref to video
          observe(el); // Attach play/pause observer
        }}
        loop
        preload="metadta"
        muted
        controls
        className="mx-auto w-full max-h-[30rem] rounded-2xl"
      />
    </div>
  );
};

export default LazyLoadVideo;
