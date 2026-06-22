import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const SALES_TEAM_EMAIL = 'info@remaxzam.ae'; // Update to your sales team distribution email

const SIGNING_SECRET = Deno.env.get('BASE44_FUNCTIONS_SIGNING_SECRET') || '';
const TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000;

function normalizeSignature(signature) {
  if (!signature || typeof signature !== 'string') return '';
  return signature.startsWith('sha256=') ? signature.slice(7) : signature;
}

function timingSafeEqual(a, b) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i += 1) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

async function verifySignedRequest(req, bodyText) {
  if (!SIGNING_SECRET) return false;
  const signature = normalizeSignature(req.headers.get('x-base44-signature'));
  const timestamp = req.headers.get('x-base44-timestamp');
  if (!signature || !timestamp) return false;
  const ts = Number(timestamp);
  if (!Number.isFinite(ts)) return false;
  if (Math.abs(Date.now() - ts) > TIMESTAMP_TOLERANCE_MS) return false;

  const payload = `${timestamp}.${bodyText}`;
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(SIGNING_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(payload));
  const signatureHex = [...new Uint8Array(signatureBuffer)]
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
  return timingSafeEqual(signatureHex, signature);
}

Deno.serve(async (req) => {
  try {
    if (req.method !== 'POST') {
      return Response.json({ error: 'Method not allowed' }, { status: 405 });
    }

    const bodyText = await req.text();
    const base44 = createClientFromRequest(req);
    let user = null;
    try {
      user = await base44.auth.me();
    } catch (_) {
      user = null;
    }

    const isAdmin = !!user && user.role === 'admin';
    const isSigned = !isAdmin && (await verifySignedRequest(req, bodyText));

    if (!isAdmin && !isSigned) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = bodyText ? JSON.parse(bodyText) : {};

    const lead = body.data || {};

    const subject = `🏠 New Lead: ${lead.full_name || 'Unknown'} — ${lead.lead_type || 'Inquiry'}`;

    const emailBody = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
  <div style="background: #1a3a5c; padding: 20px 24px; border-radius: 8px 8px 0 0;">
    <h2 style="color: #ffffff; margin: 0; font-size: 18px;">New Lead Received — RE/MAX Zam</h2>
  </div>
  <div style="background: #ffffff; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-size: 13px; width: 40%;">Name</td>
        <td style="padding: 8px 0; color: #111827; font-weight: 600; font-size: 13px;">${lead.full_name || '—'}</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 8px; color: #6b7280; font-size: 13px;">Email</td>
        <td style="padding: 8px; color: #111827; font-size: 13px;">${lead.email || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Phone</td>
        <td style="padding: 8px 0; color: #111827; font-size: 13px;">${lead.phone || '—'}</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 8px; color: #6b7280; font-size: 13px;">Country</td>
        <td style="padding: 8px; color: #111827; font-size: 13px;">${lead.country || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Lead Type</td>
        <td style="padding: 8px 0; font-size: 13px;"><span style="background: #dbeafe; color: #1d4ed8; padding: 2px 8px; border-radius: 12px; font-size: 12px; font-weight: 600;">${lead.lead_type || '—'}</span></td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 8px; color: #6b7280; font-size: 13px;">Investment Budget</td>
        <td style="padding: 8px; color: #111827; font-size: 13px;">${lead.investment_budget || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Investment Goal</td>
        <td style="padding: 8px 0; color: #111827; font-size: 13px;">${lead.investment_goal || '—'}</td>
      </tr>
      <tr style="background: #f9fafb;">
        <td style="padding: 8px; color: #6b7280; font-size: 13px;">Property Interest</td>
        <td style="padding: 8px; color: #111827; font-size: 13px;">${lead.property_interest || '—'}</td>
      </tr>
      <tr>
        <td style="padding: 8px 0; color: #6b7280; font-size: 13px;">Source</td>
        <td style="padding: 8px 0; color: #111827; font-size: 13px;">${lead.source || '—'}</td>
      </tr>
      ${lead.notes ? `
      <tr style="background: #f9fafb;">
        <td style="padding: 8px; color: #6b7280; font-size: 13px; vertical-align: top;">Notes</td>
        <td style="padding: 8px; color: #111827; font-size: 13px;">${lead.notes}</td>
      </tr>` : ''}
    </table>
    <div style="margin-top: 20px; padding: 12px 16px; background: #fef3c7; border-radius: 6px; border-left: 4px solid #f59e0b;">
      <p style="margin: 0; color: #92400e; font-size: 13px; font-weight: 600;">⚡ Action Required: Please contact this lead within 1 hour for best conversion rates.</p>
    </div>
    <p style="margin-top: 16px; color: #9ca3af; font-size: 11px; text-align: center;">
      Submitted: ${new Date().toLocaleString('en-AE', { timeZone: 'Asia/Dubai' })} (Dubai time)
    </p>
  </div>
</div>
    `.trim();

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: SALES_TEAM_EMAIL,
      from_name: 'RE/MAX ZAM Leads',
      subject,
      body: emailBody,
    });

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});