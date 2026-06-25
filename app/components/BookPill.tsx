import Link from "next/link";
import type { Book } from "@/app/types/book";
import styles from "@/app/styles/BookPill.module.css";
import { LuClock3 } from "react-icons/lu";
import { CiStar } from "react-icons/ci";

interface BookPillProps {
  book: Book;
}

export default function BookPill({ book }: BookPillProps) {
  return (
    <Link
      href={`/book/${book.id}`}
      className={styles["for-you__recommended--books-link"]}
    >
      {book.subscriptionRequired && (
        <div className={styles.book__pill}>Premium</div>
      )}
      <figure className={styles["book__image--wrapper"]} style={{ marginBottom: "8px" }}>
        <img className={styles.book__image} src={book.imageLink} alt={book.title} />
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
            {book.keyIdeas}
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
