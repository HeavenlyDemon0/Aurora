import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { User, Target, Shield, Bell, Moon, LogOut, ChevronRight, Wallet, Trash2, Download } from 'lucide-react'
import { useAuthStore, useFinanceStore } from '@/lib/store'
import { formatCurrency } from '@/lib/utils'

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const { monthlyIncome, savingsGoal, setIncome, setSavingsGoal } = useFinanceStore()
  const navigate = useNavigate()
  const [darkMode] = useState(true)
  const [notifications, setNotifications] = useState(true)
  const [editIncome, setEditIncome] = useState(false)
  const [editGoal, setEditGoal] = useState(false)
  const [incomeVal, setIncomeVal] = useState(String(monthlyIncome))
  const [goalVal, setGoalVal] = useState(String(savingsGoal))

  const handleLogout = () => { logout(); navigate('/') }

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div style={{ marginBottom: '24px' }}>
      <h3 style={{ fontSize: '12px', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '4px' }}>{title}</h3>
      <div className="card" style={{ overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  )

  const Row = ({ icon, label, value, onClick, danger = false, children }: any) => (
    <div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: onClick ? 'pointer' : 'default', transition: 'background 0.2s' }}
      onMouseEnter={e => onClick && ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.03)')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.background = 'transparent')}>
      <div style={{ width: 36, height: 36, borderRadius: '10px', background: danger ? 'rgba(244,63,94,0.1)' : 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: danger ? '#f43f5e' : 'var(--text-secondary)', flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '14px', fontWeight: 500, color: danger ? '#f43f5e' : 'var(--text-primary)' }}>{label}</div>
        {value && <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{value}</div>}
      </div>
      {children || (onClick && <ChevronRight size={16} color="var(--text-muted)" />)}
    </div>
  )

  return (
    <div style={{ padding: '32px 24px', maxWidth: '640px', margin: '0 auto' }}>
      {/* Avatar */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '36px' }}>
        <div className="aurora-animated" style={{ width: 72, height: 72, borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: 'white', flexShrink: 0 }}>
          {user?.name?.[0]?.toUpperCase()}
        </div>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 800 }}>{user?.name}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>{user?.email}</p>
          <span style={{ fontSize: '12px', background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', padding: '4px 12px', borderRadius: '100px', fontWeight: 600, marginTop: '6px', display: 'inline-block' }}>Free Plan</span>
        </div>
      </motion.div>

      <Section title="Financial Profile">
        <Row icon={<Wallet size={16} />} label="Monthly Income" value={editIncome ? undefined : formatCurrency(monthlyIncome)} onClick={() => setEditIncome(!editIncome)}>
          {editIncome ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input className="input-aurora" type="number" value={incomeVal} onChange={e => setIncomeVal(e.target.value)} style={{ width: '120px', padding: '8px 12px', fontSize: '14px' }} />
              <button onClick={() => { setIncome(Number(incomeVal)); setEditIncome(false) }} style={{ background: '#10b981', border: 'none', borderRadius: '8px', padding: '8px 14px', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save</button>
            </div>
          ) : <ChevronRight size={16} color="var(--text-muted)" />}
        </Row>
        <Row icon={<Target size={16} />} label="Monthly Savings Goal" value={editGoal ? undefined : formatCurrency(savingsGoal)} onClick={() => setEditGoal(!editGoal)}>
          {editGoal ? (
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <input className="input-aurora" type="number" value={goalVal} onChange={e => setGoalVal(e.target.value)} style={{ width: '120px', padding: '8px 12px', fontSize: '14px' }} />
              <button onClick={() => { setSavingsGoal(Number(goalVal)); setEditGoal(false) }} style={{ background: '#10b981', border: 'none', borderRadius: '8px', padding: '8px 14px', color: 'white', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}>Save</button>
            </div>
          ) : <ChevronRight size={16} color="var(--text-muted)" />}
        </Row>
      </Section>

      <Section title="Preferences">
        <Row icon={<Bell size={16} />} label="Notifications" value={notifications ? 'On' : 'Off'}>
          <button onClick={() => setNotifications(!notifications)} style={{
            width: 44, height: 24, borderRadius: '12px', border: 'none', cursor: 'pointer', position: 'relative',
            background: notifications ? 'linear-gradient(135deg, #6366f1, #0ea5e9)' : 'rgba(255,255,255,0.1)', transition: 'background 0.3s',
          }}>
            <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: '3px', transition: 'left 0.3s', left: notifications ? '23px' : '3px' }} />
          </button>
        </Row>
        <Row icon={<Moon size={16} />} label="Dark Mode" value={darkMode ? 'Always on' : 'Off'} />
      </Section>

      <Section title="Data & Privacy">
        <Row icon={<Shield size={16} />} label="Privacy & Security" value="Your data stays on device" onClick={() => {}} />
        <Row icon={<Download size={16} />} label="Export All Data" value="Download your complete financial history" onClick={() => {}} />
        <Row icon={<Trash2 size={16} />} label="Delete All Data" value="Permanently erase everything" danger onClick={() => {}} />
      </Section>

      <Section title="Account">
        <Row icon={<User size={16} />} label="Edit Profile" onClick={() => {}} />
        <Row icon={<LogOut size={16} />} label="Sign Out" danger onClick={handleLogout} />
      </Section>

      <p style={{ textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)', marginTop: '16px' }}>
        Aurora v1.0 · Privacy-first · Made for India 🇮🇳
      </p>
    </div>
  )
}