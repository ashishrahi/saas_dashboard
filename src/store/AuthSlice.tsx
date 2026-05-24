import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axiosInstance from "@/Services/apiClient"
import type {PayloadAction} from "@reduxjs/toolkit"
import { safeParseJson } from "@/utilities/safeStorage"
import { getApiErrorMessage } from "@/utilities/apiError"

// ===== Types =====
export interface IAuth {
  _id: string
  email: string
  password: string
  role: string
  createdAt: string
  updatedAt: string
}

export interface IUserProfile {
  _id: string
  authId: string
  isActive?: boolean
  createdAt: string
  updatedAt: string
}

export interface ILoginResponse {
  auth: IAuth
  userProfile: IUserProfile
  token: string
  refreshToken: string
  message?: string
  success?: boolean
}

export interface IUser {
  email: string
  password: string
}

export interface IAuthState {
  token: string | null
  refreshToken: string | null
  auth: IAuth | null
  user: IUserProfile | null
  loading: boolean
  error: string | null
  message: string | null
}

// ===== Initial State =====
const initialState: IAuthState = {
  token: typeof window !== "undefined" ? localStorage.getItem("token") : null,
  refreshToken:
    typeof window !== "undefined" ? localStorage.getItem("refreshToken") : null,
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

// ===== Thunk =====
export const loginUser = createAsyncThunk<
  ILoginResponse,
  IUser,
  { rejectValue: string }
>("auth/loginUser", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/v1/admin/login", userData)
    if (!response.data) throw new Error("Invalid API response")
    // API returns { success, message, data }
    return {
      ...response.data.data,
      message: response.data.message,
      success: response.data.success,
    }
  } catch (err: unknown) {
    return rejectWithValue(getApiErrorMessage(err, "Login failed"))
  }
})

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null
      state.refreshToken = null
      state.auth = null
      state.user = null
      state.error = null
      state.message = null
      if (typeof window !== "undefined") {
        localStorage.removeItem("token")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("auth")
        localStorage.removeItem("user")
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
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.message = null
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<ILoginResponse>) => {
        state.loading = false
        state.error = null
        const { token, refreshToken, auth, userProfile, message } = action.payload
        state.token = token
        state.refreshToken = refreshToken
        state.auth = auth
        state.user = userProfile
        state.message = message || "Logged in successfully"

        if (typeof window !== "undefined") {
          localStorage.setItem("token", token)
          localStorage.setItem("refreshToken", refreshToken)
          localStorage.setItem("auth", JSON.stringify(auth))
          localStorage.setItem("user", JSON.stringify(userProfile))
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || "Login failed"
        state.token = null
        state.refreshToken = null
        state.auth = null
        state.user = null
        state.message = null
        if (typeof window !== "undefined") {
          localStorage.removeItem("token")
          localStorage.removeItem("refreshToken")
          localStorage.removeItem("auth")
          localStorage.removeItem("user")
        }
      })
  },
})

export const { logout, clearError, clearMessage } = authSlice.actions
export default authSlice.reducer
