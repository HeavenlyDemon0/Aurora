import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, LineChart, Line, Legend } from 'recharts'
import { TrendingUp, TrendingDown, Sparkles, LogOut, Upload, Mic, Sliders, Trophy, ArrowUpRight, Wallet, Target, Activity, CreditCard, PlusCircle, ChevronRight, Zap } from 'lucide-react'
import { useAuthStore, useFinanceStore, DEMO_TRANSACTIONS } from '@/lib/store'
import { formatCurrency, CATEGORY_COLORS, CATEGORY_EMOJI } from '@/lib/utils'

const trendData = [
  { month: 'Jan', savings: 8200, leaks: 12400 },
  { month: 'Feb', savings: 9100, leaks: 11200 },
  { month: 'Mar', savings: 7800, leaks: 13600 },
  { month: 'Apr', savings: 11200, leaks: 9800 },
  { month: 'May', savings: 12400, leaks: 8600 },
  { month: 'Jun', savings: 13100, leaks: 7900 },
]

function EmptyState() {
  const navigate = useNavigate()
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', padding: '80px 24px', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ fontSize: '64px', marginBottom: '24px' }}>📊</div>
      <h2 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '12px' }}>No data yet</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '32px' }}>
        Add your first transaction or upload a bank statement to see your financial picture come to life.
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/add')}>
          <PlusCircle size={16} /> Add Transaction
        </button>
        <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => { useFinanceStore.getState().enableDemo() }}>
          <Sparkles size={16} /> Load Demo Data
        </button>
      </div>
    </motion.div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] } })
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()
  const { transactions, monthlyIncome, isDemoMode } = useFinanceStore()
  const [showMenu, setShowMenu] = useState(false)

  const debits = transactions.filter(t => t.type === 'debit')
  const totalExpenses = debits.reduce((s, t) => s + t.amount, 0)
  const savings = monthlyIncome - totalExpenses
  const savingsRate = monthlyIncome > 0 ? Math.round((savings / monthlyIncome) * 100) : 0
  const healthScore = Math.min(100, Math.max(0, Math.round(savingsRate * 2.2 + 30)))
  const healthColor = healthScore >= 70 ? '#10b981' : healthScore >= 40 ? '#f59e0b' : '#f43f5e'
  const hasData = transactions.length > 0

  const catMap = useMemo(() => {
    const map: Record<string, number> = {}
    debits.forEach(t => { map[t.category] = (map[t.category] || 0) + t.amount })
    return map
  }, [debits])

  const pieData = Object.entries(catMap).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value)

  const recent = transactions.slice(0, 6)

  const kpis = [
    { label: 'Monthly Income', value: formatCurrency(monthlyIncome || 0), icon: <Wallet size={16} />, color: '#10b981', sub: 'Salary + other', up: true },
    { label: 'Total Expenses', value: formatCurrency(totalExpenses), icon: <CreditCard size={16} />, color: '#f43f5e', sub: `${debits.length} transactions`, up: false },
    { label: 'Net Savings', value: formatCurrency(savings > 0 ? savings : 0), icon: <Target size={16} />, color: '#6366f1', sub: `${savingsRate}% savings rate`, up: savingsRate > 20 },
    { label: 'Health Score', value: `${healthScore}/100`, icon: <Activity size={16} />, color: healthColor, sub: healthScore >= 70 ? '🎉 Excellent' : healthScore >= 40 ? '👍 Good' : '⚠️ Needs work', up: healthScore >= 50 },
  ]

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* TOP NAV */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 40, padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,11,20,0.92)', backdropFilter: 'blur(20px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <h2 style={{ fontWeight: 700, fontSize: '18px' }}>Dashboard</h2>
          {isDemoMode && (
            <span style={{ fontSize: '11px', background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>
              Demo Mode
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid var(--border)', borderRadius: '10px', padding: '7px 14px', color: 'var(--text-secondary)', fontSize: '13px', cursor: 'pointer' }}>
            <option>June 2026</option><option>May 2026</option><option>April 2026</option>
          </select>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowMenu(!showMenu)} className="aurora-animated" style={{ width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '14px', color: 'white' }}>
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </button>
            {showMenu && (
              <motion.div initial={{ opacity: 0, y: 8, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
                style={{ position: 'absolute', right: 0, top: '48px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '8px', minWidth: '200px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', zIndex: 100 }}>
                <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border)', marginBottom: '6px' }}>
                  <div style={{ fontWeight: 600, fontSize: '14px' }}>{user?.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user?.email}</div>
                </div>
                {[
                  { label: 'Profile & Settings', path: '/profile' },
                  { label: 'Reports', path: '/reports' },
                ].map(({ label, path }) => (
                  <button key={path} onClick={() => { navigate(path); setShowMenu(false) }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', fontSize: '14px', borderRadius: '8px', transition: 'background 0.2s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.05)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
                    {label}
                  </button>
                ))}
                <button onClick={() => { logout(); navigate('/') }} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer', color: '#f43f5e', fontSize: '14px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <LogOut size={14} /> Sign Out
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
        {!hasData ? <EmptyState /> : (
          <>
            {/* Greeting */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: '28px' }}>
              <h1 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 800, marginBottom: '4px', letterSpacing: '-0.5px' }}>
                Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
              </h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Here's your financial snapshot for June 2026.</p>
            </motion.div>

            {/* KPI CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
              {kpis.map(({ label, value, icon, color, sub, up }, i) => (
                <motion.div key={label} variants={cardVariants} custom={i} initial="hidden" animate="show"
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '16px', padding: '22px', cursor: 'default', transition: 'box-shadow 0.3s' }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 40px ${color}18`}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                    <div style={{ width: 34, height: 34, borderRadius: '10px', background: `${color}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</div>
                  </div>
                  <div style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px', letterSpacing: '-0.5px' }}>{value}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: up ? '#10b981' : '#f43f5e' }}>
                    {up ? <TrendingUp size={12} /> : <TrendingDown size={12} />} {sub}
                  </div>
                  {/* Subtle bottom bar */}
                  <div style={{ marginTop: '14px', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '1px', overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                      style={{ height: '100%', background: `linear-gradient(90deg, ${color}, transparent)`, borderRadius: '1px' }} />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CHARTS ROW */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              {/* PIE — clickable to categories */}
              <motion.div variants={cardVariants} custom={4} initial="hidden" animate="show"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '15px' }}>Spending by Category</h3>
                  <button onClick={() => navigate('/categories')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    View All <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{ cursor: 'pointer' }} onClick={() => navigate('/categories')}>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={85} paddingAngle={3} dataKey="value">
                        {pieData.map(e => <Cell key={e.name} fill={CATEGORY_COLORS[e.name] || '#64748b'} />)}
                      </Pie>
                      <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff', fontSize: '13px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                  {pieData.slice(0, 5).map(({ name, value }) => (
                    <button key={name} onClick={() => navigate('/categories')} style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '12px', color: 'var(--text-secondary)', background: 'rgba(255,255,255,0.04)', border: 'none', borderRadius: '6px', padding: '4px 8px', cursor: 'pointer' }}>
                      <span style={{ width: 7, height: 7, borderRadius: '50%', background: CATEGORY_COLORS[name] || '#64748b', display: 'inline-block', flexShrink: 0 }} />
                      {name.split(' ')[0]} · {formatCurrency(value)}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* TREND LINE */}
              <motion.div variants={cardVariants} custom={5} initial="hidden" animate="show"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '15px' }}>6-Month Behavioral Trend</h3>
                  <button onClick={() => navigate('/insights')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    AI Insights <ChevronRight size={14} />
                  </button>
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                    <XAxis dataKey="month" stroke="#475569" fontSize={11} />
                    <YAxis stroke="#475569" fontSize={10} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
                    <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff', fontSize: '13px' }} />
                    <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: '12px' }} />
                    <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Savings" />
                    <Line type="monotone" dataKey="leaks" stroke="#f43f5e" strokeWidth={2.5} dot={{ fill: '#f43f5e', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} name="Leaks" />
                  </LineChart>
                </ResponsiveContainer>
              </motion.div>
            </div>

            {/* AI INSIGHTS + RECENT TX */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '20px' }}>
              {/* AI Insights widget */}
              <motion.div variants={cardVariants} custom={6} initial="hidden" animate="show"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: 32, height: 32, borderRadius: '10px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Sparkles size={15} color="#a5b4fc" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: '15px' }}>AI Insights</span>
                  </div>
                  <button onClick={() => navigate('/insights')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    Full Report <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    { icon: '🍔', text: 'Cut Food & Dining 25% → save ₹1,850/mo', bg: 'rgba(244,63,94,0.08)', border: 'rgba(244,63,94,0.18)', path: '/simulator' },
                    { icon: '📱', text: '2 overlapping subscriptions detected → ₹649', bg: 'rgba(139,92,246,0.08)', border: 'rgba(139,92,246,0.18)', path: '/simulator' },
                    { icon: '🎯', text: 'Savings goal on track — 4.2 months!', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.18)', path: '/insights' },
                  ].map(({ icon, text, bg, border, path }) => (
                    <button key={text} onClick={() => navigate(path)} style={{ background: bg, border: `1px solid ${border}`, borderRadius: '12px', padding: '12px 14px', display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(4px)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'translateX(0)'}>
                      <span style={{ fontSize: '18px' }}>{icon}</span>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.4, flex: 1 }}>{text}</span>
                      <ArrowUpRight size={14} color="#a5b4fc" />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Recent Transactions */}
              <motion.div variants={cardVariants} custom={7} initial="hidden" animate="show"
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <span style={{ fontWeight: 700, fontSize: '15px' }}>Recent Transactions</span>
                  <button onClick={() => navigate('/transactions')} style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
                    See All <ChevronRight size={14} />
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  {recent.map(t => (
                    <button key={t.id} onClick={() => navigate('/transactions')} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 8px', borderRadius: '10px', background: 'none', border: 'none', cursor: 'pointer', width: '100%', transition: 'background 0.2s' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'none'}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: 34, height: 34, borderRadius: '10px', background: `${CATEGORY_COLORS[t.category] || '#64748b'}18`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>
                          {CATEGORY_EMOJI[t.category] || '💳'}
                        </div>
                        <div style={{ textAlign: 'left' }}>
                          <div style={{ fontSize: '13px', fontWeight: 500 }}>{t.description.length > 22 ? t.description.slice(0, 22) + '…' : t.description}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.category}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '13px', fontWeight: 700, color: t.type === 'credit' ? '#10b981' : 'var(--text-primary)' }}>
                          {t.type === 'credit' ? '+' : '-'}{formatCurrency(t.amount)}
                        </div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{t.date.slice(5)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* QUICK ACTIONS */}
            <motion.div variants={cardVariants} custom={8} initial="hidden" animate="show"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px', padding: '24px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '18px' }}>Quick Actions</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px' }}>
                {[
                  { icon: <Upload size={20} />, label: 'Upload Statement', color: '#6366f1', bg: 'rgba(99,102,241,0.1)', path: '/add' },
                  { icon: <Mic size={20} />, label: 'Voice Input', color: '#0ea5e9', bg: 'rgba(14,165,233,0.1)', path: '/add' },
                  { icon: <Sliders size={20} />, label: 'Simulator', color: '#10b981', bg: 'rgba(16,185,129,0.1)', path: '/simulator' },
                  { icon: <Trophy size={20} />, label: 'Challenges', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', path: '/insights' },
                  { icon: <Zap size={20} />, label: 'AI Insights', color: '#a78bfa', bg: 'rgba(167,139,250,0.1)', path: '/insights' },
                  { icon: <PlusCircle size={20} />, label: 'Add Manual', color: '#ec4899', bg: 'rgba(236,72,153,0.1)', path: '/add' },
                ].map(({ icon, label, color, bg, path }) => (
                  <motion.button key={label} whileHover={{ y: -4, scale: 1.02 }} whileTap={{ scale: 0.97 }} onClick={() => navigate(path)} style={{ background: bg, border: `1px solid ${color}25`, borderRadius: '14px', padding: '18px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', cursor: 'pointer', color, transition: 'box-shadow 0.3s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 24px ${color}25`}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = 'none'}>
                    {icon}
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center', lineHeight: 1.3 }}>{label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  )
}