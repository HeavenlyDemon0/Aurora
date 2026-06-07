import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, Sparkles, Shield, ArrowRight, Mail } from 'lucide-react'
import { useAuthStore } from '@/lib/store'

export default function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [magicSent, setMagicSent] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!email) { setError('Please enter your email.'); return }
    if (!password) { setError('Please enter your password.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    login({ id: '1', name: email.split('@')[0], email })
    navigate('/dashboard')
  }

  const handleMagicLink = async () => {
    if (!email) { setError('Enter your email first.'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setMagicSent(true)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: 'var(--bg-primary)' }}>
      {/* Left panel */}
      <div style={{ flex: 1, display: 'none', flexDirection: 'column', justifyContent: 'center', padding: '60px', background: 'var(--bg-secondary)', borderRight: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}
        className="md-flex">
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'absolute', bottom: '20%', right: '5%', width: '250px', height: '250px', background: 'radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(40px)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '60px' }}>
            <div className="aurora-animated" style={{ width: 36, height: 36, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={18} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '22px' }}>Aurora</span>
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, lineHeight: 1.2, marginBottom: '20px', letterSpacing: '-1px' }}>
            Welcome back to your{' '}<span className="aurora-gradient-text">financial command center.</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '16px', lineHeight: 1.7, marginBottom: '40px' }}>
            Your data is encrypted and stays on your device. We never see your bank credentials.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['🔒 End-to-end encrypted', '🇮🇳 Built for Indian finances', '🚫 No bank login required', '⚡ AI-powered insights'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)', fontSize: '15px' }}>{t}</div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ width: '100%', maxWidth: '440px' }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '40px' }}>
            <div className="aurora-animated" style={{ width: 32, height: 32, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={16} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '20px' }}>Aurora</span>
          </div>

          <h1 style={{ fontSize: '30px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Sign in</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '36px', fontSize: '15px' }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: '#a5b4fc', textDecoration: 'none', fontWeight: 600 }}>Sign up free</Link>
          </p>

          {magicSent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="card" style={{ padding: '32px', textAlign: 'center' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>✉️</div>
              <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '8px' }}>Magic link sent!</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.6 }}>
                Check your inbox at <strong>{email}</strong>. Click the link to sign in instantly.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Email Address</label>
                <input className="input-aurora" type="email" placeholder="you@example.com"
                  value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                  <button type="button" style={{ fontSize: '13px', color: '#a5b4fc', background: 'none', border: 'none', cursor: 'pointer' }}>Forgot password?</button>
                </div>
                <div style={{ position: 'relative' }}>
                  <input className="input-aurora" type={showPass ? 'text' : 'password'} placeholder="••••••••"
                    value={password} onChange={e => setPassword(e.target.value)} style={{ paddingRight: '48px' }} />
                  <button type="button" onClick={() => setShowPass(!showPass)} style={{
                    position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)'
                  }}>
                    {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {error && (
                <div style={{ background: 'rgba(244,63,94,0.1)', border: '1px solid rgba(244,63,94,0.3)', borderRadius: '10px', padding: '12px 16px', fontSize: '14px', color: '#fb7185' }}>
                  {error}
                </div>
              )}

              <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '50px' }}>
                {loading ? (
                  <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.7s linear infinite' }} />
                ) : (
                  <><span>Sign In</span><ArrowRight size={18} /></>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>or</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>

              <button type="button" onClick={handleMagicLink} className="btn-ghost" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', height: '50px' }}>
                <Mail size={18} /> Send Magic Link
              </button>
            </form>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '32px', padding: '14px 18px', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '12px' }}>
            <Shield size={16} color="#a5b4fc" />
            <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Your data is encrypted. We never access your bank.</span>
          </div>

          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </motion.div>
      </div>
    </div>
  )
}