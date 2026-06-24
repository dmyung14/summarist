"use client"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import styles from "@/app/styles/AuthModal.module.css"
import { IoMdClose } from "react-icons/io"
import { IoPerson } from "react-icons/io5"
import GoogleLogo from "@/app/assets/google.png"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
  loginWithEmail,
  registerWithEmail,
  loginWithGoogle,
  loginAsGuest,
  forgotPassword,
  closeModal,
} from "@/redux/slices/authSlice"

const AuthModal = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { loading, error } = useAppSelector((state) => state.auth)

  const [isLoginView, setIsLoginView] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [resetSent, setResetSent] = useState(false)

  const handleClose = () => dispatch(closeModal())

  const handleSuccess = () => {
    handleClose()
    router.push("/for-you")
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const action = isLoginView
      ? loginWithEmail({ email, password })
      : registerWithEmail({ email, password })
    const result = await dispatch(action)
    if (
      loginWithEmail.fulfilled.match(result) ||
      registerWithEmail.fulfilled.match(result)
    ) {
      handleSuccess()
    }
  }

  const handleGoogleLogin = async () => {
    const result = await dispatch(loginWithGoogle())
    if (loginWithGoogle.fulfilled.match(result)) handleSuccess()
  }

  const handleGuestLogin = async () => {
    const result = await dispatch(loginAsGuest())
    if (loginAsGuest.fulfilled.match(result)) handleSuccess()
  }

  const handleForgotPassword = async () => {
    if (!email) return
    const result = await dispatch(forgotPassword(email))
    if (forgotPassword.fulfilled.match(result)) setResetSent(true)
  }

  return (
    <div className={styles.auth__wrapper}>
      <div className={styles.auth}>
        <div className={styles.auth__content}>
          <button className={styles["auth__close--btn"]} onClick={handleClose}>
            <IoMdClose />
          </button>

          <h2 className={styles.auth__title}>
            {isLoginView ? "Log in to Summarist" : "Sign up to Summarist"}
          </h2>

          {isLoginView && (
            <>
              <button
                className={`${styles.btn} ${styles["guest__btn--wrapper"]}`}
                onClick={handleGuestLogin}
                disabled={loading}
              >
                <div className={styles["guest__icon--mask"]}>
                  <IoPerson />
                </div>
                {loading ? "Loading..." : "Login as a Guest"}
              </button>

              <div className={styles.auth__separator}>
                <span />
                <span>or</span>
                <span />
              </div>
            </>
          )}

          <button
            className={`${styles.btn} ${styles["google__btn--wrapper"]}`}
            onClick={handleGoogleLogin}
            disabled={loading}
          >
            <div className={styles["google__icon--mask"]}>
              <Image src={GoogleLogo} alt="Google" width={24} height={24} />
            </div>
            {loading ? "Loading..." : isLoginView ? "Login with Google" : "Sign up with Google"}
          </button>

          <div className={styles.auth__separator}>
            <span />
            <span>or</span>
            <span />
          </div>

          <form className={styles["auth__main--form"]} onSubmit={handleEmailLogin}>
            <input
              type="email"
              placeholder="Email Address"
              className={styles["auth__main--input"]}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className={styles["auth__main--input"]}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && (
              <p style={{ color: "red", fontSize: "14px", textAlign: "center" }}>
                {error}
              </p>
            )}
            <button type="submit" className={styles.btn} disabled={loading}>
              {loading ? "Loading..." : isLoginView ? "Login" : "Sign up"}
            </button>
          </form>
        </div>

        {isLoginView && (
          <div
            className={styles["auth__forgot--password"]}
            onClick={handleForgotPassword}
          >
            {resetSent ? "Password reset email sent!" : "Forgot your password?"}
          </div>
        )}

        <button
          className={styles["auth__switch--btn"]}
          onClick={() => {
            setIsLoginView((prev) => !prev)
            setResetSent(false)
          }}
        >
          {isLoginView ? "Don't have an account?" : "Already have an account?"}
        </button>
      </div>
    </div>
  )
}

export default AuthModal
