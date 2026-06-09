import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, Shield, ArrowRight, CheckCircle2 } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

const checks = [
  { label: 'No bank login required', ok: true },
  { label: 'Data encrypted on device', ok: true },
  { label: 'Free forever plan', ok: true },
]

export default function SignupPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3
  const strengthColors = ['', '#f43f5e', '#f59e0b', '#10b981']
  const strengthLabels = ['', 'Weak', 'Good', 'Strong']

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name) { setError('Please enter your name.'); return }
    if (!email) { setError('Please enter your email.'); return }
    if (password.length < 8) { setError('Password must be at least 8 characters.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1400))
    login({ id: Date.now().toString(), name, email })
    navigate('/onboarding')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', padding: '24px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: '10%', left: '5%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '5%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none' }} />

      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: '480px', position: 'relative', zIndex: 1 }}>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '36px' }}>
          <div className="aurora-animated" style={{ width: 32, height: 32, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '20px' }}>Aurora</span>
        </div>

        <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Create your account</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '28px', fontSize: '15px' }}>
          Already have one?{' '}
          <Link to="/login" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </p>

        <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
          {checks.map(({ label, ok }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: ok ? '#10b981' : 'var(--text-muted)' }}>
              <CheckCircle2 size={14} /> {label}
            </div>
          ))}
        </div>

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Full Name</label>
            <input className="input-aurora" type="text" placeholder="Priya Sharma"
              value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Email Address</label>
            <input className="input-aurora" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input-aurora" type={showPass ? 'text' : 'password'} placeholder="At least 8 characters"
                value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: '48px' }} />
              <button type="button" onClick={() => setShowPass(!showPass)} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password.length > 0 && (
              <div style={{ marginTop: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                {[1, 2, 3].map(i => (
                  <div key={i} style={{ flex: 1, height: '3px', borderRadius: '2px', background: i <= strength ? strengthColors[strength] : 'var(--border)', transition: 'all 0.3s' }} />
                ))}
                <span style={{ fontSize: '12px', color: strengthColors[strength], fontWeight: 600, minWidth: '50px' }}>{strengthLabels[strength]}</span>
              </div>
            )}
          </div>

          {error && (
            <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', color: '#fb7185' }}>{error}</div>
          )}

          <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '50px' }}>
            {loading ? (
              <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
            ) : (
              <><span>Create Account – Free</span><ArrowRight size={18} /></>
            )}
          </button>

          <p style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.6 }}>
            By signing up you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '24px', padding: '14px 18px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '12px' }}>
          <Shield size={16} color="#a5b4fc" />
          <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Your data never leaves your device. No bank credentials ever.</span>
        </div>

        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </motion.div>
    </div>
  )
}