"use client";
import styles from "@/app/styles/Settings.module.css";
import Image from "next/image";
import LoginPage from "@/app/assets/login.png";
import { useAppDispatch } from "@/redux/hooks";
import { openModal } from "@/redux/slices/authSlice";

export default function LoginSettings() {
  const dispatch = useAppDispatch();

  return (
    <div className={styles["settings__login--wrapper"]}>
      <Image src={LoginPage} alt="login page" />
      <div className={styles["settings__login--text"]}>
        Log in to your account to see your details.
      </div>
      <button
        className={`${styles.btn} ${styles["settings__login--btn"]}`}
        onClick={() => dispatch(openModal())}
      >
        Login
      </button>
    </div>
  );
}
