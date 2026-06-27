"use client";

import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";

export const getSubscriptionStatus = async (
  app: FirebaseApp
): Promise<boolean> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) return false;

  const db = getFirestore(app);
  const subscriptionsRef = collection(db, `customers/${userId}/subscriptions`);
  const q = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));

  return new Promise<boolean>((resolve, reject) => {
    const unsubscribe = onSnapshot(
      q,
      (snap) => {
        unsubscribe();
        resolve(!snap.empty);
      },
      reject
    );
  });
};
