"use client";

import { useEffect } from "react";
import { app } from "@/firebase/firebase";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setIsPremium } from "@/redux/slices/authSlice";

export default function SubscriptionProvider() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.uid) {
      dispatch(setIsPremium(false));
      return;
    }

    const db = getFirestore(app);
    const subscriptionsRef = collection(db, `customers/${user.uid}/subscriptions`);
    const q = query(subscriptionsRef, where("status", "in", ["trialing", "active"]));

    const unsubscribe = onSnapshot(q, (snap) => {
      dispatch(setIsPremium(!snap.empty));
    });

    return () => unsubscribe();
  }, [user?.uid, dispatch]);

  return null;
}
