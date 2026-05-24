import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/AppLayout/MainLayout";
import DashboardPage from "@/Pages/DashboardPage/DashboardPage";
import UserPage from "@/Pages/UserPage/UserPage";
import SignInPage from "@/Pages/AuthPage/SignInPage";
import FeaturesPage from "@/Pages/FeaturePage/FeaturesPage";
import CategoryPage from "@/Pages/CategoryPage/CategoryPage";
import SubCategoryPage from "@/Pages/SubCategoryPage/SubCategoryPage";
import ProtectedRoute from "@/AppComponent/ProtectRoutes/ProtectedRoutes";
import ErrorBoundary from "./AppComponent/ErrorBoundary/ErrorBoundary";
import PlanPage from "./Pages/PlanPage/PlanPage";
import ContactPage from "./Pages/ContactPage/ContactPage";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import SettingsPage from "./Pages/SettingsPage/SettingsPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";
import AccessDeniedPage from "./Pages/AccessDeniedPage/AccessDeniedPage";

export default function App() {
  return (
    <BrowserRouter>
     <ErrorBoundary>
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/login" element={<Navigate to="/signin" replace />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<DashboardPage />} />
            <Route path="users" element={<UserPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="categories" element={<CategoryPage />} />
            <Route path="subcategories" element={<SubCategoryPage />} />
            <Route path="plan" element={<PlanPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>
        </Route>

        <Route path="/403" element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
