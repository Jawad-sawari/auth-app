"use client"
import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Input from "../../components/Input/Input"
import Button from "../../components/Button/Button"
import { User, ApiResponse } from "../../types/user"
import styles from "./page.module.scss"

const AuthPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const user = localStorage.getItem("user")
    if (user) {
      router.push("/dashboard")
    }
  }, [router])

  const validatePhoneNumber = (phone: string): boolean => {
    const iranPhoneRegex = /^09\d{9}$/
    return iranPhoneRegex.test(phone)
  }

  const handlePhoneChange = (value: string) => {
    setPhoneNumber(value)
    setError("")
  }

  const handleLogin = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setError("Phone number must be in format 09XXXXXXXXX")
      return
    }

    setLoading(true)
    try {
      const response = await fetch(
        "https://randomuser.me/api/?results=1&nat=us"
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data: ApiResponse = await response.json()
      const user: User = data.results[0]

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user))

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (err) {
      setError("Login error. Please try again")
      console.error("Login error:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.authContainer}>
      <div className={styles.authCard}>
        <div className={styles.header}>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.subtitle}>Enter your phone number to continue</p>
        </div>

        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault()
            handleLogin()
          }}
        >
          <div className={styles.inputGroup}>
            <Input
              label="Phone Number"
              placeholder="09123456789"
              value={phoneNumber}
              onChange={handlePhoneChange}
              error={error}
              type="tel"
              required
            />
            <p className={styles.phoneHelper}>
              Format: 09XXXXXXXXX (11 digits)
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            disabled={loading || !phoneNumber}
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default AuthPage
