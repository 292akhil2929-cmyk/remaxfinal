import { sanitize, sanitizePayload } from '@/lib/validation';

const FALLBACK_ASSIGNED_BY_ID = 54;   // Default lead routing

function getBitrixUrl() {
  const baseUrl = import.meta.env.VITE_BITRIX_WEBHOOK_URL;
  if (!baseUrl) return null;
  return `${baseUrl.replace(/\/?$/, '/')}crm.lead.add.json`;
}

async function postToBitrix(payload) {
  const url = getBitrixUrl();
  if (!url) return { ok: false, error: 'Missing VITE_BITRIX_WEBHOOK_URL' };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { ok: false, status: response.status };
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error: error?.message || 'Network error' };
  }
}

export async function sendLeadToBitrix(formData) {
  const safe = sanitizePayload(formData);

  // Safety redundancy — human-readable brief in COMMENTS
  const comments = safe.is_seller
    ? `Property Interest: ${safe.property_interest || 'Not specified'}\n${safe.notes || ''}\nSubmitted from: ${sanitize(window.location.href)}`
    : `Investment Budget: ${safe.investment_budget || 'Not specified'}\nInvestment Goal: ${safe.investment_goal || 'Not specified'}\nProperty Interest: ${safe.property_interest || 'Not specified'}\nSubmitted from: ${sanitize(window.location.href)}`;

  return postToBitrix({
    fields: {
      TITLE: safe.title || 'Website General Lead',
      NAME: safe.full_name,
      PHONE: [{ VALUE: safe.phone, VALUE_TYPE: 'WORK' }],
      EMAIL: [{ VALUE: safe.email, VALUE_TYPE: 'WORK' }],
      SOURCE_ID: 'WEB',
      ASSIGNED_BY_ID: FALLBACK_ASSIGNED_BY_ID,
      OPPORTUNITY: safe.opportunity,
      CURRENCY_ID: 'AED',
      // Custom CRM fields
      UF_CRM_LEAD_1774534738299: safe.investment_budget,
      UF_CRM_LEAD_1774534216919: safe.investment_goal,
      UF_CRM_1774618391777: safe.property_interest,
      UF_CRM_1772137811136: '66',
      COMMENTS: comments,
    },
    params: { REGISTER_SONET_EVENT: 'Y' },
  });
}

// 🌐 RECRUITMENT SPA ENDPOINT GENERATOR
function getBitrixRecruitmentUrl() {
  const baseUrl = import.meta.env.VITE_BITRIX_RECRUITMENT_WEBHOOK_URL;
  if (!baseUrl) return null;
  // ✅ Changed back to standard native crm.item.add method
  return `${baseUrl.replace(/\/?$/, '/')}crm.item.add.json`;
}

async function postToBitrixRecruitment(payload) {
  const url = getBitrixRecruitmentUrl();
  if (!url) return { ok: false, error: 'Missing VITE_BITRIX_RECRUITMENT_WEBHOOK_URL' };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return { ok: false, status: response.status };
    return { ok: true, data: await response.json() };
  } catch (error) {
    return { ok: false, error: error?.message || 'Network error' };
  }
}

export async function sendApplicantToBitrixSPA(applicantData) {
  const safe = sanitizePayload(applicantData);

  return postToBitrixRecruitment({
    entityTypeId: 1038,
    fields: {
      title: `New Applicant: ${safe.full_name}`,
      ufCrm8_1772192069412: safe.phone,
      ufCrm8_1772192889128: safe.email,
      ufCrm8_1772192916887: safe.address,
      ufCrm8_1772192939863: safe.job_title,
      ufCrm8_1772192959631: safe.nationality,
      ufCrm8_1772193001136: safe.joining_date,
      ufCrm8_1772193012616: safe.dob,
      ufCrm8_1772193028487: safe.preferred_name,
      ufCrm8_1772193037231: safe.area_of_residency,
      ufCrm8_1772193061103: safe.joining_status === 'Yes' ? '326' : '328',
      ufCrm8_1772193100078: safe.graduation_year,
      ufCrm8_1772193111039: safe.work_experience,
      ufCrm8_1772193150190: safe.has_re_experience === 'Yes' ? '330' : '332',
      ufCrm8_1772194127805: safe.gender === 'Male' ? '416' : '418',
      ufCrm8_1774869698: safe.linkedin,
      ufCrm8_1774950629779: safe.current_dubai_role,
      ufCrm8_1774950641068: safe.re_years_exp,
      ufCrm8_1774950651350: safe.current_brokerage,
      ufCrm8_1776858189: safe.notes,
    },
  });
}

export async function sendPropertyViewingToBitrix(viewingData) {
  const safe = sanitizePayload(viewingData);
  const safeUrl = sanitize(window.location.href);

  // Safety redundancy — human-readable brief in COMMENTS
  const comments = `Property Name: ${safe.property_title}\nProperty Reference: ${safe.property_id || 'Not specified'}\nAssigned Agent: ${safe.assigned_agent_name || 'Unassigned'}\nSubmitted from: ${safeUrl}`;

  return postToBitrix({
    fields: {
      TITLE: `Website Property Inquiry: ${safe.property_title}`,
      NAME: safe.full_name,
      PHONE: [{ VALUE: safe.phone, VALUE_TYPE: 'WORK' }],
      EMAIL: [{ VALUE: safe.email, VALUE_TYPE: 'WORK' }],
      SOURCE_ID: 'WEB',
      ASSIGNED_BY_ID: FALLBACK_ASSIGNED_BY_ID,
      // Custom CRM fields
      UF_CRM_1772139089925: safe.property_id,
      UF_CRM_1772139069211: safeUrl,
      COMMENTS: comments,
    },
    params: { REGISTER_SONET_EVENT: 'Y' },
  });
}