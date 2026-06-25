import BookPill from "@/app/components/BookPill";
import type { Book } from "@/app/types/book";
import styles from "@/app/styles/ForYou.module.css";
import { BsFillPlayCircleFill } from "react-icons/bs";
import Link from "next/link";

const BASE_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=";

async function getBooks(status: string): Promise<Book[]> {
  const res = await fetch(`${BASE_URL}${status}`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export default async function ForYouPage() {
  const [selected, recommended, suggested] = await Promise.all([
    getBooks("selected"),
    getBooks("recommended"),
    getBooks("suggested"),
  ]);

  const selectedBook = selected[0];

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles["for-you__title"]}>Selected just for you</div>
        {selectedBook && (
          <Link
            className={styles.selected__book}
            href={`/book/${selectedBook.id}`}
          >
            <div className={styles["selected__book--sub-title"]}>
              {selectedBook.subTitle}
            </div>
            <div className={styles["selected__book--line"]} />
            <div className={styles["selected__book--content"]}>
              <figure className={styles["book__image--wrapper"]}>
                <img
                  className={styles.book__image}
                  src={selectedBook.imageLink}
                  alt={selectedBook.title}
                />
              </figure>
              <div className={styles["selected__book--text"]}>
                <div className={styles["selected__book--title"]}>
                  {selectedBook.title}
                </div>
                <div className={styles["selected__book--author"]}>
                  {selectedBook.author}
                </div>
                <div className={styles["selected__book--duration-wrapper"]}>
                  <div className={styles["selected__book--icon"]}>
                    <BsFillPlayCircleFill />
                  </div>
                  <div className={styles["selected__book--duration"]}>
                    {selectedBook.keyIdeas} mins
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )}

        <div className={styles["for-you__title"]}>Recommended For You</div>
        <div className={styles["for-you__sub--title"]}>
          We think you&apos;ll like these
        </div>
        <div className={styles["for-you__recommended--books"]}>
          {recommended.map((book) => (
            <BookPill key={book.id} book={book} />
          ))}
        </div>

        <div className={styles["for-you__title"]}>Suggested Books</div>
        <div className={styles["for-you__sub--title"]}>
          Browse these curated lists
        </div>
        <div className={styles["for-you__recommended--books"]}>
          {suggested.map((book) => (
            <BookPill key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
}
