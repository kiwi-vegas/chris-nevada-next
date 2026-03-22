'use client'
import { useState } from 'react'

const SMS_CONSENT = `By proceeding, you expressly consent to receive texts at the number you provided, including marketing, from Chris Nevada about real estate related matters, but not as a condition of purchase. Message frequency varies. You can text Help for help and Stop to cancel. You also agree to our Terms of Service and to our Privacy Policy regarding the information relating to you. Message and data rates may apply. Additionally, you expressly consent to receiving calls at the number you provided, including marketing by auto-dialer, pre-recorded or artificial voice, and email, from Chris Nevada about real estate related matters, but not as a condition of purchase. This consent applies even if you are on a corporate, state or national Do Not Call list. Messages may be processed by an automated system.`

const inputStyle: React.CSSProperties = {
  background: 'var(--dark-4)',
  border: '1px solid var(--border-dim)',
  borderRadius: 'var(--radius)',
  color: 'var(--white)',
  padding: '10px 14px',
  fontSize: '14px',
  width: '100%',
  fontFamily: 'var(--font-sans)',
  outline: 'none',
}

const labelStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--white-50)',
  marginBottom: '6px',
  display: 'block',
  fontWeight: 500,
}

const fieldStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
}

const subheadingStyle: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  color: 'var(--gold)',
  letterSpacing: '0.05em',
  textTransform: 'uppercase' as const,
  marginBottom: '16px',
  marginTop: '24px',
  fontFamily: 'var(--font-sans)',
}

