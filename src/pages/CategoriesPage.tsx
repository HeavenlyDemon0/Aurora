import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { useFinanceStore } from '@/lib/store'
import { formatCurrency, CATEGORY_COLORS } from '@/lib/utils'

export default function CategoriesPage() {
  const { transactions } = useFinanceStore()
  const [selected, setSelected] = useState<string | null>(null)

  const catData = useMemo(() => {
    const map: Record<string, number> = {}
    transactions.filter(t => t.type === 'debit').forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)
  }, [transactions])

  const total = catData.reduce((s, c) => s + c.value, 0)
  const selectedTxs = selected ? transactions.filter(t => t.category === selected && t.type === 'debit') : []

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        {selected && (
          <button onClick={() => setSelected(null)} style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', cursor: 'pointer', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px' }}>
            <ChevronLeft size={16} /> Back
          </button>
        )}
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            {selected ? selected : 'Categories'}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>
            {selected ? `${selectedTxs.length} transactions` : 'Click a category to drill down'}
          </p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {!selected ? (
          <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
            {/* Pie */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Spending Breakdown</h3>
              <ResponsiveContainer width="100%" height={240}>
                <PieChart>
                  <Pie data={catData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={3} dataKey="value">
                    {catData.map(entry => <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#64748b'} />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* List */}
            <div className="card" style={{ padding: '28px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>All Categories</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {catData.map(({ name, value }) => (
                  <button key={name} onClick={() => setSelected(name)} style={{
                    display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 10px',
                    borderRadius: '10px', border: 'none', cursor: 'pointer', background: 'transparent',
                    transition: 'background 0.2s', textAlign: 'left', width: '100%',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: CATEGORY_COLORS[name] || '#64748b', flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: '14px', fontWeight: 500, color: 'var(--text-primary)' }}>{name}</span>
                    <div style={{ flex: 2, height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden', margin: '0 12px' }}>
                      <div style={{ width: `${(value / total) * 100}%`, height: '100%', background: CATEGORY_COLORS[name] || '#64748b', borderRadius: '2px' }} />
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 700, minWidth: '70px', textAlign: 'right' }}>{formatCurrency(value)}</span>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', minWidth: '36px', textAlign: 'right' }}>{Math.round(value / total * 100)}%</span>
                    <ChevronRight size={14} color="var(--text-muted)" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div key="detail" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid var(--border)' }}>
                <div style={{ width: 12, height: 12, borderRadius: '50%', background: CATEGORY_COLORS[selected] || '#64748b' }} />
                <span style={{ fontWeight: 700, fontSize: '16px' }}>{selected}</span>
                <span style={{ marginLeft: 'auto', fontWeight: 800, fontSize: '20px' }}>{formatCurrency(selectedTxs.reduce((s, t) => s + t.amount, 0))}</span>
              </div>
              {selectedTxs.map(t => (
                <div key={t.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 10px', borderRadius: '10px', fontSize: '14px' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)'}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                  <span style={{ color: 'var(--text-secondary)' }}>{t.date}</span>
                  <span style={{ flex: 1, padding: '0 16px' }}>{t.description}</span>
                  <span style={{ fontWeight: 700 }}>{formatCurrency(t.amount)}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}