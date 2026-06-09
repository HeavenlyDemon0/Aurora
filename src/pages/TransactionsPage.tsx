import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Filter, Download, Edit2, Trash2 } from 'lucide-react'
import { useFinanceStore } from '@/lib/store'
import { formatCurrency, formatDate, CATEGORY_COLORS } from '@/lib/utils'

const EMOJI: Record<string, string> = {
  'Food & Dining': '🍔', 'Transport': '🚗', 'Subscriptions': '📱',
  'Snacks': '☕', 'Utilities': '⚡', 'Groceries': '🛒',
  'Income': '💰', 'Shopping': '🛍️', 'Health': '💊', 'Housing': '🏠',
}

export default function TransactionsPage() {
  const { transactions } = useFinanceStore()
  const [search, setSearch] = useState('')
  const [catFilter, setCatFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  const categories = ['All', ...Array.from(new Set(transactions.map(t => t.category)))]

  const filtered = useMemo(() => transactions.filter(t => {
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase()) || t.category.toLowerCase().includes(search.toLowerCase())
    const matchCat = catFilter === 'All' || t.category === catFilter
    const matchType = typeFilter === 'All' || t.type === typeFilter
    return matchSearch && matchCat && matchType
  }), [transactions, search, catFilter, typeFilter])

  const totalFiltered = filtered.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0)

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '28px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>Transactions</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{filtered.length} transactions · {formatCurrency(totalFiltered)} total</p>
        </div>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '10px 18px' }}>
          <Download size={16} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input className="input-aurora" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions..." style={{ paddingLeft: '42px' }} />
        </div>
        <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', color: 'var(--text-primary)', fontSize: '14px', cursor: 'pointer' }}>
          <option>All</option>
          <option value="debit">Expenses</option>
          <option value="credit">Income</option>
        </select>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '12px', padding: '12px 16px', color: 'var(--text-primary)', fontSize: '14px', cursor: 'pointer' }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      </div>

      {/* Table */}
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '0 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '90px 1fr 120px 100px 60px', gap: '12px', padding: '12px 0', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            <span>Date</span><span>Description</span><span>Category</span><span style={{ textAlign: 'right' }}>Amount</span><span />
          </div>
        </div>
        <div>
          {filtered.map((t, i) => (
            <motion.div key={t.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }}
              style={{ display: 'grid', gridTemplateColumns: '90px 1fr 120px 100px 60px', gap: '12px', padding: '14px 16px', borderBottom: i < filtered.length - 1 ? '1px solid rgba(255,255,255,0.03)' : 'none', alignItems: 'center', transition: 'background 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.date.slice(5)}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '18px' }}>{EMOJI[t.category] || '💳'}</span>
                <span style={{ fontSize: '14px', fontWeight: 500 }}>{t.description}</span>
              </div>
              <span style={{ fontSize: '12px', padding: '4px 10px', borderRadius: '100px', background: `${CATEGORY_COLORS[t.category] || '#64748b'}18`, color: CATEGORY_COLORS[t.category] || '#64748b', fontWeight: 500 }}>
                {t.category}
              </span>
              <span style={{ textAlign: 'right', fontWeight: 700, fontSize: '14px', color: t.type === 'credit' ? '#10b981' : 'var(--text-primary)' }}>
                {t.type === 'credit' ? '+' : '-'}{formatCurrency(t.amount)}
              </span>
              <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}><Edit2 size={14} /></button>
                <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: '4px' }}><Trash2 size={14} /></button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}