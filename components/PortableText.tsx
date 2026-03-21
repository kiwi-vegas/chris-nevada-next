import { PortableText as SanityPortableText } from 'next-sanity'

const components = {
  block: {
    normal: ({ children }: any) => (
      <p style={{ fontSize: '16px', color: 'var(--white-70)', lineHeight: 1.8, marginBottom: '20px' }}>
        {children}
      </p>
    ),
    h2: ({ children }: any) => (
      <h2 style={{ fontFamily: 'var(--font-serif)', color: 'var(--white)', marginBottom: '16px' }}>
        {children}
      </h2>
    ),
    h3: ({ children }: any) => (
      <h3 style={{ fontFamily: 'var(--font-serif)', color: 'var(--white)', marginBottom: '12px' }}>
        {children}
      </h3>
    ),
  },
  marks: {
    strong: ({ children }: any) => <strong style={{ color: 'var(--white)', fontWeight: 600 }}>{children}</strong>,
    em: ({ children }: any) => <em style={{ color: 'var(--gold-light)' }}>{children}</em>,
  },
}

export default function PortableText({ value }: { value: any[] }) {
  return <SanityPortableText value={value} components={components} />
}
