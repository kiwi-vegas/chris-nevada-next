import { Resend } from 'resend'
import type { ScoredArticle } from './types'

const CATEGORY_LABELS: Record<string, string> = {
  'market-update': 'Market Update',
  'buying-tips': 'Buying Tips',
  'selling-tips': 'Selling Tips',
  'community-spotlight': 'Community Spotlight',
  investment: 'Investment',
  news: 'News',
}

const CATEGORY_COLORS: Record<string, string> = {
  'market-update': '#C9A84C',
  'buying-tips': '#4CAF50',
  'selling-tips': '#2196F3',
  'community-spotlight': '#9C27B0',
  investment: '#FF9800',
  news: '#607D8B',
}

function articleCard(article: ScoredArticle, index: number): string {
  const color = CATEGORY_COLORS[article.category] ?? '#C9A84C'
  const label = CATEGORY_LABELS[article.category] ?? article.category
  return `
    <tr>
      <td style="padding: 16px 0; border-bottom: 1px solid #2a2a2a;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width: 28px; vertical-align: top; padding-top: 2px;">
              <span style="color: #C9A84C; font-size: 18px; font-weight: 700;">${index + 1}</span>
            </td>
            <td style="padding-left: 12px;">
              <span style="display: inline-block; background: ${color}22; color: ${color}; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 2px 8px; border-radius: 3px; margin-bottom: 6px;">${label}</span>
              <div style="font-size: 15px; font-weight: 600; color: #ffffff; margin-bottom: 6px; line-height: 1.4;">${article.title}</div>
              <div style="font-size: 13px; color: rgba(255,255,255,0.6); line-height: 1.6; margin-bottom: 8px;">${article.whyItMatters}</div>
              <div style="font-size: 12px; color: rgba(255,255,255,0.35);">
                ${article.source ?? ''} ${article.publishedDate ? '· ' + new Date(article.publishedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''}
                · Score: <strong style="color: #C9A84C;">${article.relevanceScore}/10</strong>
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>`
}

export async function sendDigestEmail(articles: ScoredArticle[], date: string): Promise<void> {
  const resendKey = process.env.RESEND_API_KEY
  const fromEmail = process.env.FROM_EMAIL
  const operatorEmail = process.env.OPERATOR_EMAIL
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://chris-nevada-next.vercel.app'
  const adminSecret = process.env.ADMIN_SECRET

  if (!resendKey || !fromEmail || !operatorEmail) {
    throw new Error('Missing email configuration (RESEND_API_KEY, FROM_EMAIL, or OPERATOR_EMAIL)')
  }

  const pickerUrl = `${appUrl}/admin/blog-picker/${date}?secret=${adminSecret}`
  const dateFormatted = new Date(date + 'T12:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width"></head>
<body style="margin:0;padding:0;background:#0F0F0F;font-family:Inter,-apple-system,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0F0F0F;padding:32px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="padding-bottom: 24px; border-bottom: 1px solid rgba(201,168,76,0.3);">
            <div style="font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #C9A84C; margin-bottom: 8px;">Nevada Real Estate Group · Daily Blog Digest</div>
            <div style="font-size: 22px; font-weight: 700; color: #ffffff;">${dateFormatted}</div>
            <div style="font-size: 14px; color: rgba(255,255,255,0.5); margin-top: 4px;">${articles.length} articles found · Pick 3 to publish</div>
          </td>
        </tr>

        <!-- Articles -->
        <tr>
          <td style="padding-top: 8px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              ${articles.map((a, i) => articleCard(a, i)).join('')}
            </table>
          </td>
        </tr>

        <!-- CTA -->
        <tr>
          <td style="padding: 32px 0 0;">
            <a href="${pickerUrl}" style="display:block;text-align:center;background:#C9A84C;color:#0F0F0F;font-weight:700;font-size:15px;letter-spacing:0.05em;padding:16px 32px;border-radius:4px;text-decoration:none;">
              Pick 3 Articles to Publish →
            </a>
            <div style="font-size: 11px; color: rgba(255,255,255,0.3); text-align: center; margin-top: 12px;">
              This link expires in 48 hours. Only you have access.
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="padding-top: 32px; border-top: 1px solid #1a1a1a; margin-top: 32px;">
            <div style="font-size: 11px; color: rgba(255,255,255,0.2); text-align: center;">
              Nevada Real Estate Group · Automated Blog Pipeline
            </div>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

  const resend = new Resend(resendKey)
  await resend.emails.send({
    from: fromEmail,
    to: operatorEmail,
    subject: `📰 Blog Digest — ${articles.length} articles ready to publish (${dateFormatted})`,
    html,
  })
}
