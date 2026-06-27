"use client";
import styles from "@/app/styles/Settings.module.css";
import { useAppSelector } from "@/redux/hooks";
import LoginSettings from "@/app/components/LoginSettings";
import SubscriptionSettings from "@/app/components/SubscriptionSettings";

export default function SettingsPage() {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className={styles.row}>
      <div className={styles.container}>
        <div className={`${styles.section__title} ${styles["page__title"]}`}>
          Settings
        </div>
        {user ? <SubscriptionSettings /> : <LoginSettings />}
      </div>
    </div>
  );
}
