"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Settings,
  SkipBack,
  SkipForward,
  Loader2,
  X,
} from "lucide-react";

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onClose?: () => void;
  isModal?: boolean;
}

export default function VideoPlayer({
  videoUrl,
  title,
  onClose,
  isModal = false,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Extract video ID from YouTube URL
  const getVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    return match ? match[1] : null;
  };

  const videoId = getVideoId(videoUrl);
  const embedUrl = videoId
    ? `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`
    : null;

  // Reset controls timeout
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    resetControlsTimeout();
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
    resetControlsTimeout();
  };

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
    resetControlsTimeout();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
    resetControlsTimeout();
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    setShowSettings(false);
    resetControlsTimeout();
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (!embedUrl) {
    return (
      <div
        className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden ${
          isModal ? "aspect-video" : "aspect-video max-w-2xl mx-auto"
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#ff6b35] to-[#ff3366] flex items-center justify-center">
              <Play className="w-10 h-10 text-white" />
            </div>
            <p className="text-gray-400">Video návod není k dispozici</p>
            <p className="text-sm text-gray-500 mt-2">{title}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl overflow-hidden group ${
        isModal ? "w-full max-w-4xl" : "aspect-video max-w-2xl mx-auto"
      }`}
      onMouseEnter={() => setShowControls(true)}
      onMouseMove={resetControlsTimeout}
      onMouseLeave={() => isPlaying && setShowControls(false)}
      style={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
    >
      {/* Video Title Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-20 p-4 bg-gradient-to-b from-black/80 to-transparent"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold truncate pr-4">{title}</h3>
              {onClose && isModal && (
                <button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* YouTube Embed */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title={title}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        onLoad={() => setIsLoading(false)}
        style={{ border: "none" }}
      />

      {/* Loading State */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-gray-900"
          >
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-[#ff6b35] animate-spin mx-auto mb-4" />
              <p className="text-gray-400">Načítání videa...</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Controls Overlay */}
      <AnimatePresence>
        {showControls && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 pointer-events-none"
          >
            {/* Play/Pause Overlay Button */}
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center pointer-events-auto opacity-0 hover:opacity-100 transition-opacity"
            >
              <div className="w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                {isPlaying ? (
                  <Pause className="w-10 h-10 text-white" />
                ) : (
                  <Play className="w-10 h-10 text-white ml-1" />
                )}
              </div>
            </button>

            {/* Bottom Controls */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
              {/* Progress Bar */}
              <div className="relative h-1 bg-white/20 rounded-full mb-4 cursor-pointer group">
                <div
                  className="absolute h-full bg-gradient-to-r from-[#ff6b35] to-[#ff3366] rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  style={{ left: `calc(${progress}% - 6px)` }}
                />
              </div>

              {/* Control Buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={handlePlayPause}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-white" />
                    ) : (
                      <Play className="w-5 h-5 text-white" />
                    )}
                  </button>

                  {/* Skip Buttons */}
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <SkipBack className="w-5 h-5 text-white" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <SkipForward className="w-5 h-5 text-white" />
                  </button>

                  {/* Volume */}
                  <div className="flex items-center gap-2 group">
                    <button
                      onClick={handleMute}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5 text-white" />
                      ) : (
                        <Volume2 className="w-5 h-5 text-white" />
                      )}
                    </button>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="w-0 group-hover:w-20 transition-all accent-[#ff6b35]"
                    />
                  </div>

                  {/* Time */}
                  <span className="text-sm text-gray-300">
                    {formatTime(duration)} / {formatTime(0)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Settings */}
                  <div className="relative">
                    <button
                      onClick={() => setShowSettings(!showSettings)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <Settings className="w-5 h-5 text-white" />
                    </button>

                    <AnimatePresence>
                      {showSettings && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute bottom-full right-0 mb-2 bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-white/10"
                        >
                          <p className="px-4 py-2 text-xs text-gray-400 border-b border-white/10">
                            Rychlost přehrávání
                          </p>
                          {[0.5, 0.75, 1, 1.25, 1.5, 2].map((speed) => (
                            <button
                              key={speed}
                              onClick={() => handleSpeedChange(speed)}
                              className={`block w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                                playbackSpeed === speed
                                  ? "text-[#ff6b35]"
                                  : "text-white"
                              }`}
                            >
                              {speed}x
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Fullscreen */}
                  <button
                    onClick={handleFullscreen}
                    className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    {isFullscreen ? (
                      <Minimize className="w-5 h-5 text-white" />
                    ) : (
                      <Maximize className="w-5 h-5 text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
