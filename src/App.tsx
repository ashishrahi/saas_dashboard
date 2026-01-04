import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "@/AppLayout/MainLayout";
import DashboardPage from "@/Pages/DashboardPage/DashboardPage";
import UserPage from "@/Pages/UserPage/UserPage";
import SignInPage from "@/Pages/AuthPage/SignInPage";
import FeaturesPage from "@/Pages/FeaturePage/FeaturesPage";
import ProtectedRoute from "@/AppComponent/ProtectRoutes/ProtectedRoutes";
import ErrorBoundary from "./AppComponent/ErrorBoundary/ErrorBoundary";
// import AccessDenied from "@/Pages/AccessDenied/AccessDenied"; // optional 403 page

export default function App() {
  return (
    <BrowserRouter>
     <ErrorBoundary>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="features" element={<FeaturesPage />} />
          </Route>
        </Route>

        {/* Role-based example: admin only */}
        {/* <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<AdminPage />} />
        </Route> */}

        {/* Forbidden page */}
        {/* <Route path="/403" element={<AccessDenied />} /> */}
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
