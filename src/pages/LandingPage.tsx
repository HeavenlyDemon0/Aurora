import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {
  Shield, Zap, TrendingUp, Brain, Star,
  ArrowRight, ChevronRight, Sparkles,
  PieChart, Sliders, Bell, Lock
} from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

export default function LandingPage() {
  const navigate = useNavigate()
  const [sliderVal, setSliderVal] = useState(40)
  const savings = Math.round((sliderVal / 100) * 4200)

  return (
    <div style={{ background: 'var(--bg-primary)', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(7,11,20,0.8)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div className="aurora-animated" style={{
            width: 32, height: 32, borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Sparkles size={18} color="white" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '20px', letterSpacing: '-0.5px' }}>Aurora</span>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button className="btn-ghost" style={{ padding: '8px 20px', fontSize: '14px' }}
            onClick={() => navigate('/login')}>Sign In</button>
          <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '14px' }}
            onClick={() => navigate('/signup')}>Get Started Free</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 60px', position: 'relative', overflow: 'hidden' }}>

        {/* Ambient orbs */}
        <div style={{
          position: 'absolute', top: '15%', left: '10%', width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: '10%', right: '8%', width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(16,185,129,0.12) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', top: '40%', right: '20%', width: '300px', height: '300px',
          background: 'radial-gradient(circle, rgba(14,165,233,0.1) 0%, transparent 70%)',
          borderRadius: '50%', filter: 'blur(40px)', pointerEvents: 'none'
        }} />

        <motion.div variants={stagger} initial="hidden" animate="show"
          style={{ maxWidth: '860px', textAlign: 'center', position: 'relative', zIndex: 1 }}>

          <motion.div variants={fadeUp}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '100px', padding: '6px 16px', fontSize: '13px',
              color: '#a5b4fc', marginBottom: '32px', fontWeight: 500
            }}>
              <Sparkles size={13} />
              AI-Powered Financial Intelligence for India
            </span>
          </motion.div>

          <motion.h1 variants={fadeUp} style={{
            fontSize: 'clamp(40px, 7vw, 80px)', fontWeight: 800,
            lineHeight: 1.1, letterSpacing: '-2px', marginBottom: '24px'
          }}>
            Illuminate Your Finances.{' '}
            <span className="aurora-gradient-text">Stop the Leaks.</span>
            {' '}Build Real Wealth.
          </motion.h1>

          <motion.p variants={fadeUp} style={{
            fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--text-secondary)',
            maxWidth: '600px', margin: '0 auto 40px', lineHeight: 1.7
          }}>
            Aurora transforms your spending data into behavioral insights and simulated futures — 100% private, no bank login ever required.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
            <button className="btn-primary" style={{ fontSize: '16px', padding: '14px 36px', display: 'flex', alignItems: 'center', gap: '8px' }}
              onClick={() => navigate('/signup')}>
              Start Free – No Bank Login Ever <ArrowRight size={18} />
            </button>
            <button className="btn-ghost" style={{ fontSize: '16px', padding: '14px 36px' }}
              onClick={() => navigate('/dashboard')}>
              View Live Demo
            </button>
          </motion.div>

          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {['🔒 Zero bank access', '🇮🇳 Built for India', '⚡ 5 min setup', '✨ AI-powered'].map(t => (
              <span key={t} style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{t}</span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* STATS BAND */}
      <section style={{ padding: '0 24px 80px' }}>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{
            maxWidth: '900px', margin: '0 auto', display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1px', background: 'var(--border)', borderRadius: '20px', overflow: 'hidden'
          }}>
          {[
            { n: '₹8,400', l: 'Avg monthly leakage detected' },
            { n: '23%', l: 'Average savings rate improvement' },
            { n: '2.1L+', l: 'Indians using Aurora' },
            { n: '5 min', l: 'To your first insight' },
          ].map(({ n, l }) => (
            <div key={l} style={{ background: 'var(--bg-card)', padding: '32px 24px', textAlign: 'center' }}>
              <div className="aurora-gradient-text" style={{ fontSize: '32px', fontWeight: 800, marginBottom: '8px' }}>{n}</div>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-1px', marginBottom: '16px' }}>
              Everything you need to{' '}
              <span className="aurora-gradient-text">master your money</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '18px', maxWidth: '500px', margin: '0 auto' }}>
              Built specifically for how India earns, spends, and saves.
            </p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              {
                icon: <Zap size={22} color="#6366f1" />,
                color: 'rgba(99,102,241,0.1)',
                title: 'Effortless Import',
                desc: 'Upload bank PDFs, CSVs, or just speak naturally. AI auto-categorizes with Indian context — chai, auto, UPI merchants.',
                tag: 'PDF • CSV • Voice • Photo'
              },
              {
                icon: <Brain size={22} color="#0ea5e9" />,
                color: 'rgba(14,165,233,0.1)',
                title: 'Behavioral Insights',
                desc: 'See your junk vs essential spending patterns. Understand your financial behavior, not just your balance.',
                tag: 'Pattern Analysis • Trends'
              },
              {
                icon: <Sliders size={22} color="#10b981" />,
                color: 'rgba(16,185,129,0.1)',
                title: 'Leakage Simulator',
                desc: 'Drag a slider and watch your projected savings change in real time. The most powerful budgeting tool you\'ve ever used.',
                tag: 'Interactive • Predictive'
              },
              {
                icon: <PieChart size={22} color="#8b5cf6" />,
                color: 'rgba(139,92,246,0.1)',
                title: 'Adaptive Dashboard',
                desc: 'Beautiful, data-rich charts that adapt to your spending patterns. Drill into any category, any month.',
                tag: 'Charts • Drill-down'
              },
              {
                icon: <Bell size={22} color="#f59e0b" />,
                color: 'rgba(245,158,11,0.1)',
                title: 'Smart Nudges',
                desc: 'Timely, positive notifications. "You\'re 18% under last month — amazing!" Celebrate wins, never shame.',
                tag: 'Gamification • Streaks'
              },
              {
                icon: <Lock size={22} color="#f43f5e" />,
                color: 'rgba(244,63,94,0.1)',
                title: '100% Privacy First',
                desc: 'Your data never leaves your device without your consent. No bank credentials. No API access. You\'re in full control.',
                tag: 'Local-first • Encrypted'
              },
            ].map(({ icon, color, title, desc, tag }) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card card-hover" style={{ padding: '28px' }}>
                <div style={{ width: 44, height: 44, borderRadius: '12px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                  {icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '10px' }}>{title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: 1.7, marginBottom: '16px' }}>{desc}</p>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.04)', padding: '4px 10px', borderRadius: '6px' }}>{tag}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULATOR TEASER */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="card aurora-glow" style={{ padding: '48px', overflow: 'hidden', position: 'relative' }}>
            <div style={{
              position: 'absolute', top: -60, right: -60, width: '300px', height: '300px',
              background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none'
            }} />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <span style={{ fontSize: '13px', fontWeight: 600, color: '#a5b4fc', textTransform: 'uppercase', letterSpacing: '1px' }}>
                ✦ Leakage Simulator
              </span>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, margin: '12px 0 8px', letterSpacing: '-1px' }}>
                What if you cut eating out by <span className="aurora-gradient-text">{sliderVal}%</span>?
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '36px', fontSize: '16px' }}>
                Drag the slider to see your projected monthly savings — live.
              </p>

              <div style={{ marginBottom: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Reduction in Food & Dining spend</span>
                  <span style={{ fontWeight: 700, color: '#a5b4fc' }}>{sliderVal}%</span>
                </div>
                <input type="range" min={0} max={100} value={sliderVal}
                  onChange={e => setSliderVal(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#6366f1', height: '6px', cursor: 'pointer' }} />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>No change</span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Full reduction</span>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                {[
                  { label: 'Monthly Savings', value: `₹${savings.toLocaleString('en-IN')}`, color: '#10b981' },
                  { label: 'Yearly Impact', value: `₹${(savings * 12).toLocaleString('en-IN')}`, color: '#6366f1' },
                  { label: 'In 5 Years (8% returns)', value: `₹${Math.round(savings * 12 * 6.34 / 1000)}K`, color: '#0ea5e9' },
                ].map(({ label, value, color }) => (
                  <div key={label} className="card" style={{ padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontSize: '24px', fontWeight: 800, color, marginBottom: '6px' }}>{value}</div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{label}</div>
                  </div>
                ))}
              </div>

              <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => navigate('/signup')}>
                Try Full Simulator Free <ChevronRight size={18} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            style={{ textAlign: 'center', fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 800, marginBottom: '48px', letterSpacing: '-1px' }}>
            Real people. <span className="aurora-gradient-text">Real results.</span>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {[
              { name: 'Priya S.', role: 'Software Engineer, Bengaluru', text: 'I had no idea I was spending ₹6,200/month on food delivery. Aurora showed me in 2 minutes. Cut it by half in the first month.', stars: 5 },
              { name: 'Rahul M.', role: 'MBA Student, Mumbai', text: 'The leakage simulator is genuinely magical. I moved sliders around for 10 minutes and figured out how to save for my MacBook in 4 months.', stars: 5 },
              { name: 'Ananya K.', role: 'Freelance Designer, Delhi', text: 'Finally an app that understands chai runs, auto rides, and festival shopping. The AI even predicted my Diwali overspend!', stars: 5 },
            ].map(({ name, role, text, stars }) => (
              <motion.div key={name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="card" style={{ padding: '28px' }}>
                <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                  {Array.from({ length: stars }).map((_, i) => (
                    <Star key={i} size={14} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7, marginBottom: '20px' }}>"{text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className="aurora-animated" style={{ width: 40, height: 40, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '16px', color: 'white' }}>
                    {name[0]}
                  </div>
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

      {/* CTA */}
      <section style={{ padding: '0 24px 100px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="aurora-animated" style={{ borderRadius: '24px', padding: '64px 48px', textAlign: 'center' }}>
            <h2 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
              Your financial clarity starts today.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '18px', marginBottom: '36px' }}>
              Free forever. No credit card. No bank login. Just clarity.
            </p>
            <button onClick={() => navigate('/signup')} style={{
              background: 'white', color: '#6366f1', border: 'none', borderRadius: '12px',
              padding: '16px 40px', fontSize: '17px', fontWeight: 700, cursor: 'pointer',
              transition: 'all 0.3s ease', display: 'inline-flex', alignItems: 'center', gap: '8px'
            }}>
              Start Free – Takes 2 Minutes <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '32px 24px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '16px' }}>
          <div className="aurora-animated" style={{ width: 28, height: 28, borderRadius: '7px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Sparkles size={14} color="white" />
          </div>
          <span style={{ fontWeight: 700 }}>Aurora</span>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '13px' }}>
          © 2026 Aurora. Privacy-first financial intelligence. Made with ♥ for India.
        </p>
      </footer>
    </div>
  )
}