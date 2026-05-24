import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import LogoImage from "@/assets/logo.png"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"

import type { AppDispatch, RootState } from "@/store/store"
import {
  registerUser,
  clearMessage,
  clearError,
} from "@/store/AuthSlice"

const REGISTER_ERROR_TOAST_ID = "register-error-toast"
const REGISTER_SUCCESS_TOAST_ID = "register-success-toast"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { token, user, loading, error, message } = useSelector(
    (state: RootState) => state.auth
  )

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(registerUser({ name, email, password }))
  }

  useEffect(() => {
    if (message) {
      toast.success(message, { id: REGISTER_SUCCESS_TOAST_ID })
      dispatch(clearMessage())
    }
    if (error) {
      toast.error(error, { id: REGISTER_ERROR_TOAST_ID })
      dispatch(clearError())
    }
  }, [message, error, dispatch])

  useEffect(() => {
    if (user && token) {
      navigate("/")
    }
  }, [user, token, navigate])

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="flex flex-col items-center gap-2">
          <img
            src={LogoImage}
            alt="Logo"
            className="h-42 w-52 object-contain"
          />
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Register your organization to get started
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Register"}
                </Button>
              </Field>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  Sign in
                </Link>
              </p>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
