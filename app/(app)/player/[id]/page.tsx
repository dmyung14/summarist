import { notFound } from "next/navigation";
import type { Book } from "@/app/types/book";
import styles from "@/app/styles/PlayerId.module.css";
import AudioPlayer from "@/app/components/AudioPlayer";

interface Props {
  params: { id: string };
}

const BASE_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBook?id=";

async function getBook(id: string): Promise<Book> {
  const res = await fetch(`${BASE_URL}${id}`, { cache: "no-store" });
  if (!res.ok) notFound();
  return res.json();
}

export default async function PlayerPage({ params }: Props) {
  const { id } = params;
  const book = await getBook(id);

  return (
    <div className={styles.summary}>
      <div className={styles["audio__book--summary"]}>
        <div className={styles["audio__book--summary-title"]}>
          <b>{book.title}</b>
        </div>
        <div className={styles["audio__book--summary-text"]}>
          {book.summary}
        </div>
      </div>
      <AudioPlayer
        audioLink={book.audioLink}
        imageLink={book.imageLink}
        title={book.title}
        author={book.author}
      />
    </div>
  );
}
