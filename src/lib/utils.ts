export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })
}

export const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': '#f43f5e',
  'Transport': '#f59e0b',
  'Subscriptions': '#8b5cf6',
  'Snacks': '#ec4899',
  'Utilities': '#0ea5e9',
  'Groceries': '#10b981',
  'Shopping': '#f97316',
  'Housing': '#6366f1',
  'Health': '#14b8a6',
  'Income': '#10b981',
  'Entertainment': '#a78bfa',
  'Other': '#64748b',
}

export const LEAK_CATEGORIES = ['Food & Dining', 'Snacks', 'Subscriptions', 'Shopping', 'Entertainment']