import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ChevronRight, ChevronLeft, Sparkles, Target, Users, Wallet, Check } from 'lucide-react'
import { useAuthStore, useFinanceStore } from '@/lib/store'

const steps = ['Welcome', 'Income & Goals', 'Profile', 'Import Data']

export default function OnboardingPage() {
  const navigate = useNavigate()
  const { user } = useAuthStore()
  const { setIncome, setSavingsGoal } = useFinanceStore()
  const [step, setStep] = useState(0)
  const [income, setIncomeVal] = useState('65000')
  const [goal, setGoalVal] = useState('15000')
  const [familySize, setFamilySize] = useState('1')
  const [status, setStatus] = useState('employed')

  const handleFinish = () => {
    setIncome(Number(income))
    setSavingsGoal(Number(goal))
    useFinanceStore.getState().enableDemo(); navigate('/dashboard')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '20%', left: '10%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <div style={{ width: '100%', maxWidth: '560px' }}>
        {/* Progress */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '40px' }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '12px', fontWeight: 700, flexShrink: 0,
                background: i < step ? '#10b981' : i === step ? 'linear-gradient(135deg,#6366f1,#0ea5e9)' : 'var(--bg-card)',
                color: i <= step ? 'white' : 'var(--text-muted)',
                border: i > step ? '1px solid var(--border)' : 'none',
              }}>
                {i < step ? <Check size={14} /> : i + 1}
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: '2px', background: i < step ? '#10b981' : 'var(--border)', borderRadius: '1px', transition: 'background 0.5s' }} />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.35 }}>

            {step === 0 && (
              <div style={{ textAlign: 'center' }}>
                <div className="aurora-animated" style={{ width: 64, height: 64, borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px' }}>
                  <Sparkles size={30} color="white" />
                </div>
                <h1 style={{ fontSize: '36px', fontWeight: 800, marginBottom: '16px', letterSpacing: '-1px' }}>
                  Welcome to Aurora, {user?.name?.split(' ')[0]}!
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '17px', lineHeight: 1.7, marginBottom: '36px' }}>
                  Let's set up your financial intelligence in 2 minutes. Everything stays private on your device.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '40px' }}>
                  {['🔒 No bank login required', '🇮🇳 Built for Indian spending patterns', '⚡ AI-powered insights from day one', '🎯 Personalized to your goals'].map(t => (
                    <div key={t} className="card" style={{ padding: '14px 20px', textAlign: 'left', fontSize: '15px', color: 'var(--text-secondary)' }}>{t}</div>
                  ))}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(16,185,129,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Wallet size={22} color="#10b981" />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Income & Savings Goal</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>This helps Aurora calibrate your financial health score.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Monthly Income (₹)</label>
                    <input className="input-aurora" type="number" value={income} onChange={e => setIncomeVal(e.target.value)} placeholder="65000" />
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Include salary, freelance, business income</p>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Monthly Savings Goal (₹)</label>
                    <input className="input-aurora" type="number" value={goal} onChange={e => setGoalVal(e.target.value)} placeholder="15000" />
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>
                      That's {income ? Math.round((Number(goal) / Number(income)) * 100) : 0}% of your income — {Number(goal) / Number(income) >= 0.2 ? '🎯 great target!' : '💡 aim for 20%+'}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Users size={22} color="#a5b4fc" />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>About You</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Helps Aurora understand your spending context.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>I am a...</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      {[
                        { v: 'employed', l: '💼 Salaried' },
                        { v: 'freelancer', l: '💻 Freelancer' },
                        { v: 'student', l: '🎓 Student' },
                        { v: 'business', l: '🏪 Business Owner' },
                      ].map(({ v, l }) => (
                        <button key={v} onClick={() => setStatus(v)} style={{
                          padding: '14px', borderRadius: '12px', border: `1px solid ${status === v ? 'rgba(99,102,241,0.6)' : 'var(--border)'}`,
                          background: status === v ? 'rgba(99,102,241,0.12)' : 'var(--bg-card)', cursor: 'pointer',
                          color: status === v ? '#a5b4fc' : 'var(--text-secondary)', fontSize: '14px', fontWeight: status === v ? 600 : 400,
                          transition: 'all 0.2s',
                        }}>{l}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '12px' }}>Dependents / Family Size</label>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {['1', '2', '3', '4', '5+'].map(n => (
                        <button key={n} onClick={() => setFamilySize(n)} style={{
                          flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${familySize === n ? 'rgba(99,102,241,0.6)' : 'var(--border)'}`,
                          background: familySize === n ? 'rgba(99,102,241,0.12)' : 'var(--bg-card)', cursor: 'pointer',
                          color: familySize === n ? '#a5b4fc' : 'var(--text-secondary)', fontSize: '14px', fontWeight: familySize === n ? 600 : 400,
                          transition: 'all 0.2s',
                        }}>{n}</button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: 'rgba(14,165,233,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  <Target size={22} color="#0ea5e9" />
                </div>
                <h2 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Import Your Data</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>Start with demo data or upload your own statements later.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    { icon: '🎭', title: 'Use Demo Data', desc: 'Explore Aurora with realistic Indian spending data — no upload needed', recommended: true },
                    { icon: '📄', title: 'Upload Bank Statement', desc: 'PDF or CSV — AI auto-categorizes everything', recommended: false },
                    { icon: '⏭️', title: 'Skip for Now', desc: 'Start fresh and add transactions manually', recommended: false },
                  ].map(({ icon, title, desc, recommended }) => (
                    <button key={title} onClick={handleFinish} style={{
                      padding: '20px', borderRadius: '14px', border: `1px solid ${recommended ? 'rgba(99,102,241,0.5)' : 'var(--border)'}`,
                      background: recommended ? 'rgba(99,102,241,0.08)' : 'var(--bg-card)', cursor: 'pointer',
                      textAlign: 'left', transition: 'all 0.2s', position: 'relative',
                    }}>
                      {recommended && <span style={{ position: 'absolute', top: 12, right: 12, fontSize: '11px', background: 'rgba(99,102,241,0.2)', color: '#a5b4fc', padding: '3px 10px', borderRadius: '100px', fontWeight: 600 }}>Recommended</span>}
                      <div style={{ fontSize: '24px', marginBottom: '8px' }}>{icon}</div>
                      <div style={{ fontWeight: 600, fontSize: '15px', marginBottom: '4px', color: 'var(--text-primary)' }}>{title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Nav buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '36px' }}>
          <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/')} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
            <ChevronLeft size={18} /> {step === 0 ? 'Back' : 'Previous'}
          </button>
          <div style={{ display: 'flex', gap: '8px' }}>
            {steps.map((_, i) => <div key={i} style={{ width: i === step ? 20 : 6, height: 6, borderRadius: '3px', background: i === step ? '#6366f1' : 'var(--border)', transition: 'all 0.3s' }} />)}
          </div>
          {step < 3 ? (
            <button onClick={() => setStep(s => s + 1)} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
              Next <ChevronRight size={18} />
            </button>
          ) : (
            <button onClick={handleFinish} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}>
              Go to Dashboard <ChevronRight size={18} />
            </button>
          )}
        </div>

        <button onClick={() => navigate('/dashboard')} style={{ display: 'block', margin: '16px auto 0', background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '13px', cursor: 'pointer' }}>
          Skip setup for now →
        </button>
      </div>
    </div>
  )
}