import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts'
import { Sliders, Lock, TrendingUp, Zap, RotateCcw } from 'lucide-react'
import { useFinanceStore } from '@/lib/store'
import { formatCurrency, LEAK_CATEGORIES, CATEGORY_COLORS } from '@/lib/utils'

const PRESETS = [
  { name: '🎓 Student Mode', values: { 'Food & Dining': 50, 'Snacks': 60, 'Subscriptions': 80, 'Shopping': 70, 'Entertainment': 50 } },
  { name: '📅 Exam Month', values: { 'Food & Dining': 30, 'Snacks': 40, 'Subscriptions': 20, 'Shopping': 80, 'Entertainment': 90 } },
  { name: '🎆 Festive Season', values: { 'Food & Dining': 0, 'Snacks': 0, 'Subscriptions': 20, 'Shopping': 0, 'Entertainment': 0 } },
  { name: '💪 Max Savings', values: { 'Food & Dining': 60, 'Snacks': 80, 'Subscriptions': 50, 'Shopping': 70, 'Entertainment': 60 } },
]

export default function SimulatorPage() {
  const { transactions, monthlyIncome } = useFinanceStore()
  const [reductions, setReductions] = useState<Record<string, number>>({})
  const [locked, setLocked] = useState(false)

  const catSpend = useMemo(() => {
    const map: Record<string, number> = {}
    transactions.filter(t => t.type === 'debit' && LEAK_CATEGORIES.includes(t.category))
      .forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return map
  }, [transactions])

  const totalLeaks = Object.values(catSpend).reduce((a, b) => a + b, 0)

  const savedPerCat = useMemo(() =>
    Object.entries(catSpend).reduce((acc, [cat, spend]) => {
      acc[cat] = Math.round(spend * ((reductions[cat] || 0) / 100))
      return acc
    }, {} as Record<string, number>)
  , [catSpend, reductions])

  const totalMonthlySaved = Object.values(savedPerCat).reduce((a, b) => a + b, 0)
  const totalYearlySaved = totalMonthlySaved * 12
  const fiveYearWealth = Math.round(totalMonthlySaved * 12 * 6.34)
  const newSavingsRate = Math.round(((monthlyIncome - totalLeaks + totalMonthlySaved) / monthlyIncome) * 100)

  const barData = Object.entries(catSpend).map(([cat, spend]) => ({
    name: cat.split(' ')[0],
    before: spend,
    after: Math.round(spend * (1 - (reductions[cat] || 0) / 100)),
    color: CATEGORY_COLORS[cat] || '#64748b',
  }))

  const applyPreset = (preset: typeof PRESETS[0]) => {
    setReductions(preset.values)
  }

  const reset = () => setReductions({})

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sliders size={20} color="#10b981" />
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>Leakage Simulator</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
          Drag the sliders to see your savings potential in real time. No commitment — just insight.
        </p>
      </div>

      {/* Presets */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
        {PRESETS.map(p => (
          <button key={p.name} onClick={() => applyPreset(p)} style={{
            padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--border)',
            background: 'var(--bg-card)', color: 'var(--text-secondary)', fontSize: '13px',
            cursor: 'pointer', transition: 'all 0.2s', fontWeight: 500,
          }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.5)'; (e.currentTarget as HTMLElement).style.color = '#a5b4fc' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'; (e.currentTarget as HTMLElement).style.color = 'var(--text-secondary)' }}>
            {p.name}
          </button>
        ))}
        <button onClick={reset} style={{ padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--border)', background: 'transparent', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <RotateCcw size={13} /> Reset
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* LEFT — Sliders */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.entries(catSpend).map(([cat, spend]) => {
            const pct = reductions[cat] || 0
            const saved = savedPerCat[cat] || 0
            const color = CATEGORY_COLORS[cat] || '#64748b'
            return (
              <motion.div key={cat} layout className="card" style={{ padding: '22px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '15px', marginBottom: '4px' }}>{cat}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                      Current: {formatCurrency(spend)}/mo
                      {spend / (Object.values(catSpend).reduce((a, b) => a + b, 0)) > 0 &&
                        <span style={{ marginLeft: '8px', color: 'var(--text-muted)' }}>
                          ({Math.round(spend / totalLeaks * 100)}% of leaks)
                        </span>}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, color: pct > 0 ? '#10b981' : 'var(--text-muted)' }}>
                      {pct}%
                    </div>
                    {saved > 0 && <div style={{ fontSize: '12px', color: '#10b981' }}>+{formatCurrency(saved)}/mo</div>}
                  </div>
                </div>

                {/* Track */}
                <div style={{ position: 'relative', marginBottom: '8px' }}>
                  <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
                    <motion.div animate={{ width: `${pct}%` }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${color}, #10b981)`, borderRadius: '3px' }} />
                  </div>
                  <input type="range" min={0} max={100} step={5} value={pct}
                    onChange={e => setReductions(r => ({ ...r, [cat]: Number(e.target.value) }))}
                    style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>No change</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Cut 100%</span>
                </div>

                {pct > 0 && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} style={{ marginTop: '12px', padding: '10px 14px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '10px', fontSize: '13px', color: '#10b981' }}>
                    💡 Saving {formatCurrency(saved)}/mo = {formatCurrency(saved * 12)}/yr
                  </motion.div>
                )}
              </motion.div>
            )
          })}
        </div>

        {/* RIGHT — Impact Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Impact cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              { label: 'Monthly Savings', value: formatCurrency(totalMonthlySaved), color: '#10b981', icon: '📈' },
              { label: 'Yearly Impact', value: formatCurrency(totalYearlySaved), color: '#6366f1', icon: '🎯' },
              { label: '5-Year Wealth', value: formatCurrency(fiveYearWealth), color: '#0ea5e9', icon: '🚀' },
              { label: 'New Savings Rate', value: `${newSavingsRate}%`, color: newSavingsRate >= 20 ? '#10b981' : '#f59e0b', icon: '💰' },
            ].map(({ label, value, color, icon }) => (
              <motion.div key={label} layout className="card" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
                <motion.div animate={{ color }} style={{ fontSize: '22px', fontWeight: 800, marginBottom: '4px', transition: 'color 0.5s' }}>{value}</motion.div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{label}</div>
              </motion.div>
            ))}
          </div>

          {/* Before / After Chart */}
          <div className="card" style={{ padding: '24px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '20px' }}>Before vs After</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData} barGap={4}>
                <XAxis dataKey="name" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={11} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
                <Bar dataKey="before" name="Before" radius={[4, 4, 0, 0]} fill="rgba(244,63,94,0.6)" />
                <Bar dataKey="after" name="After" radius={[4, 4, 0, 0]} fill="rgba(16,185,129,0.7)" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Tip */}
          <div className="card" style={{ padding: '20px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <Zap size={18} color="#a5b4fc" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>Behavioral Tip</div>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                  {totalMonthlySaved > 5000
                    ? `You're identifying ₹${(totalMonthlySaved / 1000).toFixed(1)}k in monthly leaks. Even cutting 50% of these targets adds up to ${formatCurrency(totalMonthlySaved * 0.5 * 12)} a year.`
                    : 'Start with your biggest leak category. A 25% reduction is more sustainable than 100% — and more likely to stick.'}
                </p>
              </div>
            </div>
          </div>

          {/* Lock In */}
          <button onClick={() => setLocked(!locked)} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '16px', borderRadius: '14px', border: 'none', cursor: 'pointer', fontSize: '15px', fontWeight: 700,
            background: locked ? 'rgba(16,185,129,0.15)' : 'linear-gradient(135deg, #6366f1, #10b981)',
            color: locked ? '#10b981' : 'white', transition: 'all 0.3s',
          }}>
            <Lock size={18} />
            {locked ? '✅ Targets Locked In!' : 'Lock In Savings Targets'}
          </button>

          {locked && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ padding: '16px 20px', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '14px', fontSize: '14px', color: '#10b981', lineHeight: 1.6 }}>
              🎯 Your targets are set! Aurora will track your progress against these goals each month.
            </motion.div>
          )}
        </div>
      </div>

      {/* Educational panel */}
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        className="card" style={{ padding: '28px', marginTop: '24px', background: 'rgba(14,165,233,0.04)', border: '1px solid rgba(14,165,233,0.15)' }}>
        <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} color="#0ea5e9" /> The Science of Micro-Leaks
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {[
            { title: 'Latte Factor', desc: 'Daily small purchases (₹60 chai, ₹150 snacks) compound to ₹70,000+ per year.' },
            { title: 'Subscription Creep', desc: 'The average Indian has 4-6 active subscriptions, with 2 barely used.' },
            { title: 'UPI Impulse', desc: 'Frictionless UPI payments increase impulse spending by 23% vs cash.' },
            { title: '1% Better', desc: 'Cutting each leak category by just 1%/month compounds into massive savings over 5 years.' },
          ].map(({ title, desc }) => (
            <div key={title} style={{ padding: '16px', background: 'rgba(14,165,233,0.06)', borderRadius: '12px', border: '1px solid rgba(14,165,233,0.1)' }}>
              <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px', color: '#7dd3fc' }}>{title}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}