import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, Mic, PenLine, CheckCircle2, X } from 'lucide-react'
import { useFinanceStore } from '@/lib/store'
import { CATEGORY_COLORS } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

const CATEGORIES = Object.keys(CATEGORY_COLORS).filter(c => c !== 'Income')

export default function AddTransactionPage() {
  const [tab, setTab] = useState<'manual' | 'voice' | 'upload'>('manual')
  const [desc, setDesc] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food & Dining')
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
  const [type, setType] = useState<'debit' | 'credit'>('debit')
  const [saved, setSaved] = useState(false)
  const [recording, setRecording] = useState(false)
  const [voiceText, setVoiceText] = useState('')
  const { addTransaction } = useFinanceStore()
  const navigate = useNavigate()

  const handleSave = () => {
    if (!desc || !amount) return
    addTransaction({ id: Date.now().toString(), date, description: desc, amount: Number(amount), category, type })
    setSaved(true)
    setTimeout(() => { setSaved(false); navigate('/transactions') }, 1500)
  }

  const simulateVoice = () => {
    setRecording(true)
    setTimeout(() => {
      setRecording(false)
      setVoiceText('Spent ₹150 on chai and samosa at college canteen today')
      setDesc('Chai and Samosa - College Canteen')
      setAmount('150')
      setCategory('Snacks')
      setTab('manual')
    }, 2200)
  }

  const tabs = [
    { id: 'manual', icon: <PenLine size={16} />, label: 'Manual' },
    { id: 'voice', icon: <Mic size={16} />, label: 'Voice' },
    { id: 'upload', icon: <Upload size={16} />, label: 'Upload' },
  ]

  return (
    <div style={{ padding: '32px 24px', maxWidth: '640px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 800, marginBottom: '8px', letterSpacing: '-0.5px' }}>Add Transaction</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '15px' }}>Log a new expense or income entry.</p>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '28px', background: 'var(--bg-card)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id as any)} style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: 600,
            background: tab === t.id ? 'linear-gradient(135deg, #6366f1, #0ea5e9)' : 'transparent',
            color: tab === t.id ? 'white' : 'var(--text-secondary)', transition: 'all 0.25s',
          }}>{t.icon}{t.label}</button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'manual' && (
          <motion.div key="manual" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            {voiceText && (
              <div style={{ marginBottom: '20px', padding: '14px 16px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', borderRadius: '12px', fontSize: '14px', color: '#10b981', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mic size={16} /> AI parsed: "{voiceText}"
                <button onClick={() => setVoiceText('')} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: '#10b981' }}><X size={14} /></button>
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* Type toggle */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Transaction Type</label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {(['debit', 'credit'] as const).map(t => (
                    <button key={t} onClick={() => setType(t)} style={{
                      flex: 1, padding: '12px', borderRadius: '12px', border: `1px solid ${type === t ? (t === 'debit' ? 'rgba(244,63,94,0.5)' : 'rgba(16,185,129,0.5)') : 'var(--border)'}`,
                      background: type === t ? (t === 'debit' ? 'rgba(244,63,94,0.1)' : 'rgba(16,185,129,0.1)') : 'var(--bg-card)',
                      color: type === t ? (t === 'debit' ? '#f43f5e' : '#10b981') : 'var(--text-secondary)',
                      cursor: 'pointer', fontWeight: 600, fontSize: '14px', transition: 'all 0.2s',
                    }}>
                      {t === 'debit' ? '💸 Expense' : '💰 Income'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Description</label>
                <input className="input-aurora" value={desc} onChange={e => setDesc(e.target.value)} placeholder="e.g. Swiggy dinner, Auto to office..." />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Amount (₹)</label>
                <input className="input-aurora" type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0" style={{ fontSize: '22px', fontWeight: 700 }} />
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '10px' }}>Category</label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {CATEGORIES.map(c => (
                    <button key={c} onClick={() => setCategory(c)} style={{
                      padding: '8px 14px', borderRadius: '100px', border: `1px solid ${category === c ? CATEGORY_COLORS[c] + '80' : 'var(--border)'}`,
                      background: category === c ? CATEGORY_COLORS[c] + '18' : 'var(--bg-card)',
                      color: category === c ? CATEGORY_COLORS[c] : 'var(--text-secondary)',
                      cursor: 'pointer', fontSize: '13px', fontWeight: category === c ? 600 : 400,
                      transition: 'all 0.2s',
                    }}>{c}</button>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>Date</label>
                <input className="input-aurora" type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>

              <AnimatePresence>
                {saved ? (
                  <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '16px', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: '14px', color: '#10b981', fontWeight: 700, fontSize: '16px' }}>
                    <CheckCircle2 size={22} /> Transaction saved!
                  </motion.div>
                ) : (
                  <button onClick={handleSave} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                    Save Transaction
                  </button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {tab === 'voice' && (
          <motion.div key="voice" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            style={{ textAlign: 'center', padding: '40px 0' }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px' }}>Voice Input</h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '15px', lineHeight: 1.7 }}>
                Just say it naturally — "Spent ₹200 on auto to office this morning"
              </p>
            </div>
            <button onClick={simulateVoice} disabled={recording} style={{
              width: 120, height: 120, borderRadius: '50%', border: 'none', cursor: recording ? 'not-allowed' : 'pointer',
              background: recording ? 'rgba(244,63,94,0.2)' : 'linear-gradient(135deg, #6366f1, #0ea5e9)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px',
              transition: 'all 0.3s', boxShadow: recording ? '0 0 0 20px rgba(244,63,94,0.1), 0 0 0 40px rgba(244,63,94,0.05)' : '0 10px 40px rgba(99,102,241,0.4)',
            }}>
              <Mic size={44} color="white" />
            </button>
            <p style={{ color: recording ? '#f43f5e' : 'var(--text-muted)', fontSize: '15px', fontWeight: recording ? 600 : 400 }}>
              {recording ? '🔴 Listening...' : 'Tap to speak'}
            </p>
            {recording && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', gap: '4px' }}>
                {[0, 1, 2, 3, 4].map(i => (
                  <motion.div key={i} animate={{ height: ['8px', '24px', '8px'] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.1 }}
                    style={{ width: '4px', background: '#f43f5e', borderRadius: '2px' }} />
                ))}
              </motion.div>
            )}
          </motion.div>
        )}

        {tab === 'upload' && (
          <motion.div key="upload" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}>
            <div style={{ border: '2px dashed rgba(99,102,241,0.3)', borderRadius: '16px', padding: '60px 24px', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.7)'; (e.currentTarget as HTMLElement).style.background = 'rgba(99,102,241,0.04)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(99,102,241,0.3)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📄</div>
              <h3 style={{ fontWeight: 700, fontSize: '18px', marginBottom: '8px' }}>Drop your bank statement here</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>PDF or CSV from any Indian bank — HDFC, SBI, ICICI, Axis, Kotak</p>
              <button className="btn-primary" style={{ fontSize: '14px', padding: '10px 24px' }}>Browse Files</button>
            </div>
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {['🔒 File is processed locally — never uploaded to servers', '🤖 AI auto-categorizes with Indian context', '✏️ You can review and edit before saving'].map(t => (
                <div key={t} style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>{t}</div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}