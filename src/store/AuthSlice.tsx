import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "@/Services/apiClient"
import type { PayloadAction } from "@reduxjs/toolkit"
import { safeParseJson } from "@/utilities/safeStorage"
import { getApiErrorMessage } from "@/utilities/apiError"

export interface IAuth {
  _id: string
  tenantId?: string
  email: string
  role: string
  createdAt?: string
  updatedAt?: string
}

export interface IUserProfile {
  _id: string
  tenantId?: string
  authId: string
  name?: string
  email?: string
  isActive?: boolean
  createdAt?: string
  updatedAt?: string
}

export interface IAuthSession {
  auth: IAuth
  user: IUserProfile | null
  token: string
  refreshToken: string
  tenantId: string
  message?: string
  success?: boolean
}

export interface ILoginCredentials {
  email: string
  password: string
}

export interface IRegisterCredentials {
  name: string
  email: string
  password: string
}

export interface IAuthState {
  token: string | null
  refreshToken: string | null
  tenantId: string | null
  auth: IAuth | null
  user: IUserProfile | null
  loading: boolean
  error: string | null
  message: string | null
}

const persistSession = (session: {
  token: string
  refreshToken: string
  tenantId: string
  auth: IAuth
  user: IUserProfile | null
}) => {
  if (typeof window === "undefined") return
  localStorage.setItem("token", session.token)
  localStorage.setItem("refreshToken", session.refreshToken)
  localStorage.setItem("tenantId", session.tenantId)
  localStorage.setItem("auth", JSON.stringify(session.auth))
  if (session.user) {
    localStorage.setItem("user", JSON.stringify(session.user))
  } else {
    localStorage.removeItem("user")
  }
}

const clearSessionStorage = () => {
  if (typeof window === "undefined") return
  localStorage.removeItem("token")
  localStorage.removeItem("refreshToken")
  localStorage.removeItem("tenantId")
  localStorage.removeItem("auth")
  localStorage.removeItem("user")
}

const initialState: IAuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
  tenantId:
    typeof window !== "undefined" ? localStorage.getItem("tenantId") : null,
  auth:
    typeof window !== "undefined"
      ? safeParseJson<IAuth | null>(localStorage.getItem("auth"), null)
      : null,
  user:
    typeof window !== "undefined"
      ? safeParseJson<IUserProfile | null>(localStorage.getItem("user"), null)
      : null,
  loading: false,
  error: null,
  message: null,
}

const normalizeSession = (data: Record<string, unknown>): IAuthSession => {
  const auth = data.auth as IAuth
  const user = (data.user ?? null) as IUserProfile | null
  const tenantId =
    (data.tenantId as string | undefined) ??
    auth?.tenantId ??
    user?.tenantId ??
    ""

  return {
    auth,
    user,
    token: data.token as string,
    refreshToken: data.refreshToken as string,
    tenantId: String(tenantId),
  }
}

export const loginUser = createAsyncThunk<
  IAuthSession,
  ILoginCredentials,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/v1/admin/login", {
      email: userData.email.trim(),
      password: userData.password,
    })
    if (!response.data?.data) throw new Error("Invalid API response")
    return {
      ...normalizeSession(response.data.data),
      message: response.data.message,
      success: response.data.success,
    }
  } catch (err: unknown) {
    return rejectWithValue(getApiErrorMessage(err, "Login failed"))
  }
})

export const registerUser = createAsyncThunk<
  IAuthSession,
  IRegisterCredentials,
  { rejectValue: string }
>("auth/registerUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/v1/admin/register", userData)
    if (!response.data?.data) throw new Error("Invalid API response")
    return {
      ...normalizeSession(response.data.data),
      message: response.data.message,
      success: response.data.success,
    }
  } catch (err: unknown) {
    return rejectWithValue(getApiErrorMessage(err, "Registration failed"))
  }
})

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logoutUser",
  async (_, { rejectWithValue }) => {
    const refreshToken =
      typeof window !== "undefined"
        ? localStorage.getItem("refreshToken")
        : null

    if (!refreshToken) return

    try {
      await axiosInstance.post("/v1/admin/logout", { refreshToken })
    } catch (err: unknown) {
      return rejectWithValue(getApiErrorMessage(err, "Logout failed"))
    }
  }
)

const applySession = (state: IAuthState, session: IAuthSession, message: string) => {
  state.token = session.token
  state.refreshToken = session.refreshToken
  state.tenantId = session.tenantId
  state.auth = session.auth
  state.user = session.user
  state.message = message
  persistSession(session)
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.refreshToken = null
      state.tenantId = null
      state.auth = null
      state.user = null
      state.error = null
      state.message = null
      clearSessionStorage()
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.token = action.payload
      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload)
      }
    },
    clearError(state) {
      state.error = null
    },
    clearMessage(state) {
      state.message = null
    },
  },
  extraReducers: (builder) => {
    const handleAuthPending = (state: IAuthState) => {
      state.loading = true
      state.error = null
      state.message = null
    }

    const handleAuthRejected = (
      state: IAuthState,
      action: { payload?: string }
    ) => {
      state.loading = false
      state.error = action.payload || "Request failed"
      state.token = null
      state.refreshToken = null
      state.tenantId = null
      state.auth = null
      state.user = null
      state.message = null
      clearSessionStorage()
    }

    builder
      .addCase(loginUser.pending, handleAuthPending)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        applySession(
          state,
          action.payload,
          action.payload.message || "Logged in successfully"
        )
      })
      .addCase(loginUser.rejected, handleAuthRejected)

      .addCase(registerUser.pending, handleAuthPending)
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        applySession(
          state,
          action.payload,
          action.payload.message || "Account created successfully"
        )
      })
      .addCase(registerUser.rejected, handleAuthRejected)

      .addCase(logoutUser.fulfilled, (state) => {
        state.token = null
        state.refreshToken = null
        state.tenantId = null
        state.auth = null
        state.user = null
        state.error = null
        state.message = null
        state.loading = false
        clearSessionStorage()
      })
      .addCase(logoutUser.rejected, (state) => {
        state.token = null
        state.refreshToken = null
        state.tenantId = null
        state.auth = null
        state.user = null
        state.loading = false
        clearSessionStorage()
      })
  },
})

export const { logout, setAccessToken, clearError, clearMessage } =
  authSlice.actions
export default authSlice.reducer
