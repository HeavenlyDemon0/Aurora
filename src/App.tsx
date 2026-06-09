import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import OnboardingPage from '@/pages/OnboardingPage'
import Dashboard from '@/pages/Dashboard'
import SimulatorPage from '@/pages/SimulatorPage'
import AddTransactionPage from '@/pages/AddTransactionPage'
import CategoriesPage from '@/pages/CategoriesPage'
import AIInsightsPage from '@/pages/AIInsightsPage'
import TransactionsPage from '@/pages/TransactionsPage'
import ReportsPage from '@/pages/ReportsPage'
import ProfilePage from '@/pages/ProfilePage'
import AppLayout from '@/components/AppLayout'
import { useAuthStore } from '@/lib/store'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuthStore()
  if (!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/onboarding" element={<ProtectedRoute><OnboardingPage /></ProtectedRoute>} />
        <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulator" element={<SimulatorPage />} />
          <Route path="/add" element={<AddTransactionPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/insights" element={<AIInsightsPage />} />
          <Route path="/transactions" element={<TransactionsPage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AnimatePresence>
  )
}