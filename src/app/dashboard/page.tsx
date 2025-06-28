"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Button from "../../components/Button/Button"
import { User } from "../../types/user"
import styles from "./page.module.scss"
import Image from "next/image"

const DashboardPage = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (!storedUser) {
      return router.push("/auth")
    }

    try {
      const userData: User = JSON.parse(storedUser)
      setUser(userData)
    } catch (error) {
      console.error("Error parsing user data:", error)
      localStorage.removeItem("user")
      router.push("/auth")
    } finally {
      setLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/auth")
  }

  if (loading) {
    return (
      <div className={styles.dashboardContainer}>
        <div className={styles.loadingWrapper}>
          <div className={styles.spinner}></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Will redirect
  }

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <h2>Dashboard</h2>
          </div>

          <div className={styles.userInfo}>
            {!!user.picture.medium ? (
              <Image
                src={user.picture.medium}
                alt="Profile"
                className={styles.avatar}
                width={48}
                height={48}
              />
            ) : (
              <span className={styles.avatarPlaceholder}></span>
            )}

            <div className={styles.userDetails}>
              <div className={styles.userName}>
                {user.name.first} {user.name.last}
              </div>
              <div className={styles.userEmail}>{user.email}</div>
            </div>
            <Button variant="secondary" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.welcomeCard}>
          <div className={styles.welcomeHeader}>
            <h1 className={styles.welcomeTitle}>Welcome to Dashboard</h1>
            <p className={styles.welcomeMessage}>
              Hello {user.name.first}! Welcome to your personal dashboard.
            </p>
          </div>

          <div className={styles.userGrid}>
            <div className={styles.infoCard}>
              <h3>Personal Information</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Full Name:</span>
                <span className={styles.value}>
                  {user.name.title} {user.name.first} {user.name.last}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Gender:</span>
                <span className={styles.value}>
                  {user.gender === "male" ? "Male" : "Female"}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Age:</span>
                <span className={styles.value}>{user.dob.age} years old</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Contact Information</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email:</span>
                <span className={styles.value}>{user.email}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Phone:</span>
                <span className={styles.value}>{user.phone}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Cell:</span>
                <span className={styles.value}>{user.cell}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Address</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Country:</span>
                <span className={styles.value}>{user.location.country}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>City:</span>
                <span className={styles.value}>
                  {user.location.city}, {user.location.state}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Postal Code:</span>
                <span className={styles.value}>{user.location.postcode}</span>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h3>Account Information</h3>
              <div className={styles.infoItem}>
                <span className={styles.label}>Username:</span>
                <span className={styles.value}>{user.login.username}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Registration Date:</span>
                <span className={styles.value}>
                  {new Date(user.registered.date).toLocaleDateString("en-US")}
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Timezone:</span>
                <span className={styles.value}>
                  {user.location.timezone.description}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
