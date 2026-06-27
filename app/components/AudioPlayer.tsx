"use client";
import { useRef, useState, useEffect } from "react";
import { BsPlayFill, BsPauseFill } from "react-icons/bs";
import { RiReplay10Fill, RiForward10Fill } from "react-icons/ri";
import styles from "@/app/styles/PlayerId.module.css";
import { useAppSelector } from "@/redux/hooks";
import { finishBook } from "@/app/lib/userBooks";
import type { Book } from "@/app/types/book";

interface Props {
  book: Book;
}

function formatTime(seconds: number): string {
  if (isNaN(seconds) || !isFinite(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function AudioPlayer({ book }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onDurationChange = () => {
      if (!isNaN(audio.duration)) setDuration(audio.duration);
    };
    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onEnded = () => {
      setIsPlaying(false);
      if (user?.uid) finishBook(user.uid, book);
    };

    audio.addEventListener("durationchange", onDurationChange);
    audio.addEventListener("loadeddata", onDurationChange);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    if (audio.readyState >= 1 && !isNaN(audio.duration)) {
      setDuration(audio.duration);
    }

    return () => {
      audio.removeEventListener("durationchange", onDurationChange);
      audio.removeEventListener("loadeddata", onDurationChange);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  function togglePlay() {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  }

  function skip(seconds: number) {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime += seconds;
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const audio = audioRef.current;
    if (!audio) return;
    const val = Number(e.target.value);
    audio.currentTime = val;
    setCurrentTime(val);
  }

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div className={styles.audio__wrapper}>
      <audio ref={audioRef} src={book.audioLink} preload="metadata" />
      <div className={styles["audio__track--wrapper"]}>
        <figure className={styles["audio__track--image-mask"]}>
          <figure className={styles["book__image--wrapper"]}>
            <img
              className={styles.book__image}
              src={book.imageLink}
              alt={book.title}
              style={{ display: "block" }}
            />
          </figure>
        </figure>
        <div className={styles["audio__track--details-wrapper"]}>
          <div className={styles["audio__track--title"]}>{book.title}</div>
          <div className={styles["audio__track--author"]}>{book.author}</div>
        </div>
      </div>

      <div className={styles["audio__controls--wrapper"]}>
        <div className={styles.audio__controls}>
          <button
            className={styles["audio__controls--btn"]}
            onClick={() => skip(-10)}
          >
            <RiReplay10Fill />
          </button>
          <button
            className={`${styles["audio__controls--btn"]} ${styles["audio__controls--btn-play"]}`}
            onClick={togglePlay}
          >
            {isPlaying ? <BsPauseFill /> : <BsPlayFill />}
          </button>
          <button
            className={styles["audio__controls--btn"]}
            onClick={() => skip(10)}
          >
            <RiForward10Fill />
          </button>
        </div>
      </div>

      <div className={styles["audio__progress--wrapper"]}>
        <div className={styles.audio__time}>{formatTime(currentTime)}</div>
        <input
          type="range"
          className={styles["audio__progress--bar"]}
          value={currentTime}
          max={duration || 0}
          step={0.1}
          onChange={handleSeek}
          style={{
            background: `linear-gradient(to right, #2bd97c ${progress}%, #6d787d ${progress}%)`,
          }}
        />
        <div className={styles.audio__time}>{formatTime(duration)}</div>
      </div>
    </div>
  );
}
