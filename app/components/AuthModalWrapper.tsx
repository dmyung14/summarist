"use client"

import { useAppSelector } from "@/redux/hooks"
import AuthModal from "./AuthModal"

export default function AuthModalWrapper() {
  const isModalOpen = useAppSelector((state) => state.auth.isModalOpen)

  if (!isModalOpen) return null

  return <AuthModal />
}
