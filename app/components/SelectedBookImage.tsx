"use client";

import { useState, useEffect, useRef } from "react";
import skeletonStyles from "@/app/styles/SkeletonLoadingStates.module.css";

interface SelectedBookImageProps {
  src: string;
  alt: string;
  className: string;
}

export default function SelectedBookImage({ src, alt, className }: SelectedBookImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  return (
    <>
      {!imageLoaded && (
        <div
          className={skeletonStyles["book__image--skeleton"]}
          style={{ width: "140px", height: "140px", minWidth: "140px" }}
        />
      )}
      <img
        className={className}
        src={src}
        alt={alt}
        ref={imgRef}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
    </>
  );
}
