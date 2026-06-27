"use client";
import { useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { setSavedBooks, setFinishedBooks, resetLibrary } from "@/redux/slices/librarySlice";
import type { Book } from "@/app/types/book";

export default function LibraryProvider() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    if (!user?.uid) {
      dispatch(resetLibrary());
      return;
    }

    const savedRef = collection(db, `users/${user.uid}/savedBooks`);
    const finishedRef = collection(db, `users/${user.uid}/finishedBooks`);

    const unsubSaved = onSnapshot(savedRef, (snap) => {
      const books = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Book));
      dispatch(setSavedBooks(books));
    });

    const unsubFinished = onSnapshot(finishedRef, (snap) => {
      const books = snap.docs.map((d) => ({ id: d.id, ...d.data() } as Book));
      dispatch(setFinishedBooks(books));
    });

    return () => {
      unsubSaved();
      unsubFinished();
    };
  }, [user?.uid]);

  return null;
}
