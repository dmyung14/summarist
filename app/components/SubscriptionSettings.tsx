"use client";
import { useEffect, useState } from "react";
import styles from "@/app/styles/Settings.module.css";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { app } from "@/firebase/firebase";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";

type PlanType = "basic" | "premium" | "premium-plus";

export default function SubscriptionSettings() {
  const user = useAppSelector((state) => state.auth.user);
  const [plan, setPlan] = useState<PlanType>("basic");

  useEffect(() => {
    if (!user?.uid) return;

    const db = getFirestore(app);
    const subscriptionsRef = collection(db, `customers/${user.uid}/subscriptions`);
    const q = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));

    const unsubscribe = onSnapshot(q, (snap) => {
      if (snap.empty) {
        setPlan("basic");
        return;
      }
      const sub = snap.docs[0].data();
      const interval = sub?.items?.[0]?.plan?.interval ?? sub?.plan?.interval;
      if (interval === "year") {
        setPlan("premium-plus");
      } else if (interval === "month") {
        setPlan("premium");
      } else {
        setPlan("basic");
      }
    });

    return () => unsubscribe();
  }, [user?.uid]);

  return (
    <>
      <div className={styles.setting__content}>
        <div className={styles["settings__sub--title"]}>
          Your Subscription plan
        </div>
        <div className={styles.settings__text}>{plan}</div>
        {plan === "basic" && (
          <Link
            className={`${styles.btn} ${styles["settings__upgrade--btn"]}`}
            href="/choose-plan"
          >
            Upgrade to Premium
          </Link>
        )}
      </div>
      <div className={styles.setting__content}>
        <div className={styles["settings__sub--title"]}>Email</div>
        <div className={styles.settings__text}>{user?.email}</div>
      </div>
    </>
  );
}
