import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import LogoImage from "@/assets/logo.png"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

import type { AppDispatch, RootState } from "@/store/store"
import { loginUser, clearMessage, clearError } from "@/store/AuthSlice"

const LOGIN_ERROR_TOAST_ID = "login-error-toast"
const LOGIN_SUCCESS_TOAST_ID = "login-success-toast"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { token, user, loading, error, message } = useSelector(
    (state: RootState) => state.auth
  )

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(
      loginUser({
        email,
        password,
      })
    )
  }

 
  useEffect(() => {
    if (message) {
      toast.success(message, { id: LOGIN_SUCCESS_TOAST_ID })
      dispatch(clearMessage()) 
    }
    if (error) {
      toast.error(error, { id: LOGIN_ERROR_TOAST_ID })
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
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit}>
            <FieldGroup>
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
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Field>

              <Field>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
