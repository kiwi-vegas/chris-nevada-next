'use client'
import { useState, useCallback } from 'react'

function formatCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`
  if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`
  return `$${n}`
}

function formatDollars(n: number): string {
  return '$' + Math.round(n).toLocaleString('en-US')
}

function calcPI(loanAmount: number, annualRate: number, termYears: number): number {
  if (annualRate === 0) return loanAmount / (termYears * 12)
  const r = annualRate / 100 / 12
  const n = termYears * 12
  return loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  appearance: 'none',
  WebkitAppearance: 'none',
  height: '4px',
  borderRadius: '2px',
  background: 'var(--dark-4)',
  outline: 'none',
  cursor: 'pointer',
  accentColor: 'var(--gold)',
}

const labelStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: '10px',
}

const labelTextStyle: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 500,
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  color: 'var(--white-70)',
  fontFamily: 'var(--font-sans)',
}

const valueStyle: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 600,
  color: 'var(--white)',
  fontFamily: 'var(--font-sans)',
}

const subValueStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--white-50)',
  fontFamily: 'var(--font-sans)',
  marginLeft: '6px',
}

const fieldStyle: React.CSSProperties = {
  marginBottom: '32px',
}

const resultRowStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 0',
  borderBottom: '1px solid var(--border-dim)',
}

const resultLabelStyle: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--white-70)',
  fontFamily: 'var(--font-sans)',
}

const resultValueStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  color: 'var(--white)',
  fontFamily: 'var(--font-sans)',
}

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(500000)
  const [downPct, setDownPct] = useState(20)
  const [interestRate, setInterestRate] = useState(6.5)
  const [termYears, setTermYears] = useState(30)

  const downAmount = homePrice * (downPct / 100)
  const loanAmount = homePrice - downAmount
  const pi = calcPI(loanAmount, interestRate, termYears)
  const propertyTax = (homePrice * 0.007) / 12
  const insurance = (homePrice * 0.005) / 12
  const total = pi + propertyTax + insurance

  const handleHomePrice = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHomePrice(Number(e.target.value))
  }, [])
  const handleDownPct = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDownPct(Number(e.target.value))
  }, [])
  const handleRate = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInterestRate(Number(e.target.value))
  }, [])

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '24px',
      maxWidth: '900px',
      margin: '0 auto',
    }}>
      {/* Inputs Panel */}
      <div style={{
        background: 'var(--dark-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px 32px',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          color: 'var(--white)',
          marginBottom: '32px',
          fontWeight: 600,
        }}>
          Loan Details
        </h3>

        {/* Home Price */}
        <div style={fieldStyle}>
          <div style={labelStyle}>
            <span style={labelTextStyle}>Home Price</span>
            <span style={valueStyle}>{formatDollars(homePrice)}</span>
          </div>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={10000}
            value={homePrice}
            onChange={handleHomePrice}
            style={inputStyle}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--white-30)', fontFamily: 'var(--font-sans)' }}>$100K</span>
            <span style={{ fontSize: '11px', color: 'var(--white-30)', fontFamily: 'var(--font-sans)' }}>$2M</span>
          </div>
        </div>

        {/* Down Payment */}
        <div style={fieldStyle}>
          <div style={labelStyle}>
            <span style={labelTextStyle}>Down Payment</span>
            <span style={valueStyle}>
              {downPct}%
              <span style={subValueStyle}>({formatDollars(downAmount)})</span>
            </span>
          </div>
          <input
            type="range"
            min={3}
            max={50}
            step={1}
            value={downPct}
            onChange={handleDownPct}
            style={inputStyle}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--white-30)', fontFamily: 'var(--font-sans)' }}>3%</span>
            <span style={{ fontSize: '11px', color: 'var(--white-30)', fontFamily: 'var(--font-sans)' }}>50%</span>
          </div>
        </div>

        {/* Interest Rate */}
        <div style={fieldStyle}>
          <div style={labelStyle}>
            <span style={labelTextStyle}>Interest Rate</span>
            <span style={valueStyle}>{interestRate.toFixed(1)}%</span>
          </div>
          <input
            type="range"
            min={3.0}
            max={12.0}
            step={0.1}
            value={interestRate}
            onChange={handleRate}
            style={inputStyle}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
            <span style={{ fontSize: '11px', color: 'var(--white-30)', fontFamily: 'var(--font-sans)' }}>3.0%</span>
            <span style={{ fontSize: '11px', color: 'var(--white-30)', fontFamily: 'var(--font-sans)' }}>12.0%</span>
          </div>
        </div>

        {/* Loan Term */}
        <div style={{ ...fieldStyle, marginBottom: 0 }}>
          <div style={{ ...labelStyle, marginBottom: '12px' }}>
            <span style={labelTextStyle}>Loan Term</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            {[30, 15].map(yr => (
              <button
                key={yr}
                onClick={() => setTermYears(yr)}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: 'var(--radius)',
                  border: termYears === yr ? '1px solid var(--gold)' : '1px solid var(--border)',
                  background: termYears === yr ? 'rgba(201,168,76,0.12)' : 'var(--dark-3)',
                  color: termYears === yr ? 'var(--gold)' : 'var(--white-70)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.15s',
                }}
              >
                {yr} Years
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Panel */}
      <div style={{
        background: 'var(--dark-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: '36px 32px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '20px',
          color: 'var(--white)',
          marginBottom: '8px',
          fontWeight: 600,
        }}>
          Monthly Breakdown
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)', marginBottom: '28px' }}>
          Based on a {termYears}-year fixed loan at {interestRate.toFixed(1)}% APR
        </p>

        <div style={resultRowStyle}>
          <span style={resultLabelStyle}>Principal &amp; Interest</span>
          <span style={resultValueStyle}>{formatDollars(pi)}/mo</span>
        </div>
        <div style={resultRowStyle}>
          <span style={resultLabelStyle}>Est. Property Tax <span style={{ fontSize: '11px', color: 'var(--white-30)' }}>(~0.7%/yr)</span></span>
          <span style={resultValueStyle}>{formatDollars(propertyTax)}/mo</span>
        </div>
        <div style={{ ...resultRowStyle, borderBottom: '2px solid var(--border)' }}>
          <span style={resultLabelStyle}>Est. Insurance <span style={{ fontSize: '11px', color: 'var(--white-30)' }}>(~0.5%/yr)</span></span>
          <span style={resultValueStyle}>{formatDollars(insurance)}/mo</span>
        </div>

        {/* Total */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '20px 0 24px',
          borderBottom: '1px solid var(--border-dim)',
        }}>
          <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>
            Total Est. Monthly Payment
          </span>
          <span style={{
            fontSize: '28px',
            fontWeight: 700,
            color: 'var(--gold)',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em',
          }}>
            {formatDollars(total)}/mo
          </span>
        </div>

        {/* Summary */}
        <div style={{
          marginTop: '20px',
          padding: '20px',
          background: 'var(--dark-3)',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border-dim)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)' }}>Loan Amount</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>{formatDollars(loanAmount)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)' }}>Down Payment</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>{formatDollars(downAmount)} ({downPct}%)</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '13px', color: 'var(--white-50)', fontFamily: 'var(--font-sans)' }}>Home Price</span>
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--white)', fontFamily: 'var(--font-sans)' }}>{formatDollars(homePrice)}</span>
          </div>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '24px' }}>
          <a
            href="/buyers/mortgage-pre-approval/"
            style={{
              display: 'block',
              textAlign: 'center',
              padding: '14px 24px',
              background: 'var(--gold)',
              color: '#000',
              fontFamily: 'var(--font-sans)',
              fontWeight: 700,
              fontSize: '14px',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              borderRadius: 'var(--radius)',
              transition: 'background 0.15s',
            }}
          >
            Get Pre-Approved
          </a>
        </div>
      </div>
    </div>
  )
}