export default function PreApprovalForm() {
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [workingWithAgent, setWorkingWithAgent] = useState('No')
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    creditScore: '', annualIncome: '', priceRange: '',
    purchaseTiming: '', generalArea: '',
    agentName: '', agentCompany: '', comments: '',
  })

  function getInputStyle(fieldName: string): React.CSSProperties {
    return { ...inputStyle, borderColor: focusedField === fieldName ? 'var(--gold)' : 'var(--border-dim)' }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div style={{
        background: 'var(--dark-3)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '48px 32px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '56px', height: '56px', borderRadius: '50%',
          background: 'rgba(201,168,76,0.15)', border: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '24px', color: 'var(--white)', marginBottom: '12px' }}>
          Thank you!
        </h3>
        <p style={{ fontSize: '15px', color: 'var(--white-70)', marginBottom: '24px', lineHeight: 1.6 }}>
          We&apos;ll be in touch shortly. You can also reach us directly:
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+17252399950" className="btn-gold">Call 725.239.9950</a>
          <a href="mailto:chris@nevadarealestategroup.net" className="btn-outline">Email Us</a>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} style={{
      background: 'var(--dark-3)',
      border: '1px solid var(--border-dim)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px',
    }}>
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '22px', color: 'var(--white)', marginBottom: '24px', paddingBottom: '16px', borderBottom: '1px solid var(--border-dim)' }}>
        Mortgage Prequalification
      </h3>

      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>First Name *</label>
          <input type="text" required value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            style={getInputStyle('firstName')} onFocus={() => setFocusedField('firstName')} onBlur={() => setFocusedField(null)} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Last Name *</label>
          <input type="text" required value={form.lastName}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
            style={getInputStyle('lastName')} onFocus={() => setFocusedField('lastName')} onBlur={() => setFocusedField(null)} />
        </div>
      </div>

      {/* Email + Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Email Address *</label>
          <input type="email" required value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={getInputStyle('email')} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Phone *</label>
          <input type="tel" required value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            style={getInputStyle('phone')} onFocus={() => setFocusedField('phone')} onBlur={() => setFocusedField(null)} />
        </div>
      </div>

      {/* Address */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>Address</label>
        <input type="text" value={form.address}
          onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
          style={getInputStyle('address')} onFocus={() => setFocusedField('address')} onBlur={() => setFocusedField(null)} />
      </div>

      {/* City / State / Zip */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>City</label>
          <input type="text" value={form.city}
            onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
            style={getInputStyle('city')} onFocus={() => setFocusedField('city')} onBlur={() => setFocusedField(null)} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>State</label>
          <input type="text" value={form.state}
            onChange={e => setForm(f => ({ ...f, state: e.target.value }))}
            style={getInputStyle('state')} onFocus={() => setFocusedField('state')} onBlur={() => setFocusedField(null)} />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Zip</label>
          <input type="text" value={form.zip}
            onChange={e => setForm(f => ({ ...f, zip: e.target.value }))}
            style={getInputStyle('zip')} onFocus={() => setFocusedField('zip')} onBlur={() => setFocusedField(null)} />
        </div>
      </div>

      <p style={subheadingStyle}>Your Credit and Income</p>

      {/* Credit Score */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>How is Your Credit Score?</label>
        <select value={form.creditScore} onChange={e => setForm(f => ({ ...f, creditScore: e.target.value }))}
          style={{ ...getInputStyle('creditScore'), appearance: 'none' }}
          onFocus={() => setFocusedField('creditScore')} onBlur={() => setFocusedField(null)}>
          <option value="">Select One</option>
          <option>Very Good: 750-850</option>
          <option>Good: 680-750</option>
          <option>OK: 600-680</option>
          <option>Working on it: under 600</option>
          <option>Don&apos;t Know my Score</option>
        </select>
      </div>

      {/* Annual Income */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>Approximate Annual Household Income?</label>
        <select value={form.annualIncome} onChange={e => setForm(f => ({ ...f, annualIncome: e.target.value }))}
          style={{ ...getInputStyle('annualIncome'), appearance: 'none' }}
          onFocus={() => setFocusedField('annualIncome')} onBlur={() => setFocusedField(null)}>
          <option value="">Select One</option>
          <option>Less than $20K/yr</option>
          <option>$20K-$30K/yr</option>
          <option>$30K-$40K/yr</option>
          <option>$40K-$50K/yr</option>
          <option>$50K-$75K/yr</option>
          <option>$75K-$100K/yr</option>
          <option>More than $100K/yr</option>
        </select>
      </div>

      {/* Price Range */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>Price Range:</label>
        <select value={form.priceRange} onChange={e => setForm(f => ({ ...f, priceRange: e.target.value }))}
          style={{ ...getInputStyle('priceRange'), appearance: 'none' }}
          onFocus={() => setFocusedField('priceRange')} onBlur={() => setFocusedField(null)}>
          <option value="">Select One</option>
          <option>Less than $100K</option>
          <option>$100K-$150K</option>
          <option>$150K-$200K</option>
          <option>$200K-$250K</option>
          <option>$250K-$300K</option>
          <option>$300K-$400K</option>
          <option>$400K-$500K</option>
          <option>$500K-$750K</option>
          <option>$750K-$1M</option>
          <option>$1M-$1.25M</option>
          <option>$1.25M-$1.5M</option>
          <option>$1.5M-$1.75M</option>
          <option>$1.75M-$2M</option>
          <option>$2M-$2.5M</option>
          <option>$2.5M+</option>
        </select>
      </div>

      <p style={subheadingStyle}>Other Details</p>

      {/* Purchase Timing */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>Planning to purchase a home in:</label>
        <select value={form.purchaseTiming} onChange={e => setForm(f => ({ ...f, purchaseTiming: e.target.value }))}
          style={{ ...getInputStyle('purchaseTiming'), appearance: 'none' }}
          onFocus={() => setFocusedField('purchaseTiming')} onBlur={() => setFocusedField(null)}>
          <option value="">Select One</option>
          <option>Less than 60 days</option>
          <option>2-3 Months</option>
          <option>3-6 Months</option>
          <option>6-9 Months</option>
          <option>9-12 Months</option>
          <option>More than 12 Months</option>
        </select>
      </div>

      {/* General Area */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>In what general area would you like to live?</label>
        <input type="text" value={form.generalArea}
          onChange={e => setForm(f => ({ ...f, generalArea: e.target.value }))}
          style={getInputStyle('generalArea')} onFocus={() => setFocusedField('generalArea')} onBlur={() => setFocusedField(null)} />
      </div>

      {/* Working with Agent */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>Are you working with a Real Estate Agent?</label>
        <select value={workingWithAgent} onChange={e => setWorkingWithAgent(e.target.value)}
          style={{ ...getInputStyle('workingWithAgent'), appearance: 'none' }}
          onFocus={() => setFocusedField('workingWithAgent')} onBlur={() => setFocusedField(null)}>
          <option>No</option>
          <option>Yes</option>
        </select>
      </div>

      {workingWithAgent === 'Yes' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Agent Name</label>
            <input type="text" value={form.agentName}
              onChange={e => setForm(f => ({ ...f, agentName: e.target.value }))}
              style={getInputStyle('agentName')} onFocus={() => setFocusedField('agentName')} onBlur={() => setFocusedField(null)} />
          </div>
          <div style={fieldStyle}>
            <label style={labelStyle}>Agent Company</label>
            <input type="text" value={form.agentCompany}
              onChange={e => setForm(f => ({ ...f, agentCompany: e.target.value }))}
              style={getInputStyle('agentCompany')} onFocus={() => setFocusedField('agentCompany')} onBlur={() => setFocusedField(null)} />
          </div>
        </div>
      )}

      {/* Comments */}
      <div style={{ ...fieldStyle, marginBottom: '24px' }}>
        <label style={labelStyle}>Comments</label>
        <textarea rows={4} value={form.comments}
          onChange={e => setForm(f => ({ ...f, comments: e.target.value }))}
          style={{ ...getInputStyle('comments'), resize: 'vertical' }}
          onFocus={() => setFocusedField('comments')} onBlur={() => setFocusedField(null)} />
      </div>

      <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '15px', padding: '14px 28px' }}>
        Submit
      </button>

      <p style={{ fontSize: '11px', color: 'var(--white-30)', marginTop: '16px', lineHeight: '1.6' }}>
        {SMS_CONSENT}
      </p>
    </form>
  )
}
