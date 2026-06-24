"use client"

import { useAppDispatch } from "@/redux/hooks"
import { openModal } from "@/redux/slices/authSlice"

interface LoginButtonProps {
  className?: string
  children?: React.ReactNode
}

export default function LoginButton({ className, children = "Login" }: LoginButtonProps) {
  const dispatch = useAppDispatch()

  return (
    <button className={className} onClick={() => dispatch(openModal())}>
      {children}
    </button>
  )
}
