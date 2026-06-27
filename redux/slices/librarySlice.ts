import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "@/app/types/book";

interface LibraryState {
  savedBooks: Book[];
  finishedBooks: Book[];
  savedBooksLoading: boolean;
  finishedBooksLoading: boolean;
}

const initialState: LibraryState = {
  savedBooks: [],
  finishedBooks: [],
  savedBooksLoading: true,
  finishedBooksLoading: true,
};

const librarySlice = createSlice({
  name: "library",
  initialState,
  reducers: {
    setSavedBooks: (state, action: PayloadAction<Book[]>) => {
      state.savedBooks = action.payload;
      state.savedBooksLoading = false;
    },
    setFinishedBooks: (state, action: PayloadAction<Book[]>) => {
      state.finishedBooks = action.payload;
      state.finishedBooksLoading = false;
    },
    resetLibrary: (state) => {
      state.savedBooks = [];
      state.finishedBooks = [];
      state.savedBooksLoading = true;
      state.finishedBooksLoading = true;
    },
    // kept for direct optimistic updates if needed
    addSavedBook: (state, action: PayloadAction<Book>) => {
      const exists = state.savedBooks.some((b) => b.id === action.payload.id);
      if (!exists) state.savedBooks.push(action.payload);
    },
    removeSavedBook: (state, action: PayloadAction<string>) => {
      state.savedBooks = state.savedBooks.filter((b) => b.id !== action.payload);
    },
    addFinishedBook: (state, action: PayloadAction<Book>) => {
      const exists = state.finishedBooks.some((b) => b.id === action.payload.id);
      if (!exists) state.finishedBooks.push(action.payload);
    },
  },
});

export const {
  setSavedBooks,
  setFinishedBooks,
  resetLibrary,
  addSavedBook,
  removeSavedBook,
  addFinishedBook,
} = librarySlice.actions;
export default librarySlice.reducer;
