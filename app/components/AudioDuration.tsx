"use client";

import { useState, useEffect } from "react";
import { formatDuration } from "@/app/utils/formatDuration";

interface AudioDurationProps {
  audioLink: string;
  className: string;
}

export default function AudioDuration({ audioLink, className }: AudioDurationProps) {
  const [duration, setDuration] = useState("0:00");

  useEffect(() => {
    if (!audioLink) return;
    const audio = new Audio();
    audio.src = audioLink;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(formatDuration(audio.duration));
    });
  }, [audioLink]);

  return <div className={className}>{duration}</div>;
}
