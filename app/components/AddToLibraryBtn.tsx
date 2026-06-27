"use client";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authSlice";
import { saveBook, unsaveBook } from "@/app/lib/userBooks";
import styles from "@/app/styles/BookId.module.css";
import type { Book } from "@/app/types/book";

interface Props {
  book: Book;
}

export default function AddToLibraryBtn({ book }: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const savedBooks = useAppSelector((state) => state.library.savedBooks);
  const dispatch = useAppDispatch();

  const isSaved = savedBooks.some((b) => b.id === book.id);

  async function handleClick() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    if (isSaved) {
      await unsaveBook(user.uid!, book.id);
    } else {
      await saveBook(user.uid!, book);
    }
  }

  return (
    <div className={styles["inner-book__bookmark"]} onClick={handleClick}>
      <div className={styles["inner-book__bookmark--icon"]}>
        {isSaved ? <FaBookmark /> : <FaRegBookmark />}
      </div>
      <div className={styles["inner-book__bookmark--text"]}>
        {isSaved ? "Saved in My Library" : "Add title to My Library"}
      </div>
    </div>
  );
}
