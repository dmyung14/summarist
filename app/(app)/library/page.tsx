"use client";
import styles from "@/app/styles/Library.module.css";
import { useAppSelector } from "@/redux/hooks";
import BookPill from "@/app/components/BookPill";
import LoginSettings from "@/app/components/LoginSettings";

export default function LibraryPage() {
  const user = useAppSelector((state) => state.auth.user);
  const savedBooks = useAppSelector((state) => state.library.savedBooks);
  const finishedBooks = useAppSelector((state) => state.library.finishedBooks);

  if (!user) return <LoginSettings />;

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles["for-you__title"]}>Saved Books</div>
        <div className={styles["for-you__sub--title"]}>
          {savedBooks.length} {savedBooks.length === 1 ? "item" : "items"}
        </div>

        {savedBooks.length > 0 ? (
          <div className={styles["for-you__recommended--books"]}>
            {savedBooks.map((book) => (
              <BookPill key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className={styles["finished__books--block-wrapper"]}>
            <div className={styles["finished__books--title"]}>
              Save your favorite books!
            </div>
            <div className={styles["finished__books--sub-title"]}>
              When you save a book, it will appear here.
            </div>
          </div>
        )}

        <div className={styles["for-you__title"]}>Finished Books</div>
        <div className={styles["for-you__sub--title"]}>
          {finishedBooks.length} {finishedBooks.length === 1 ? "item" : "items"}
        </div>

        {finishedBooks.length > 0 ? (
          <div className={styles["for-you__recommended--books"]}>
            {finishedBooks.map((book) => (
              <BookPill key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className={styles["finished__books--block-wrapper"]}>
            <div className={styles["finished__books--title"]}>
              Done and dusted!
            </div>
            <div className={styles["finished__books--sub-title"]}>
              When you finish a book, you can find it here later.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
