"use client"

import type React from "react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle } from "lucide-react"

interface CommentFormProps {
  onSubmit?: (data: { name: string; email: string; content: string }) => void
  isLoading?: boolean
}

export function CommentForm({ onSubmit, isLoading = false }: CommentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    content: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }

    if (!formData.content.trim()) {
      newErrors.content = "Comment cannot be empty"
    } else if (formData.content.trim().length < 10) {
      newErrors.content = "Comment must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit?.(formData)

      setFormData({ name: "", email: "", content: "" })
      setSubmitted(true)

      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))

    if (errors[field]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[field]
        return updated
      })
    }
  }

  const charCount = formData.content.length
  const maxChars = 5000

  return (
    <Card className="p-4 sm:p-6 border border-border bg-background">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Header */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-foreground">
            Share Your Thoughts
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Be respectful and constructive while commenting.
          </p>
        </div>

        {/* Success Message */}
        {submitted && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-800 dark:text-green-200">
              Comment submitted successfully!
            </p>
          </div>
        )}

        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">Your Name</Label>
          <Input
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            disabled={isLoading}
          />
          {errors.name && (
            <p className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Your Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            disabled={isLoading}
          />
          {errors.email && (
            <p className="flex items-center gap-2 text-xs text-destructive">
              <AlertCircle className="h-3 w-3" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Comment */}
        <div className="space-y-2">
          <Label htmlFor="content">Your Comment</Label>
          <Textarea
            id="content"
            rows={5}
            placeholder="Write your comment..."
            value={formData.content}
            onChange={(e) =>
              handleChange("content", e.target.value.slice(0, maxChars))
            }
            disabled={isLoading}
            className="resize-none"
          />

          <div className="flex justify-between text-xs text-muted-foreground">
            {errors.content ? (
              <span className="flex items-center gap-2 text-destructive">
                <AlertCircle className="h-3 w-3" />
                {errors.content}
              </span>
            ) : (
              <span />
            )}
            <span>
              {charCount} / {maxChars}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Post Comment
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setFormData({ name: "", email: "", content: "" })
              setErrors({})
            }}
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
        </div>

        {/* Footer note */}
        <p className="text-xs text-muted-foreground">
          Your email will not be displayed publicly.
        </p>
      </form>
    </Card>
  )
}
