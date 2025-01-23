import React, { useEffect, useRef } from 'react';

interface VideoAutomaticPlayerBasedOnScrollProps {
  children: React.ReactElement<HTMLVideoElement>; // Specify the children as a video element
}

export default function VideoAutomaticPlayerBasedOnScroll({
  children,
}: VideoAutomaticPlayerBasedOnScrollProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!videoRef.current || !containerRef.current) return;

    const videoElement = videoRef.current;
    const containerElement = containerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = videoElement.play();
            if (playPromise !== undefined) {
              playPromise.catch((error) => {
                console.error("Error playing video:", error);
              });
            }
          } else {
            videoElement.pause();
          }
        });
      },
      {
        rootMargin: '0px',
        threshold: 0.75,
      }
    );

    observer.observe(containerElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Clone the child element (video) and apply the ref
  const clonedChild = React.cloneElement(children, { ref: videoRef });

  return <div ref={containerRef}>{clonedChild}</div>;
}
