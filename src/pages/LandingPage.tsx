import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState, useRef } from 'react'
import { Shield, Zap, Brain, Sliders, Star, ArrowRight, Sparkles, TrendingUp, TrendingDown, PieChart as PieIcon, Lock } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] } })
}

function FloatingCard({ style, children }: any) {
  return (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ position: 'absolute', background: 'rgba(17,24,39,0.9)', backdropFilter: 'blur(20px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.5)', ...style }}>
      {children}
    </motion.div>
  )
}

function HeroDashboardMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '580px', margin: '0 auto' }}>
      {/* Main card */}
      <motion.div initial={{ opacity: 0, y: 40, rotateX: 15 }} animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{ background: 'rgba(13,20,36,0.95)', backdropFilter: 'blur(30px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '24px', padding: '28px', boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)', position: 'relative', zIndex: 2 }}>

        {/* Mini top bar */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="aurora-animated" style={{ width: 24, height: 24, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Sparkles size={12} color="white" />
            </div>
            <span style={{ fontWeight: 700, fontSize: '14px' }}>Aurora</span>
          </div>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(99,102,241,0.1)', padding: '4px 10px', borderRadius: '100px' }}>June 2026</span>
        </div>

        {/* KPI row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {[
            { l: 'Income', v: '₹65,000', c: '#10b981', t: '+2%' },
            { l: 'Expenses', v: '₹51,750', c: '#f43f5e', t: '+8%' },
            { l: 'Saved', v: '₹13,250', c: '#6366f1', t: '+18%' },
          ].map(({ l, v, c, t }) => (
            <div key={l} style={{ background: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '14px 12px' }}>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>{l}</div>
              <div style={{ fontSize: '16px', fontWeight: 800, color: c, marginBottom: '4px' }}>{v}</div>
              <div style={{ fontSize: '10px', color: c, display: 'flex', alignItems: 'center', gap: '3px' }}>
                <TrendingUp size={9} />{t}
              </div>
            </div>
          ))}
        </div>

        {/* Mini bar chart */}
        <div style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', padding: '16px', marginBottom: '16px' }}>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>6-Month Trend</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '48px' }}>
            {[65, 45, 80, 55, 90, 70].map((h, i) => (
              <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ flex: 1, background: i === 5 ? 'linear-gradient(180deg, #6366f1, #0ea5e9)' : 'rgba(99,102,241,0.3)', borderRadius: '4px 4px 0 0' }} />
            ))}
          </div>
        </div>

        {/* Health score */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: '12px', padding: '12px 16px' }}>
          <div>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Financial Health</div>
            <div style={{ fontSize: '20px', fontWeight: 800, color: '#10b981' }}>78/100</div>
          </div>
          <div style={{ fontSize: '24px' }}>🎯</div>
        </div>
      </motion.div>

      {/* Floating cards */}
      <FloatingCard style={{ top: '-30px', right: '-40px', minWidth: '160px', animationDelay: '0.5s', zIndex: 3 }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>🔴 Leak detected</div>
        <div style={{ fontSize: '14px', fontWeight: 700, color: '#f43f5e' }}>₹4,200/mo</div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Food & Snacks</div>
      </FloatingCard>

      <FloatingCard style={{ bottom: '-20px', left: '-30px', minWidth: '170px', zIndex: 3 }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>✨ AI Insight</div>
        <div style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.4 }}>Cut Swiggy by 30%<br /><span style={{ color: '#10b981' }}>Save ₹1,260/mo</span></div>
      </FloatingCard>

      <FloatingCard style={{ bottom: '60px', right: '-50px', minWidth: '140px', zIndex: 3 }}>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px' }}>🏆 Achievement</div>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#f59e0b' }}>5-day streak!</div>
        <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Keep it up</div>
      </FloatingCard>

      {/* Glow under card */}
      <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', width: '80%', height: '100px', background: 'radial-gradient(ellipse, rgba(99,102,241,0.3) 0%, transparent 70%)', filter: 'blur(20px)', pointerEvents: 'none', zIndex: 1 }} />
    </div>
  )
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [sliderVal, setSliderVal] = useState(40)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const savings = Math.round((sliderVal / 100) * 4200)

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh', overflowX: 'hidden' }}>

      {/* NAV */}
      <motion.nav initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, padding: '0 clamp(16px, 4vw, 48px)', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(7,11,20,0.8)', backdropFilter: 'blur(20px)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="aurora-animated" style={{ width: 32, height: 32, borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={16} color="white" />
          </div>
          <span style={{ fontWeight: 800, fontSize: '20px', letterSpacing: '-0.5px' }}>Aurora</span>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn-ghost" style={{ padding: '8px 20px', fontSize: '14px' }} onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }} onClick={() => navigate('/signup')}>Start Free</button>
        </div>
      </motion.nav>

      {/* HERO */}
      <section ref={heroRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: 'clamp(100px, 15vh, 140px) clamp(16px, 4vw, 48px) 80px', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient background */}
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.15) 0%, transparent 60%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: '30%', right: '5%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 70%)', borderRadius: '50%', filter: 'blur(60px)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center' }}>
          {/* Left text */}
          <motion.div style={{ y: heroY }}>
            <motion.div variants={fadeUp} custom={0} initial="hidden" animate="show">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '100px', padding: '6px 16px', fontSize: '13px', color: '#a5b4fc', marginBottom: '28px', fontWeight: 500 }}>
                <Sparkles size={12} /> AI-Powered · Privacy-First · Built for India
              </span>
            </motion.div>

            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="show"
              style={{ fontSize: 'clamp(38px, 6vw, 72px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-2.5px', marginBottom: '24px' }}>
              Illuminate<br />Your Finances.<br />
              <span className="aurora-gradient-text">Stop the Leaks.</span>
            </motion.h1>

            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="show"
              style={{ fontSize: 'clamp(15px, 1.8vw, 19px)', color: 'var(--text-secondary)', lineHeight: 1.75, marginBottom: '36px', maxWidth: '460px' }}>
              Aurora transforms your spending data into behavioral insights — with a simulator that shows exactly where your money escapes, and how to stop it.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show"
              style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' }}>
              <button className="btn-primary" style={{ fontSize: '16px', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => navigate('/signup')}>
                Start Free <ArrowRight size={18} />
              </button>
              <button className="btn-ghost" style={{ fontSize: '15px', padding: '14px 28px' }} onClick={() => navigate('/dashboard')}>
                View Live Demo
              </button>
            </motion.div>

            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="show"
              style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
              {['🔒 No bank login', '🇮🇳 India-first', '⚡ 2-min setup', '🆓 Free forever'].map(t => (
                <span key={t} style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t}</span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right mockup */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.4 }}
            style={{ position: 'relative', padding: '40px 50px 60px' }}>
            <HeroDashboardMockup />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 80px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1px', background: 'var(--border)', borderRadius: '20px', overflow: 'hidden' }}>
          {[
            { n: '₹8,400', l: 'Avg monthly leak detected' },
            { n: '23%', l: 'Savings rate improvement' },
            { n: '2.1L+', l: 'Indians using Aurora' },
            { n: '< 5 min', l: 'To your first insight' },
          ].map(({ n, l }) => (
            <div key={l} style={{ background: 'var(--bg-card)', padding: '36px 24px', textAlign: 'center' }}>
              <div className="aurora-gradient-text" style={{ fontSize: '34px', fontWeight: 900, marginBottom: '8px', letterSpacing: '-1px' }}>{n}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES GRID */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '60px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-1.5px', marginBottom: '16px' }}>
              Everything to <span className="aurora-gradient-text">master your money</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '480px', margin: '0 auto' }}>
              Built specifically for how India earns, spends, and saves in 2026.
            </p>
          </motion.div>

          {/* Big feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
            {[
              { icon: <Sliders size={24} color="#10b981" />, bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.2)', title: 'Leakage Simulator', desc: 'Drag sliders and watch your future wealth change in real time. The most powerful personal finance tool you\'ve ever used.', tag: 'Hero Feature ✦', highlight: true },
              { icon: <Brain size={24} color="#6366f1" />, bg: 'rgba(99,102,241,0.1)', border: 'rgba(99,102,241,0.2)', title: 'Behavioral AI Insights', desc: 'Pattern detection, anomaly alerts, predictive cash flow, and a conversational AI that knows your spending DNA.', tag: 'AI-Powered' },
              { icon: <Zap size={24} color="#0ea5e9" />, bg: 'rgba(14,165,233,0.1)', border: 'rgba(14,165,233,0.2)', title: 'Effortless Import', desc: 'PDF, CSV, voice, or photo. AI auto-categorizes with Indian context — chai, auto-rickshaw, UPI merchants, mess food.', tag: 'Multi-input' },
              { icon: <PieIcon size={24} color="#f59e0b" />, bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.2)', title: 'Adaptive Dashboard', desc: 'Beautiful charts that adapt to your patterns. Drill into any category, any month, any transaction with one click.', tag: 'Interactive' },
              { icon: <Shield size={24} color="#f43f5e" />, bg: 'rgba(244,63,94,0.1)', border: 'rgba(244,63,94,0.2)', title: '100% Privacy First', desc: 'Zero bank access. Zero credentials. Your data lives on your device. Full control, always.', tag: 'Local-first' },
              { icon: <TrendingUp size={24} color="#a78bfa" />, bg: 'rgba(167,139,250,0.1)', border: 'rgba(167,139,250,0.2)', title: 'Gamified Habits', desc: 'Streaks, badges, savings challenges. Celebrate every win. No guilt trips — just positive momentum.', tag: 'Gamification' },
            ].map(({ icon, bg, border, title, desc, tag, highlight }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{ padding: '28px', borderRadius: '20px', background: highlight ? 'linear-gradient(135deg, rgba(16,185,129,0.08), rgba(99,102,241,0.08))' : 'var(--bg-card)', border: `1px solid ${highlight ? 'rgba(16,185,129,0.3)' : border}`, cursor: 'pointer', position: 'relative', overflow: 'hidden' }}>
                {highlight && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, #10b981, #6366f1)' }} />}
                <div style={{ width: 48, height: 48, borderRadius: '14px', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>{icon}</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</p>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: '100px', fontWeight: 500 }}>{tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATOR TEASER */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 100px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ borderRadius: '28px', background: 'var(--bg-card)', border: '1px solid rgba(99,102,241,0.25)', padding: 'clamp(28px, 5vw, 56px)', overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', top: -80, right: -80, width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '12px', fontWeight: 700, color: '#10b981', textTransform: 'uppercase', letterSpacing: '1.5px', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '16px' }}>
                <Sliders size={14} /> Leakage Simulator — Try it free
              </span>
              <h2 style={{ fontSize: 'clamp(22px, 4vw, 40px)', fontWeight: 900, marginBottom: '8px', letterSpacing: '-1px' }}>
                Cut eating out by <span className="aurora-gradient-text">{sliderVal}%</span> — here's your future.
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>
                Drag the slider. Watch your projected savings update in real time.
              </p>

              <input type="range" min={0} max={100} value={sliderVal} onChange={e => setSliderVal(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1', height: '6px', cursor: 'pointer', marginBottom: '32px' }} />

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '32px' }}>
                {[
                  { label: 'Monthly Savings', value: `₹${savings.toLocaleString('en-IN')}`, color: '#10b981' },
                  { label: 'Yearly Impact', value: `₹${(savings * 12).toLocaleString('en-IN')}`, color: '#6366f1' },
                  { label: '5-Year (8% p.a.)', value: `₹${Math.round(savings * 12 * 6.34 / 1000)}K`, color: '#0ea5e9' },
                ].map(({ label, value, color }) => (
                  <div key={label} style={{ padding: '20px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', textAlign: 'center' }}>
                    <motion.div animate={{ color }} style={{ fontSize: '26px', fontWeight: 900, marginBottom: '6px', transition: 'color 0.3s' }}>{value}</motion.div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px' }} onClick={() => navigate('/signup')}>
                Unlock Full Simulator <ArrowRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 44px)', fontWeight: 900, marginBottom: '48px', letterSpacing: '-1px' }}>
            Real people. <span className="aurora-gradient-text">Real results.</span>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {[
              { name: 'Priya S.', role: 'Software Engineer, Bengaluru', text: 'I had no idea I was spending ₹6,200/month on food delivery. Aurora showed me in 2 minutes. Cut it in half first month.', stars: 5, avatar: 'P' },
              { name: 'Rahul M.', role: 'MBA Student, Mumbai', text: 'The leakage simulator is genuinely magical. I figured out how to afford my MacBook in 4 months just by moving sliders.', stars: 5, avatar: 'R' },
              { name: 'Ananya K.', role: 'Freelance Designer, Delhi', text: 'Finally an app that gets chai runs, auto rides, and festival shopping. The AI even predicted my Diwali overspend!', stars: 5, avatar: 'A' },
            ].map(({ name, role, text, stars, avatar }) => (
              <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                style={{ padding: '28px', background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: '20px' }}>
                <div style={{ display: 'flex', gap: '3px', marginBottom: '16px' }}>
                  {Array.from({ length: stars }).map((_, i) => <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="aurora-animated" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', color: 'white' }}>{avatar}</div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '14px' }}>{name}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section style={{ padding: '0 clamp(16px, 4vw, 48px) 100px' }}>
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div className="aurora-animated" style={{ borderRadius: '28px', padding: 'clamp(40px, 6vw, 72px)', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 52px)', fontWeight: 900, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>Your clarity starts today.</h2>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '18px', marginBottom: '36px' }}>Free forever. No credit card. No bank login. Just financial intelligence.</p>
            <button onClick={() => navigate('/signup')} style={{ background: 'white', color: '#6366f1', border: 'none', borderRadius: '14px', padding: '16px 44px', fontSize: '17px', fontWeight: 800, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
              onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)'}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}>
              Start Free — Takes 2 Minutes <ArrowRight size={20} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px clamp(16px, 4vw, 48px)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="aurora-animated" style={{ width: 26, height: 26, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={12} color="white" />
          </div>
          <span style={{ fontWeight: 700 }}>Aurora</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>© 2026 Aurora · Privacy-first financial intelligence · Made with ♥ for India</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          {['Privacy', 'Terms', 'Contact'].map(l => <a key={l} href="#" style={{ fontSize: '13px', color: 'var(--text-muted)', textDecoration: 'none' }}>{l}</a>)}
        </div>
      </footer>
    </div>
  )
}