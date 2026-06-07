import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
  monthlyIncome?: number
  savingsGoal?: number
}

interface AuthState {
  user: User | null
  login: (user: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: (user) => set({ user }),
      logout: () => set({ user: null }),
    }),
    { name: 'aurora-auth' }
  )
)

interface Transaction {
  id: string
  date: string
  description: string
  amount: number
  category: string
  type: 'debit' | 'credit'
  tags?: string[]
}

interface FinanceState {
  transactions: Transaction[]
  monthlyIncome: number
  savingsGoal: number
  addTransaction: (t: Transaction) => void
  setIncome: (income: number) => void
  setSavingsGoal: (goal: number) => void
}

export const demoTransactions: Transaction[] = [
  { id: '1', date: '2026-06-01', description: 'Salary Credit', amount: 65000, category: 'Income', type: 'credit' },
  { id: '2', date: '2026-06-02', description: 'Swiggy - Dinner', amount: 420, category: 'Food & Dining', type: 'debit' },
  { id: '3', date: '2026-06-02', description: 'Auto Rickshaw', amount: 85, category: 'Transport', type: 'debit' },
  { id: '4', date: '2026-06-03', description: 'Netflix Subscription', amount: 649, category: 'Subscriptions', type: 'debit' },
  { id: '5', date: '2026-06-03', description: 'Chai + Samosa - Canteen', amount: 60, category: 'Snacks', type: 'debit' },
  { id: '6', date: '2026-06-04', description: 'Electricity Bill', amount: 1850, category: 'Utilities', type: 'debit' },
  { id: '7', date: '2026-06-04', description: 'Zepto - Groceries', amount: 1240, category: 'Groceries', type: 'debit' },
  { id: '8', date: '2026-06-05', description: 'Zomato - Lunch', amount: 310, category: 'Food & Dining', type: 'debit' },
  { id: '9', date: '2026-06-05', description: 'Spotify', amount: 119, category: 'Subscriptions', type: 'debit' },
  { id: '10', date: '2026-06-05', description: 'Amazon - Impulse Buy', amount: 1799, category: 'Shopping', type: 'debit' },
  { id: '11', date: '2026-06-06', description: 'Rent', amount: 18000, category: 'Housing', type: 'debit' },
  { id: '12', date: '2026-06-06', description: 'Metro Card Recharge', amount: 500, category: 'Transport', type: 'debit' },
  { id: '13', date: '2026-06-06', description: 'Blinkit - Snacks', amount: 380, category: 'Snacks', type: 'debit' },
  { id: '14', date: '2026-06-07', description: 'Gym Membership', amount: 1500, category: 'Health', type: 'debit' },
  { id: '15', date: '2026-06-07', description: 'Coffee - CCD', amount: 220, category: 'Snacks', type: 'debit' },
]

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      transactions: demoTransactions,
      monthlyIncome: 65000,
      savingsGoal: 15000,
      addTransaction: (t) => set((s) => ({ transactions: [t, ...s.transactions] })),
      setIncome: (income) => set({ monthlyIncome: income }),
      setSavingsGoal: (goal) => set({ savingsGoal: goal }),
    }),
    { name: 'aurora-finance' }
  )
)