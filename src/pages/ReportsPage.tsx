import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Download, FileText, Share2, TrendingUp } from 'lucide-react'
import { useFinanceStore } from '@/lib/store'
import { formatCurrency, CATEGORY_COLORS } from '@/lib/utils'

const monthlyComparison = [
  { month: 'Feb', income: 65000, expenses: 52000, savings: 13000 },
  { month: 'Mar', income: 65000, expenses: 55200, savings: 9800 },
  { month: 'Apr', income: 65000, expenses: 48600, savings: 16400 },
  { month: 'May', income: 65000, expenses: 47800, savings: 17200 },
  { month: 'Jun', income: 65000, expenses: 51750, savings: 13250 },
]

export default function ReportsPage() {
  const { transactions, monthlyIncome } = useFinanceStore()

  const catMap: Record<string, number> = {}
  transactions.filter(t => t.type === 'debit').forEach(t => { catMap[t.category] = (catMap[t.category] || 0) + t.amount })
  const pieData = Object.entries(catMap).map(([name, value]) => ({ name, value }))
  const totalExpenses = Object.values(catMap).reduce((a, b) => a + b, 0)

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.5px' }}>Reports</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Financial summaries and exports</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '10px 18px' }}>
            <Share2 size={16} /> Share
          </button>
          <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', padding: '10px 18px' }}>
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Summary strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {[
          { label: 'Total Income', value: formatCurrency(monthlyIncome), color: '#10b981' },
          { label: 'Total Expenses', value: formatCurrency(totalExpenses), color: '#f43f5e' },
          { label: 'Net Savings', value: formatCurrency(monthlyIncome - totalExpenses), color: '#6366f1' },
          { label: 'Savings Rate', value: `${Math.round(((monthlyIncome - totalExpenses) / monthlyIncome) * 100)}%`, color: '#0ea5e9' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card" style={{ padding: '20px', textAlign: 'center' }}>
            <div style={{ fontSize: '22px', fontWeight: 800, color, marginBottom: '6px' }}>{value}</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px', marginBottom: '24px' }}>
        {/* Monthly comparison */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={16} color="#10b981" /> 5-Month Overview
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={monthlyComparison} barGap={3}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" stroke="#475569" fontSize={12} />
              <YAxis stroke="#475569" fontSize={11} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
              <Bar dataKey="income" fill="rgba(16,185,129,0.5)" name="Income" radius={[4, 4, 0, 0]} />
              <Bar dataKey="expenses" fill="rgba(244,63,94,0.5)" name="Expenses" radius={[4, 4, 0, 0]} />
              <Bar dataKey="savings" fill="rgba(99,102,241,0.7)" name="Savings" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category breakdown */}
        <div className="card" style={{ padding: '28px' }}>
          <h3 style={{ fontWeight: 700, fontSize: '16px', marginBottom: '20px' }}>Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" outerRadius={70} dataKey="value">
                {pieData.map(e => <Cell key={e.name} fill={CATEGORY_COLORS[e.name] || '#64748b'} />)}
              </Pie>
              <Tooltip formatter={(v: number) => formatCurrency(v)} contentStyle={{ background: '#111827', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: '#f0f4ff' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px' }}>
            {pieData.slice(0, 5).map(({ name, value }) => (
              <div key={name} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: CATEGORY_COLORS[name] || '#64748b', display: 'inline-block' }} />
                  {name}
                </span>
                <span style={{ fontWeight: 600 }}>{Math.round(value / totalExpenses * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Export cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {[
          { icon: '📊', title: 'Monthly PDF Report', desc: 'Full summary with charts and AI insights', action: 'Download PDF', color: '#f43f5e' },
          { icon: '📋', title: 'CSV Export', desc: 'All transactions in spreadsheet format', action: 'Download CSV', color: '#10b981' },
          { icon: '📱', title: 'Shareable Card', desc: 'Beautiful savings card for social sharing', action: 'Create Card', color: '#6366f1' },
        ].map(({ icon, title, desc, action, color }) => (
          <motion.div key={title} whileHover={{ y: -3 }} className="card card-hover" style={{ padding: '24px' }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>{icon}</div>
            <h3 style={{ fontWeight: 700, fontSize: '15px', marginBottom: '6px' }}>{title}</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: 1.5 }}>{desc}</p>
            <button style={{ background: `${color}15`, border: `1px solid ${color}30`, borderRadius: '10px', padding: '10px 18px', color, fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileText size={14} /> {action}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}