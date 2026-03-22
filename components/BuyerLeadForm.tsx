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

export default function BuyerLeadForm() {
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [requireLender, setRequireLender] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    interest: '', propertyType: '', bedrooms: 'Any', bathrooms: 'Any',
    minPrice: 'No Min', maxPrice: 'No Max', questions: '',
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
      {/* Name row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>First Name *</label>
          <input
            type="text"
            required
            value={form.firstName}
            onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))}
            style={getInputStyle('firstName')}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Last Name *</label>
          <input
            type="text"
            required
            value={form.lastName}
            onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))}
            style={getInputStyle('lastName')}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
      </div>

      {/* Email + Phone */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Email Address *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            style={getInputStyle('email')}
            onFocus={() => setFocusedField('email')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Phone *</label>
          <input
            type="tel"
            required
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            style={getInputStyle('phone')}
            onFocus={() => setFocusedField('phone')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
      </div>

      {/* Interest */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>I am Interested in:</label>
        <select
          value={form.interest}
          onChange={e => setForm(f => ({ ...f, interest: e.target.value }))}
          style={{ ...getInputStyle('interest'), appearance: 'none' }}
          onFocus={() => setFocusedField('interest')}
          onBlur={() => setFocusedField(null)}
        >
          <option value="">Select One</option>
          <option>Buying</option>
          <option>Selling</option>
          <option>Buying &amp; Selling</option>
          <option>Leasing</option>
          <option>Broker / Agent</option>
        </select>
      </div>

      {/* Property Type */}
      <div style={{ ...fieldStyle, marginBottom: '16px' }}>
        <label style={labelStyle}>Property Type:</label>
        <select
          value={form.propertyType}
          onChange={e => setForm(f => ({ ...f, propertyType: e.target.value }))}
          style={{ ...getInputStyle('propertyType'), appearance: 'none' }}
          onFocus={() => setFocusedField('propertyType')}
          onBlur={() => setFocusedField(null)}
        >
          <option value="">Select One</option>
          <option>Condominium</option>
          <option>Single Family Residence</option>
          <option>Town House</option>
          <option>Investment Properties</option>
          <option>Commercial</option>
          <option>Land/Lot</option>
          <option>Vacation Properties</option>
          <option>Other</option>
        </select>
      </div>

      {/* Beds + Baths */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Bedrooms:</label>
          <select
            value={form.bedrooms}
            onChange={e => setForm(f => ({ ...f, bedrooms: e.target.value }))}
            style={{ ...getInputStyle('bedrooms'), appearance: 'none' }}
            onFocus={() => setFocusedField('bedrooms')}
            onBlur={() => setFocusedField(null)}
          >
            <option>Any</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5+</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Bathrooms:</label>
          <select
            value={form.bathrooms}
            onChange={e => setForm(f => ({ ...f, bathrooms: e.target.value }))}
            style={{ ...getInputStyle('bathrooms'), appearance: 'none' }}
            onFocus={() => setFocusedField('bathrooms')}
            onBlur={() => setFocusedField(null)}
          >
            <option>Any</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4+</option>
          </select>
        </div>
      </div>

      {/* Min + Max Price */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        <div style={fieldStyle}>
          <label style={labelStyle}>Min Price:</label>
          <select
            value={form.minPrice}
            onChange={e => setForm(f => ({ ...f, minPrice: e.target.value }))}
            style={{ ...getInputStyle('minPrice'), appearance: 'none' }}
            onFocus={() => setFocusedField('minPrice')}
            onBlur={() => setFocusedField(null)}
          >
            <option>No Min</option>
            <option>$50K</option>
            <option>$100K</option>
            <option>$150K</option>
            <option>$200K</option>
            <option>$250K</option>
            <option>$300K</option>
            <option>$400K</option>
            <option>$500K</option>
            <option>$600K</option>
            <option>$750K</option>
            <option>$1M</option>
            <option>$1.5M</option>
            <option>$2M</option>
          </select>
        </div>
        <div style={fieldStyle}>
          <label style={labelStyle}>Max Price:</label>
          <select
            value={form.maxPrice}
            onChange={e => setForm(f => ({ ...f, maxPrice: e.target.value }))}
            style={{ ...getInputStyle('maxPrice'), appearance: 'none' }}
            onFocus={() => setFocusedField('maxPrice')}
            onBlur={() => setFocusedField(null)}
          >
            <option>No Max</option>
            <option>$50K</option>
            <option>$100K</option>
            <option>$150K</option>
            <option>$200K</option>
            <option>$250K</option>
            <option>$300K</option>
            <option>$400K</option>
            <option>$500K</option>
            <option>$600K</option>
            <option>$750K</option>
            <option>$1M</option>
            <option>$1.5M</option>
            <option>$2M</option>
          </select>
        </div>
      </div>

      {/* Lender checkbox */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <input
          type="checkbox"
          id="requireLender"
          checked={requireLender}
          onChange={e => setRequireLender(e.target.checked)}
          style={{ accentColor: 'var(--gold)', width: '16px', height: '16px', flexShrink: 0 }}
        />
        <label htmlFor="requireLender" style={{ fontSize: '14px', color: 'var(--white-70)', cursor: 'pointer' }}>
          Do You Require Lender Information? Yes
        </label>
      </div>

      {/* Questions */}
      <div style={{ ...fieldStyle, marginBottom: '24px' }}>
        <label style={labelStyle}>Questions / Where Are You Looking?</label>
        <textarea
          rows={4}
          value={form.questions}
          onChange={e => setForm(f => ({ ...f, questions: e.target.value }))}
          style={{ ...getInputStyle('questions'), resize: 'vertical' }}
          onFocus={() => setFocusedField('questions')}
          onBlur={() => setFocusedField(null)}
        />
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
