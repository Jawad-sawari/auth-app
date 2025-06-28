"use client"

import React from "react"
import styles from "./Input.module.scss"

interface InputProps {
  label?: string
  placeholder?: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: "text" | "tel" | "email" | "password"
  required?: boolean
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  error,
  type = "text",
  required = false,
}: InputProps) => {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label className={styles.label}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </label>
      )}
      <input
        type={type}
        className={`${styles.input} ${error ? styles.error : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
      />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  )
}
export default Input
