
'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { Form } from "@base-ui/react"
import { redirect } from "next/navigation"

export default function SignUpPage() {
  const handleSignup = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const user = Object.fromEntries(formData.entries()) as {
      name: string
      email: string
      image: string
      password: string
    }

    const { data, error } = await authClient.signUp.email({
      ...user,
    })

    if (data) {
      redirect('/')
    }

    if (error) {
      console.log(error)
      return
    }

    
  }

  return (
    <Form
      onSubmit={handleSignup}
      className="mx-auto my-5 w-full max-w-md space-y-5 rounded-xl border p-6"
    >
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            name="name"
            placeholder="Jordan Lee"
            autoComplete="name"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="name@example.com"
            autoComplete="email"
            required
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="image">Profile Image URL</FieldLabel>
          <Input
            id="image"
            name="image"
            type="url"
            placeholder="https://example.com/profile.jpg"
          />
        </Field>

        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
            autoComplete="new-password"
            minLength={8}
            required
          />
        </Field>

        <Field orientation="horizontal">
          <Button type="submit" className="flex-1">
            Sign Up
          </Button>
        </Field>
        </FieldGroup>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            Log in
          </Link>
        </p>
    </Form>
  )
}
