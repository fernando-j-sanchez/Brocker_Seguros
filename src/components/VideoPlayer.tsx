import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface VideoPlayerProps {
  videoSrc?: string;
}

export const VideoPlayer = ({ videoSrc = '/videos/All1.mp4' }: VideoPlayerProps) => {
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !muted;
    }
    setMuted(!muted);
  };

  return (
    <div className="relative w-full h-full min-h-[300px] bg-gray-900 rounded-xl overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        playsInline
        muted={muted}
        className="w-full h-full object-contain"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <button
        onClick={toggleMute}
        className="absolute bottom-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
      >
        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
      </button>
    </div>
  );
};