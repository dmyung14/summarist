"use client";
import { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authSlice";
import styles from "@/app/styles/BookId.module.css";

export default function AddToLibraryBtn() {
  const [isSaved, setIsSaved] = useState(false);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  function handleClick() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    setIsSaved((prev) => !prev);
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
