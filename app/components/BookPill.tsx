"use client";

import { useState, useEffect, useRef } from "react";
import { formatDuration } from "@/app/utils/formatDuration";
import Link from "next/link";
import type { Book } from "@/app/types/book";
import styles from "@/app/styles/BookPill.module.css";
import skeletonStyles from "@/app/styles/SkeletonLoadingStates.module.css";
import { LuClock3 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";

interface BookPillProps {
  book: Book;
}

export default function BookPill({ book }: BookPillProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [duration, setDuration] = useState("0:00");
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (imgRef.current?.complete) {
      setImageLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!book.audioLink) return;
    const audio = new Audio();
    audio.src = book.audioLink;
    audio.addEventListener("loadedmetadata", () => {
      setDuration(formatDuration(audio.duration));
    });
  }, [book.audioLink]);

  return (
    <Link
      href={`/book/${book.id}`}
      className={styles["for-you__recommended--books-link"]}
    >
      {book.subscriptionRequired && (
        <div className={styles.book__pill}>Premium</div>
      )}
      <figure className={styles["book__image--wrapper"]} style={{ marginBottom: "8px" }}>
        {!imageLoaded && (
          <div className={skeletonStyles["book__image--skeleton"]} />
        )}
        <img
          className={styles.book__image}
          src={book.imageLink}
          alt={book.title}
          ref={imgRef}
          onLoad={() => setImageLoaded(true)}
          style={{ display: imageLoaded ? "block" : "none" }}
        />
      </figure>
      <div className={styles["recommended__book--title"]}>{book.title}</div>
      <div className={styles["recommended__book--author"]}>{book.author}</div>
      <div className={styles["recommended__book--sub-title"]}>{book.subTitle}</div>
      <div className={styles["recommended__book--details-wrapper"]}>
        <div className={styles["recommended__book--details"]}>
          <div className={styles["recommended__book--details-icon"]}>
            <LuClock3 />
          </div>
          <div className={styles["recommended__book--details-text"]}>
            {duration}
          </div>
        </div>
        <div className={styles["recommended__book--details"]}>
          <div className={styles["recommended__book--details-icon"]}>
            <CiStar />
          </div>
          <div className={styles["recommended__book--details-text"]}>
            {book.averageRating}
          </div>
        </div>
      </div>
    </Link>
  );
}
