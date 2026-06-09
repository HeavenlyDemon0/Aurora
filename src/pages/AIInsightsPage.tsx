import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Brain, Send, Sparkles, TrendingUp, AlertTriangle, Target } from 'lucide-react'
import { useFinanceStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

const forecastData = [
  { month: 'Jun', actual: 38500, forecast: 38500 },
  { month: 'Jul', actual: null, forecast: 36200 },
  { month: 'Aug', actual: null, forecast: 34100 },
  { month: 'Sep', actual: null, forecast: 32000 },
  { month: 'Oct', actual: null, forecast: 30400 },
  { month: 'Nov', actual: null, forecast: 35800 },
  { month: 'Dec', actual: null, forecast: 28900 },
]

const heatmapData = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => ({
  day,
  values: Array.from({ length: 4 }, () => Math.floor(Math.random() * 2500) + 200)
}))

const CHAT_RESPONSES: Record<string, string> = {
  default: "Based on your spending patterns, I can see opportunities to optimize. Your Food & Dining spend is 31% of total expenses — the national average for your income bracket is 22%. Reducing by 25% would save ₹1,850/month.",
  laptop: "To save for a ₹80,000 laptop: At your current savings rate of 20.4%, you'd need 6.1 months. If you use the Leakage Simulator to cut just Food & Dining by 30%, you get there in 4.2 months. Want me to set that as a goal?",
  save: "Your top 3 savings opportunities this month: 1) Food & Dining (-25%) → ₹1,850/mo, 2) Subscriptions (-50%) → ₹384/mo, 3) Impulse Shopping (-40%) → ₹720/mo. Total potential: ₹2,954/month.",
  invest: "With your current savings of ₹13,250/mo, here's a simple allocation: ₹5,000 in index mutual funds (Nifty 50), ₹3,000 in recurring deposit, ₹2,000 emergency fund top-up, ₹3,250 flexible. This builds wealth while keeping liquidity.",
}

export default function AIInsightsPage() {
  const { transactions, monthlyIncome } = useFinanceStore()
  const [chatInput, setChatInput] = useState('')
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'m your Aurora AI. Ask me anything about your finances — savings tips, spending analysis, goal planning.' }
  ])
  const [typing, setTyping] = useState(false)

  const totalExpenses = transactions.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0)
  const savingsRate = Math.round(((monthlyIncome - totalExpenses) / monthlyIncome) * 100)

  const sendMessage = async () => {
    if (!chatInput.trim()) return
    const userMsg = chatInput.trim()
    setMessages(m => [...m, { role: 'user', text: userMsg }])
    setChatInput('')
    setTyping(true)
    await new Promise(r => setTimeout(r, 1200))
    const lower = userMsg.toLowerCase()
    const response = lower.includes('laptop') || lower.includes('goal') ? CHAT_RESPONSES.laptop
      : lower.includes('save') || lower.includes('saving') ? CHAT_RESPONSES.save
      : lower.includes('invest') ? CHAT_RESPONSES.invest
      : CHAT_RESPONSES.default
    setMessages(m => [...m, { role: 'ai', text: response }])
    setTyping(false)
  }

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
        <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Brain size={20} color="#a5b4fc" />
        </div>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>AI Insights</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Predictive analysis and personalized recommendations</p>
        </div>
      </div>

      {/* Insight cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {[
          { icon: <TrendingUp size={18} color="#10b981" />, bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', title: 'Savings Trajectory', text: `At this rate, you'll save ${formatCurrency(monthlyIncome * (savingsRate / 100) * 12)} this year — 18% more than last year! 🎉` },
          { icon: <AlertTriangle size={18} color="#f59e0b" />, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', title: 'Anomaly Detected', text: 'Your Shopping spend spiked 340% on 06-Jun. One large purchase (₹1,799) drove this. Intentional?' },
          { icon: <Target size={18} color="#6366f1" />, bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', title: 'Goal Forecast', text: 'At current savings rate, your ₹15,000 monthly goal will be hit in the next 2 weeks. Consider increasing it!' },
          { icon: <Sparkles size={18} color="#0ea5e9" />, bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.2)', title: 'Pattern Insight', text: 'You spend 67% more on weekends vs weekdays. Saturday food orders average ₹480 vs ₹180 on weekdays.' },
        ].map(({ icon, bg, border, title, text }) => (
          <motion.div key={title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ padding: '20px', background: bg, border: `1px solid ${border}`, borderRadius: '14px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px', fontWeight: 700, fontSize: '14px' }}>
              {icon} {title}
            </div>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{text}</p>
          </motion.div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Forecast Chart */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Spending Forecast</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>AI-predicted expenses for next 6 months</p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={forecastData}>
              <defs>
                <linearGradient id="fg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={11} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
              <Area type="monotone" dataKey="forecast" stroke="#6366f1" strokeWidth={2} fill="url(#fg)" strokeDasharray="6 3" name="Forecast" />
              <Area type="monotone" dataKey="actual" stroke="#10b981" strokeWidth={2.5} fill="none" name="Actual" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Spending Heatmap */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '6px' }}>Weekly Spending Heatmap</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '20px' }}>Darker = higher spend</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {heatmapData.map(({ day, values }) => (
              <div key={day} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', width: '30px' }}>{day}</span>
                {values.map((v, i) => (
                  <div key={i} title={formatCurrency(v)} style={{
                    flex: 1, height: '28px', borderRadius: '6px', cursor: 'pointer',
                    background: `rgba(99,102,241,${Math.min(0.9, v / 2500)})`,
                    transition: 'transform 0.2s',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', color: v > 1500 ? 'rgba(255,255,255,0.8)' : 'transparent',
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}>
                    {v > 1500 ? `₹${(v / 1000).toFixed(1)}k` : ''}
                  </div>
                ))}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', marginTop: '8px', paddingLeft: '38px' }}>
              {['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'].map(w => (
                <div key={w} style={{ flex: 1, fontSize: '11px', color: 'var(--text-muted)', textAlign: 'center' }}>{w}</div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI Chat */}
      <div className="card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <div className="aurora-animated" style={{ width: 32, height: 32, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '16px' }}>Ask Aurora AI</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Try: "How can I save for a laptop?" or "How to invest my savings?"</p>
          </div>
        </div>

        <div style={{ minHeight: '200px', maxHeight: '300px', overflowY: 'auto', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', justifyContent: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '80%', padding: '12px 16px', borderRadius: m.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                background: m.role === 'user' ? 'linear-gradient(135deg, #6366f1, #0ea5e9)' : 'var(--bg-card)',
                border: m.role === 'ai' ? '1px solid var(--border)' : 'none',
                fontSize: '14px', lineHeight: 1.6, color: 'var(--text-primary)',
              }}>{m.text}</div>
            </motion.div>
          ))}
          {typing && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: '6px', padding: '14px 16px', background: 'var(--bg-card)', borderRadius: '16px 16px 16px 4px', width: 'fit-content', border: '1px solid var(--border)' }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.7, delay: i * 0.15 }}
                  style={{ width: 7, height: 7, borderRadius: '50%', background: '#6366f1' }} />
              ))}
            </motion.div>
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input className="input-aurora" value={chatInput} onChange={e => setChatInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Ask about your finances..." style={{ flex: 1 }} />
          <button onClick={sendMessage} className="btn-primary" style={{ padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
            <Send size={16} /> Send
          </button>
        </div>
      </div>
    </div>
  )
}