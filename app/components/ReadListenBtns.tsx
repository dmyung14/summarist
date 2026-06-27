"use client";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authSlice";
import { FaReadme } from "react-icons/fa";
import { IoMicOutline } from "react-icons/io5";
import styles from "@/app/styles/BookId.module.css";

interface Props {
  bookId: string;
  subscriptionRequired: boolean;
}

export default function ReadListenBtns({
  bookId,
  subscriptionRequired,
}: Props) {
  const user = useAppSelector((state) => state.auth.user);
  const isPremium = useAppSelector((state) => state.auth.isPremium);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleClick() {
    if (!user) {
      dispatch(openModal());
      return;
    }
    if (subscriptionRequired && !isPremium) {
      router.push("/choose-plan");
      return;
    }
    router.push(`/player/${bookId}`);
  }

  return (
    <div className={styles["inner-book__read--btn-wrapper"]}>
      <button className={styles["inner-book__read--btn"]} onClick={handleClick}>
        <div className={styles["inner-book__read--icon"]}>
          <FaReadme />
        </div>
        <div className={styles["inner-book__read--text"]}>Read</div>
      </button>
      <button className={styles["inner-book__read--btn"]} onClick={handleClick}>
        <div className={styles["inner-book__read--icon"]}>
          <IoMicOutline />
        </div>
        <div className={styles["inner-book__read--text"]}>Listen</div>
      </button>
    </div>
  );
}
