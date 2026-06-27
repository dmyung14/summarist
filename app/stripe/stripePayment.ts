"use client";

import { FirebaseApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, onSnapshot } from "firebase/firestore";

export const getCheckoutUrl = async (
  app: FirebaseApp,
  priceId: string
): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const checkoutSessionRef = collection(db, `customers/${userId}/checkout_sessions`);

  const docRef = await addDoc(checkoutSessionRef, {
    price: priceId,
    success_url: window.location.origin + "/for-you",
    cancel_url: window.location.origin + "/choose-plan",
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data() as { error?: { message: string }; url?: string };
      if (data?.error) {
        unsubscribe();
        reject(new Error(data.error.message));
      }
      if (data?.url) {
        unsubscribe();
        resolve(data.url);
      }
    });
  });
};

export const getPortalUrl = async (app: FirebaseApp): Promise<string> => {
  const auth = getAuth(app);
  const userId = auth.currentUser?.uid;
  if (!userId) throw new Error("User is not authenticated");

  const db = getFirestore(app);
  const portalRef = collection(db, `customers/${userId}/portal_links`);

  const docRef = await addDoc(portalRef, {
    returnUrl: window.location.origin,
  });

  return new Promise<string>((resolve, reject) => {
    const unsubscribe = onSnapshot(docRef, (snap) => {
      const data = snap.data() as { error?: { message: string }; url?: string };
      if (data?.error) {
        unsubscribe();
        reject(new Error(data.error.message));
      }
      if (data?.url) {
        unsubscribe();
        resolve(data.url);
      }
    });
  });
};
