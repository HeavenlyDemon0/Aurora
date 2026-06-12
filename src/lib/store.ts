import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface User {
  id: string
  name: string
  email: string
  isDemo?: boolean
  monthlyIncome?: number
  savingsGoal?: number
  onboarded?: boolean
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
  updateUser: (u: Partial<User>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
      updateUser: (u) => set((s) => ({ user: s.user ? { ...s.user, ...u } : null })),
    }),
    { name: 'aurora-auth' }
  )
)

export interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'debit' | 'credit'
  tags?: string[]
  isDemo?: boolean
}

export const DEMO_TRANSACTIONS: Transaction[] = [
  { id: 'd1', date: '2026-06-01', description: 'Salary Credit', amount: 65000, category: 'Income', type: 'credit', isDemo: true },
  { id: 'd2', date: '2026-06-02', description: 'Swiggy - Dinner', amount: 420, category: 'Food & Dining', type: 'debit', isDemo: true },
  { id: 'd3', date: '2026-06-02', description: 'Auto Rickshaw', amount: 85, category: 'Transport', type: 'debit', isDemo: true },
  { id: 'd4', date: '2026-06-03', description: 'Netflix Subscription', amount: 649, category: 'Subscriptions', type: 'debit', isDemo: true },
  { id: 'd5', date: '2026-06-03', description: 'Chai + Samosa - Canteen', amount: 60, category: 'Snacks', type: 'debit', isDemo: true },
  { id: 'd6', date: '2026-06-04', description: 'Electricity Bill', amount: 1850, category: 'Utilities', type: 'debit', isDemo: true },
  { id: 'd7', date: '2026-06-04', description: 'Zepto - Groceries', amount: 1240, category: 'Groceries', type: 'debit', isDemo: true },
  { id: 'd8', date: '2026-06-05', description: 'Zomato - Lunch', amount: 310, category: 'Food & Dining', type: 'debit', isDemo: true },
  { id: 'd9', date: '2026-06-05', description: 'Spotify', amount: 119, category: 'Subscriptions', type: 'debit', isDemo: true },
  { id: 'd10', date: '2026-06-05', description: 'Amazon - Impulse Buy', amount: 1799, category: 'Shopping', type: 'debit', isDemo: true },
  { id: 'd11', date: '2026-06-06', description: 'Rent', amount: 18000, category: 'Housing', type: 'debit', isDemo: true },
  { id: 'd12', date: '2026-06-06', description: 'Metro Card Recharge', amount: 500, category: 'Transport', type: 'debit', isDemo: true },
  { id: 'd13', date: '2026-06-06', description: 'Blinkit - Snacks', amount: 380, category: 'Snacks', type: 'debit', isDemo: true },
  { id: 'd14', date: '2026-06-07', description: 'Gym Membership', amount: 1500, category: 'Health', type: 'debit', isDemo: true },
  { id: 'd15', date: '2026-06-07', description: 'Coffee - CCD', amount: 220, category: 'Snacks', type: 'debit', isDemo: true },
  { id: 'd16', date: '2026-06-08', description: 'Ola Cab', amount: 340, category: 'Transport', type: 'debit', isDemo: true },
  { id: 'd17', date: '2026-06-09', description: 'BigBasket Order', amount: 2100, category: 'Groceries', type: 'debit', isDemo: true },
  { id: 'd18', date: '2026-06-10', description: 'Movie Tickets - PVR', amount: 680, category: 'Entertainment', type: 'debit', isDemo: true },
]

interface FinanceState {
  transactions: Transaction[]
  userTransactions: Transaction[]
  monthlyIncome: number
  savingsGoal: number
  isDemoMode: boolean
  addTransaction: (t: Transaction) => void
  setIncome: (income: number) => void
  setSavingsGoal: (goal: number) => void
  enableDemo: () => void
  clearDemo: () => void
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set, get) => ({
      transactions: [],
      userTransactions: [],
      monthlyIncome: 0,
      savingsGoal: 0,
      isDemoMode: false,
      addTransaction: (t) => set((s) => ({
        userTransactions: [t, ...s.userTransactions],
        transactions: [t, ...(s.isDemoMode ? DEMO_TRANSACTIONS : s.userTransactions)],
      })),
      setIncome: (income) => set({ monthlyIncome: income }),
      setSavingsGoal: (goal) => set({ savingsGoal: goal }),
      enableDemo: () => set({ isDemoMode: true, transactions: DEMO_TRANSACTIONS, monthlyIncome: 65000, savingsGoal: 15000 }),
      clearDemo: () => set((s) => ({ isDemoMode: false, transactions: s.userTransactions })),
    }),
    { name: 'aurora-finance' }
  )
)