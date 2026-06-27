import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  sendPasswordResetEmail,
  signOut,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "@/firebase/firebase";

interface UserState {
  uid: string | null;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: UserState | null;
  loading: boolean;
  error: string | null;
  isModalOpen: boolean;
  isPremium: boolean;
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  isModalOpen: false,
  isPremium: false,
};

export const loginWithEmail = createAsyncThunk(
  "auth/loginWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async (
    { email, password }: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const { uid, email: userEmail, displayName, photoURL } = result.user;
      return { uid, email: userEmail, displayName, photoURL };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { uid, email, displayName, photoURL } = result.user;
      return { uid, email, displayName, photoURL };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const loginAsGuest = createAsyncThunk(
  "auth/loginAsGuest",
  async (_, { rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        "guest@gmail.com",
        "guest123"
      );
      const { uid, email, displayName, photoURL } = result.user;
      return { uid, email, displayName, photoURL };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setIsPremium: (state, action) => {
      state.isPremium = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    const handlePending = (state: AuthState) => {
      state.loading = true;
      state.error = null;
    };
    const handleRejected = (state: AuthState, action: any) => {
      state.loading = false;
      state.error = action.payload as string;
    };
    const handleFulfilled = (state: AuthState, action: any) => {
      state.loading = false;
      state.user = action.payload;
    };

    builder
      .addCase(loginWithEmail.pending, handlePending)
      .addCase(loginWithEmail.fulfilled, handleFulfilled)
      .addCase(loginWithEmail.rejected, handleRejected)

      .addCase(registerWithEmail.pending, handlePending)
      .addCase(registerWithEmail.fulfilled, handleFulfilled)
      .addCase(registerWithEmail.rejected, handleRejected)

      .addCase(loginWithGoogle.pending, handlePending)
      .addCase(loginWithGoogle.fulfilled, handleFulfilled)
      .addCase(loginWithGoogle.rejected, handleRejected)

      .addCase(loginAsGuest.pending, handlePending)
      .addCase(loginAsGuest.fulfilled, handleFulfilled)
      .addCase(loginAsGuest.rejected, handleRejected)

      .addCase(forgotPassword.pending, handlePending)
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, handleRejected)

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.error = null;
      });
  },
});

export const { setUser, setIsPremium, openModal, closeModal, clearError } = authSlice.actions;
export default authSlice.reducer;
