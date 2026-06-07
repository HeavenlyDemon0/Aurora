import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Legend
} from 'recharts'
import {
  TrendingUp, TrendingDown, Sparkles, LogOut,
  Upload, Mic, Sliders, Trophy, ArrowUpRight,
  Wallet, Target, Activity, CreditCard
} from 'lucide-react'
import { useAuthStore, useFinanceStore, demoTransactions } from '@/lib/store'
import { formatCurrency, CATEGORY_COLORS } from '@/lib/utils'

const monthlyTrend = [
  { month: 'Jan', savings: 8200, leaks: 12400 },
  { month: 'Feb', savings: 9100, leaks: 11200 },
  { month: 'Mar', savings: 7800, leaks: 13600 },
  { month: 'Apr', savings: 11200, leaks: 9800 },
  { month: 'May', savings: 12400, leaks: 8600 },
  { month: 'Jun', savings: 13100, leaks: 7900 },
]

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { transactions, monthlyIncome } = useFinanceStore()
  const [showUserMenu, setShowUserMenu] = useState(false)

  const debits = transactions.filter(t => t.type === 'debit')
  const totalExpenses = debits.reduce((s, t) => s + t.amount, 0)
  const savings = monthlyIncome - totalExpenses
  const savingsRate = Math.round((savings / monthlyIncome) * 100)
  const healthScore = Math.min(100, Math.max(0, Math.round(savingsRate * 2.2 + 30)))

  // Category breakdown
  const catMap: Record<string, number> = {}
  debits.forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount })
  const pieData = Object.entries(catMap).map(([name, value]) => ({ name, value }))

  const healthColor = healthScore >= 70 ? '#10b981' : healthScore >= 40 ? '#f59e0b' : '#f43f5e'

  const handleLogout = () => { logout(); navigate('/') }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* TOP NAV */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 40, padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(7,11,20,0.9)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid var(--border)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="aurora-animated" style={{ width: 30, height: 30, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={15} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>Aurora</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '10px', padding: '8px 14px', color: 'var(--text-primary)', fontSize: '14px', cursor: 'pointer' }}>
            <option>June 2026</option>
            <option>May 2026</option>
            <option>April 2026</option>
          </select>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowUserMenu(!showUserMenu)} style={{
              width: 38, height: 38, borderRadius: '50%', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: '15px', color: 'white'
            }} className="aurora-animated">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </button>
            {showUserMenu && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ position: 'absolute', right: 0, top: '48px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '14px', padding: '8px', minWidth: '180px', boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}>
                <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user?.email}</div>
                </div>
                <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', fontSize: '14px', borderRadius: '8px' }}>
                  <LogOut size={16} /> Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {/* GREETING */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '26px', fontWeight: 800, marginBottom: '4px' }}>
            Good morning, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>Here's your financial overview for June 2026.</p>
        </motion.div>

        {/* KPI CARDS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {[
            { label: 'Monthly Income', value: formatCurrency(monthlyIncome), icon: <Wallet size={18} />, color: '#10b981', sub: 'Salary credited', up: true },
            { label: 'Total Expenses', value: formatCurrency(totalExpenses), icon: <CreditCard size={18} />, color: '#f43f5e', sub: `${debits.length} transactions`, up: false },
            { label: 'Savings', value: formatCurrency(savings), icon: <Target size={18} />, color: '#6366f1', sub: `${savingsRate}% savings rate`, up: true },
            { label: 'Health Score', value: `${healthScore}/100`, icon: <Activity size={18} />, color: healthColor, sub: healthScore >= 70 ? 'Excellent 🎉' : healthScore >= 40 ? 'Good 👍' : 'Needs work', up: healthScore >= 60 },
          ].map(({ label, value, icon, color, sub, up }) => (
            <div key={label} className="card card-hover" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
                  {icon}
                </div>
              </div>
              <div style={{ fontSize: '26px', fontWeight: 800, marginBottom: '6px', letterSpacing: '-0.5px' }}>{value}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: up ? '#10b981' : '#f43f5e' }}>
                {up ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
                {sub}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CHARTS ROW */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '32px' }}>

          {/* PIE */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '24px' }}>Spending by Category</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                  {pieData.map((entry) => (
                    <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#64748b'} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
              {pieData.slice(0, 5).map(({ name }) => (
                <span key={name} style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[name] || '#64748b', display: 'inline-block' }} />
                  {name}
                </span>
              ))}
            </div>
          </motion.div>

          {/* LINE CHART */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '24px' }}>6-Month Behavioral Trend</h3>
            <ResponsiveContainer width="100%" height={240}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="month" stroke="#475569" fontSize={12} />
                <YAxis stroke="#475569" fontSize={12} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
                <Legend />
                <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4 }} name="Savings & Essentials" />
                <Line type="monotone" dataKey="leaks" stroke="#f43f5e" strokeWidth={2.5} dot={{ fill: '#f43f5e', r: 4 }} name="Junk / Leaks" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>
        </div>

        {/* AI INSIGHTS + RECENT TX */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>

          {/* AI Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="card" style={{ padding: '28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
              <div style={{ width: 32, height: 32, borderRadius: '10px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sparkles size={16} color="#a5b4fc" />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '16px' }}>AI Insights</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🍔', text: 'Cut Food & Dining by 25% to save ₹1,850/mo', color: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.2)' },
                { icon: '📱', text: 'You have 2 overlapping subscriptions — save ₹649', color: 'rgba(139,92,246,0.1)', border: 'rgba(139,92,246,0.2)' },
                { icon: '🎯', text: 'At this rate, savings goal hit in 4.2 months!', color: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)' },
              ].map(({ icon, text, color, border }) => (
                <div key={text} style={{ background: color, border: `1px solid ${border}`, borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '20px' }}>{icon}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{text}</span>
                  <ArrowUpRight size={16} color="#a5b4fc" style={{ marginLeft: 'auto', flexShrink: 0, marginTop: '2px' }} />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Transactions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="card" style={{ padding: '28px' }}>
            <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Recent Transactions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              {demoTransactions.slice(0, 7).map(t => (
                <div key={t.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 10px', borderRadius: '10px', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.03)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${CATEGORY_COLORS[t.category] || '#64748b'}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                      {t.category === 'Food & Dining' ? '🍔' : t.category === 'Transport' ? '🚗' : t.category === 'Subscriptions' ? '📱' : t.category === 'Snacks' ? '☕' : t.category === 'Utilities' ? '⚡' : t.category === 'Groceries' ? '🛒' : t.category === 'Income' ? '💰' : '🛍️'}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500 }}>{t.description}</div>
                      <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{t.category}</div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: t.type === 'credit' ? '#10b981' : 'var(--text-primary)' }}>
                      {t.type === 'credit' ? '+' : '-'}{formatCurrency(t.amount)}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.date.slice(5)}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* QUICK ACTIONS */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
          className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            {[
              { icon: <Upload size={20} />, label: 'Upload Statement', color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
              { icon: <Mic size={20} />, label: 'Voice Add', color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)' },
              { icon: <Sliders size={20} />, label: 'Open Simulator', color: '#10b981', bg: 'rgba(16,185,129,0.1)' },
              { icon: <Trophy size={20} />, label: 'Challenges', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
            ].map(({ icon, label, color, bg }) => (
              <button key={label} style={{
                background: bg, border: `1px solid ${color}30`, borderRadius: '14px', padding: '20px 16px',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
                cursor: 'pointer', transition: 'all 0.3s', color
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 10px 24px ${color}25` }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none' }}>
                {icon}
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center' }}>{label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}