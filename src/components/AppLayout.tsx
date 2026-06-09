import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  LayoutDashboard, Sliders, PlusCircle, PieChart,
  Brain, List, FileText, User, Sparkles
} from 'lucide-react'

const navItems = [
  { path: '/dashboard', icon: <LayoutDashboard size={22} />, label: 'Home' },
  { path: '/transactions', icon: <List size={22} />, label: 'Transactions' },
  { path: '/simulator', icon: <Sliders size={22} />, label: 'Simulator' },
  { path: '/insights', icon: <Brain size={22} />, label: 'Insights' },
  { path: '/profile', icon: <User size={22} />, label: 'Profile' },
]

const sideItems = [
  { path: '/dashboard', icon: <LayoutDashboard size={18} />, label: 'Dashboard' },
  { path: '/simulator', icon: <Sliders size={18} />, label: 'Simulator' },
  { path: '/add', icon: <PlusCircle size={18} />, label: 'Add Transaction' },
  { path: '/categories', icon: <PieChart size={18} />, label: 'Categories' },
  { path: '/insights', icon: <Brain size={18} />, label: 'AI Insights' },
  { path: '/transactions', icon: <List size={18} />, label: 'Transactions' },
  { path: '/reports', icon: <FileText size={18} />, label: 'Reports' },
  { path: '/profile', icon: <User size={18} />, label: 'Profile' },
]

export default function AppLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* SIDEBAR — desktop */}
      <aside style={{
        width: '220px', flexShrink: 0, background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border)', padding: '24px 16px',
        display: 'flex', flexDirection: 'column', position: 'sticky', top: 0, height: '100vh',
      }} className="desktop-sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px', paddingLeft: '8px' }}>
          <div className="aurora-animated" style={{ width: 30, height: 30, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={15} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '18px' }}>Aurora</span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
          {sideItems.map(({ path, icon, label }) => {
            const active = location.pathname === path
            return (
              <button key={path} onClick={() => navigate(path)} style={{
                display: 'flex', alignItems: 'center', gap: '12px', padding: '11px 14px',
                borderRadius: '12px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: active ? 600 : 400,
                background: active ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: active ? '#a5b4fc' : 'var(--text-secondary)',
                transition: 'all 0.2s', textAlign: 'left', width: '100%',
              }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
                {icon}{label}
                {active && <div style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: '#6366f1' }} />}
              </button>
            )
          })}
        </nav>
        <button onClick={() => navigate('/add')} className="btn-primary" style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px' }}>
          <PlusCircle size={16} /> Add Transaction
        </button>
      </aside>

      {/* MAIN */}
      <main style={{ flex: 1, overflowX: 'hidden', paddingBottom: '80px' }}>
        <motion.div key={location.pathname} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}>
          <Outlet />
        </motion.div>
      </main>

      {/* BOTTOM NAV — mobile */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 50,
        background: 'rgba(13,20,36,0.95)', backdropFilter: 'blur(20px)',
        borderTop: '1px solid var(--border)', display: 'flex',
        padding: '8px 0 12px',
      }} className="mobile-nav">
        {navItems.map(({ path, icon, label }) => {
          const active = location.pathname === path
          return (
            <button key={path} onClick={() => navigate(path)} style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer', padding: '6px 0',
              color: active ? '#a5b4fc' : 'var(--text-muted)', transition: 'color 0.2s',
            }}>
              {icon}
              <span style={{ fontSize: '10px', fontWeight: active ? 600 : 400 }}>{label}</span>
              {active && <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#6366f1' }} />}
            </button>
          )
        })}
      </nav>

      <style>{`
        @media (min-width: 768px) { .mobile-nav { display: none !important; } }
        @media (max-width: 767px) { .desktop-sidebar { display: none !important; } }
      `}</style>
    </div>
  )
}