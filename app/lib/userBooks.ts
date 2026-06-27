import { db } from "@/firebase/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import type { Book } from "@/app/types/book";

export async function saveBook(uid: string, book: Book) {
  await setDoc(doc(db, `users/${uid}/savedBooks/${book.id}`), { ...book });
}

export async function unsaveBook(uid: string, bookId: string) {
  await deleteDoc(doc(db, `users/${uid}/savedBooks/${bookId}`));
}

export async function finishBook(uid: string, book: Book) {
  await setDoc(doc(db, `users/${uid}/finishedBooks/${book.id}`), { ...book });
}
