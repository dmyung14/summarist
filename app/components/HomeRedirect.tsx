"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/redux/hooks"

export default function HomeRedirect() {
  const router = useRouter()
  const user = useAppSelector((state) => state.auth.user)

  useEffect(() => {
    if (user) router.push("/for-you")
  }, [user, router])

  return null
}
