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

export default function PersonalizedSearchForm() {
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [requireLender, setRequireLender] = useState(false)
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    movingTimeline: '', propertyType: '',
    bedrooms: 'Any', bathrooms: 'Any', squareFeet: 'Any', acreage: 'Any',
    basement: 'No Basement', garage: 'Any', yearBuilt: 'Any',
    importantFeatures: '', neighborhoodFeatures: '',
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
          <a href="mailto:info@nevadagroup.com" className="btn-outline">Email Us</a>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      background: 'var(--dark-3)',
      border: '1px solid var(--border-dim)',
      borderRadius: 'var(--radius-lg)',
      padding: '32px',
    }}>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(22px, 3vw, 32px)', color: 'var(--white)', marginBottom: '12px' }}>
        Let Us Help You Find Your Dream Home
      </h2>
      <p style={{ fontSize: '15px', color: 'var(--white-70)', lineHeight: '1.7', marginBottom: '32px', paddingBottom: '24px', borderBottom: '1px solid var(--border-dim)' }}>
        Please fill out the form below so we know what you&apos;re looking for and we&apos;ll monitor new listings as they come on the market and alert you when we see properties that match your specific criteria.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Name */}
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

        {/* Moving Timeline */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>I am planning to move:</label>
          <select value={form.movingTimeline} onChange={e => setForm(f => ({ ...f, movingTimeline: e.target.value }))}
            style={{ ...getInputStyle('movingTimeline'), appearance: 'none' }}
            onFocus={() => setFocusedField('movingTimeline')} onBlur={() => setFocusedField(null)}>
            <option>Not Sure</option>
            <option>Right Away</option>
            <option>Within 3 months</option>
            <option>Within 6 months</option>
            <option>Within 9 months</option>
            <option>Within the next year</option>
          </select>
        </div>

        {/* Property Type */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>Property Type:</label>
          <select value={form.propertyType} onChange={e => setForm(f => ({ ...f, propertyType: e.target.value }))}
            style={{ ...getInputStyle('propertyType'), appearance: 'none' }}
            onFocus={() => setFocusedField('propertyType')} onBlur={() => setFocusedField(null)}>
            <option value="">Select One</option>
            <option>Single Family</option>
            <option>Multi Family</option>
            <option>Town Home</option>
            <option>Condominium</option>
            <option>Land</option>
            <option>Commercial</option>
            <option>Investment</option>
            <option>Residential</option>
            <option>Patio Home</option>
          </select>
        </div>

        {/* Lender checkbox */}
        <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="checkbox"
            id="requireLenderPS"
            checked={requireLender}
            onChange={e => setRequireLender(e.target.checked)}
            style={{ accentColor: 'var(--gold)', width: '16px', height: '16px', flexShrink: 0 }}
          />
          <label htmlFor="requireLenderPS" style={{ fontSize: '14px', color: 'var(--white-70)', cursor: 'pointer' }}>
            Do You Require Lender Information? Yes
          </label>
        </div>

        <p style={subheadingStyle}>Describe the Home You&apos;re Looking For</p>

        {/* Beds + Baths */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div style={fieldStyle}>
            <label style={labelStyle}>Bedrooms:</label>
            <select value={form.bedrooms} onChange={e => setForm(f => ({ ...f, bedrooms: e.target.value }))}
              style={{ ...getInputStyle('bedrooms'), appearance: 'none' }}
              onFocus={() => setFocusedField('bedrooms')} onBlur={() => setFocusedField(null)}>
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
            <select value={form.bathrooms} onChange={e => setForm(f => ({ ...f, bathrooms: e.target.value }))}
              style={{ ...getInputStyle('bathrooms'), appearance: 'none' }}
              onFocus={() => setFocusedField('bathrooms')} onBlur={() => setFocusedField(null)}>
              <option>Any</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5+</option>
            </select>
          </div>
        </div>

        {/* Square Feet */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>Square feet:</label>
          <select value={form.squareFeet} onChange={e => setForm(f => ({ ...f, squareFeet: e.target.value }))}
            style={{ ...getInputStyle('squareFeet'), appearance: 'none' }}
            onFocus={() => setFocusedField('squareFeet')} onBlur={() => setFocusedField(null)}>
            <option>Any</option>
            <option>500</option>
            <option>1000</option>
            <option>1500</option>
            <option>2000</option>
            <option>2500</option>
            <option>3000</option>
            <option>3500</option>
            <option>4000</option>
            <option>4500</option>
            <option>5000+</option>
          </select>
        </div>

        {/* Acreage */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>Acreage:</label>
          <select value={form.acreage} onChange={e => setForm(f => ({ ...f, acreage: e.target.value }))}
            style={{ ...getInputStyle('acreage'), appearance: 'none' }}
            onFocus={() => setFocusedField('acreage')} onBlur={() => setFocusedField(null)}>
            <option>Any</option>
            <option>0.25</option>
            <option>0.5</option>
            <option>1</option>
            <option>2</option>
            <option>5+</option>
          </select>
        </div>

        {/* Basement */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>Basement:</label>
          <select value={form.basement} onChange={e => setForm(f => ({ ...f, basement: e.target.value }))}
            style={{ ...getInputStyle('basement'), appearance: 'none' }}
            onFocus={() => setFocusedField('basement')} onBlur={() => setFocusedField(null)}>
            <option>No Basement</option>
            <option>Finished</option>
            <option>Partially Finished</option>
            <option>Unfinished</option>
          </select>
        </div>

        {/* Garage spaces */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>Garage spaces:</label>
          <select value={form.garage} onChange={e => setForm(f => ({ ...f, garage: e.target.value }))}
            style={{ ...getInputStyle('garage'), appearance: 'none' }}
            onFocus={() => setFocusedField('garage')} onBlur={() => setFocusedField(null)}>
            <option>Any</option>
            <option>1</option>
            <option>2</option>
            <option>3+</option>
          </select>
        </div>

        {/* Year Built */}
        <div style={{ ...fieldStyle, marginBottom: '24px' }}>
          <label style={labelStyle}>Year Built (from):</label>
          <select value={form.yearBuilt} onChange={e => setForm(f => ({ ...f, yearBuilt: e.target.value }))}
            style={{ ...getInputStyle('yearBuilt'), appearance: 'none' }}
            onFocus={() => setFocusedField('yearBuilt')} onBlur={() => setFocusedField(null)}>
            <option>Any</option>
            <option>1960</option>
            <option>1970</option>
            <option>1980</option>
            <option>1990</option>
            <option>2000</option>
            <option>2005</option>
            <option>2010</option>
            <option>2015</option>
            <option>2020</option>
            <option>2023</option>
          </select>
        </div>

        {/* Important features */}
        <div style={{ ...fieldStyle, marginBottom: '16px' }}>
          <label style={labelStyle}>Other features I think are important</label>
          <textarea rows={3} value={form.importantFeatures}
            onChange={e => setForm(f => ({ ...f, importantFeatures: e.target.value }))}
            style={{ ...getInputStyle('importantFeatures'), resize: 'vertical' }}
            onFocus={() => setFocusedField('importantFeatures')} onBlur={() => setFocusedField(null)} />
        </div>

        {/* Neighborhood features */}
        <div style={{ ...fieldStyle, marginBottom: '24px' }}>
          <label style={labelStyle}>Features I think are important in the street, neighborhood and community</label>
          <textarea rows={3} value={form.neighborhoodFeatures}
            onChange={e => setForm(f => ({ ...f, neighborhoodFeatures: e.target.value }))}
            style={{ ...getInputStyle('neighborhoodFeatures'), resize: 'vertical' }}
            onFocus={() => setFocusedField('neighborhoodFeatures')} onBlur={() => setFocusedField(null)} />
        </div>

        <button type="submit" className="btn-gold" style={{ width: '100%', justifyContent: 'center', border: 'none', cursor: 'pointer', fontSize: '15px', padding: '14px 28px' }}>
          Submit
        </button>

        <p style={{ fontSize: '11px', color: 'var(--white-30)', marginTop: '16px', lineHeight: '1.6' }}>
          {SMS_CONSENT}
        </p>
      </form>
    </div>
  )
}
