"use client"

import React, { ReactNode } from "react"
import styles from "./Button.module.scss"

interface ButtonProps {
  children: ReactNode
  onClick?: () => void
  type?: "button" | "submit" | "reset"
  variant?: "primary" | "secondary"
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
  className?: string
}

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  className = "",
}: ButtonProps) => {
  const buttonClasses = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    loading ? styles.loading : "",
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type={type}
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading && <div className={styles.spinner} />}
      <span className={loading ? styles.hiddenText : ""}>{children}</span>
    </button>
  )
}
export default Button
