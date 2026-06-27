"use client";

import { useState, useEffect, useRef } from "react";
import skeletonStyles from "@/app/styles/SkeletonLoadingStates.module.css";

interface BookDetailImageProps {
  src: string;
  alt: string;
  className: string;
}

export default function BookDetailImage({ src, alt, className }: BookDetailImageProps) {
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
        <div className={skeletonStyles["book__detail--image-skeleton"]} />
      )}
      <img
        ref={imgRef}
        className={className}
        src={src}
        alt={alt}
        onLoad={() => setImageLoaded(true)}
        style={{ display: imageLoaded ? "block" : "none" }}
      />
    </>
  );
}
