import React from "react";
import type { Book } from "@/app/types/book";
import styles from "@/app/styles/BookId.module.css";
import { FaRegStar } from "react-icons/fa6";
import { GoClock } from "react-icons/go";
import { IoMicOutline } from "react-icons/io5";
import { HiOutlineLightBulb } from "react-icons/hi";
import ReadListenBtns from "@/app/components/ReadListenBtns";
import AddToLibraryBtn from "@/app/components/AddToLibraryBtn";
import BookDetailImage from "@/app/components/BookDetailImage";
import AudioDuration from "@/app/components/AudioDuration";

interface Props {
  params: { id: string };
}

const BASE_URL =
  "https://us-central1-summaristt.cloudfunctions.net/getBook?id=";

async function getBook(id: string): Promise<Book> {
  const res = await fetch(`${BASE_URL}${id}`, { cache: "no-store" });
  return res?.json();
}

export default async function BookPage({ params }: Props) {
  const { id } = params;
  const book = await getBook(id);
  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={styles.inner__wrapper}>
          <div className={styles.inner__book}>
            <div className={styles["inner-book__title"]}>
              {book.title}
              {book.subscriptionRequired && " (Premium)"}
            </div>
            <div className={styles["inner-book__author"]}>{book.author}</div>
            <div className={styles["inner-book__sub--title"]}>
              {book.subTitle}
            </div>
            <div className={styles["inner-book__wrapper"]}>
              <div className={styles["inner-book__description--wrapper"]}>
                <div className={styles["inner-book__description"]}>
                  <div className={styles["inner-book__icon"]}>
                    <FaRegStar />
                  </div>
                  <div className={styles["inner-book__key--ideas"]}>
                    {book.averageRating} {`(${book.totalRating})`}
                  </div>
                </div>
                <div className={styles["inner-book__description"]}>
                  <div className={styles["inner-book__icon"]}>
                    <GoClock />
                  </div>
                  <AudioDuration audioLink={book.audioLink} className={styles["inner-book__key--ideas"]} />
                </div>
                <div className={styles["inner-book__description"]}>
                  <div className={styles["inner-book__icon"]}>
                    <IoMicOutline />
                  </div>
                  <div className={styles["inner-book__key--ideas"]}>
                    Audio & Text
                  </div>
                </div>
                <div className={styles["inner-book__description"]}>
                  <div className={styles["inner-book__icon"]}>
                    <HiOutlineLightBulb />
                  </div>
                  <div className={styles["inner-book__key--ideas"]}>
                    {book.keyIdeas} Key ideas
                  </div>
                </div>
              </div>
            </div>
            <ReadListenBtns
              bookId={id}
              subscriptionRequired={book.subscriptionRequired}
            />
            <AddToLibraryBtn book={book} />
            <div className={styles["inner-book__secondary--title"]}>
              What's it about?
            </div>
            <div className={styles["inner-book__tags--wrapper"]}>
              {book.tags.map((tag) => (
                <div className={styles["inner-book__tag"]}>{tag}</div>
              ))}
            </div>
            <div className={styles["inner-book__book--description"]}>
              {book.bookDescription}
            </div>
            <h2 className={styles["inner-book__secondary--title"]}>
              About the author
            </h2>
            <div className={styles["inner-book__author--description"]}>
              {book.authorDescription}
            </div>
          </div>
          <div className={styles["inner-book--img-wrapper"]}>
            <figure className={styles["book__image--wrapper"]}>
              <BookDetailImage
                src={book.imageLink}
                alt={book.title}
                className={styles.book__image}
              />
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
