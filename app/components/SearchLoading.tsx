"use client";
import styles from "@/app/styles/SearchLoadingState.module.css";
import Link from "next/link";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { Book } from "@/app/types/book";

interface SearchLoadingProps {
  book: Book;
}

const SearchLoading = ({ book }: SearchLoadingProps) => {
  return (
    <Link className={styles["search__book--link"]} href={`/book/${book.id}`}>
      <figure className={styles["book__image--wrapper"]}>
        <img
          className={styles.book__image}
          src={book.imageLink}
          alt={book.title}
        />
      </figure>
      <div>
        <div className={styles["search__book--title"]}>{book.title}</div>
        <div className={styles["search__book--author"]}>{book.author}</div>
        <div className={styles["search__book--duration"]}>
          <div className={styles["recommended__book--details"]}>
            <div className={styles["recommended__book--details-icon"]}>
              <BsFillPlayCircleFill />
            </div>
            <div className={styles["recommended__book--details-text"]}>
              {book.type}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchLoading;
