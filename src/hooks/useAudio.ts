import { useCallback, useEffect, useState } from "react";

type useAudioType = {
  onPlay: () => Promise<void>;
  onPause: () => void;
  isPlaying: boolean;
  isPaused: boolean;
  setVolume: (v: number) => void;
};
export const useAudio = (
  src: string,
  options?: { extension?: string; volume?: number }
): useAudioType => {
  const [audio, setAudio] = useState<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const play = useCallback(async () => {
    setIsPlaying(true);
    await audio.play();
    setIsPlaying(false);
  }, [audio]);

  const pause = useCallback(() => {
    isPlaying && audio.pause();
  }, [audio]);

  const setVolume = useCallback(
    (v: number) => {
      if (audio) audio.volume = v > 1 ? v / 100 : v;
    },
    [audio]
  );

  useEffect(() => {
    if (audio) {
      audio.preload = "auto";
      if (options !== undefined) {
        if (options.volume)
          audio.volume =
            options.volume > 1 ? options.volume / 100 : options.volume;
      }
    }
  }, [audio]);

  useEffect(() => {
    if (src) {
      if (options === undefined) setAudio(new Audio(src + ".mp3"));
      else if (options.extension) {
        setAudio(new Audio(src + "." + options.extension));
      }
    }

    return () => {
      if (audio) if (audio.played) audio.pause();
    };
  }, []);

  return {
    onPlay: play,
    onPause: pause,
    isPlaying: isPlaying,
    isPaused: audio?.paused,
    setVolume: setVolume,
  };
};
