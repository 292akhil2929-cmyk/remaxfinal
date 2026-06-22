import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // Parse applicant data from request body
    const applicantData = await req.json();

    // Read secret securely from server environment
    const baseUrl = Deno.env.get('VITE_BITRIX_RECRUITMENT_WEBHOOK_URL');
    if (!baseUrl) {
      console.error('[Bitrix Recruitment] Missing VITE_BITRIX_RECRUITMENT_WEBHOOK_URL secret');
      return Response.json({ ok: false, error: 'Missing recruitment webhook URL' }, { status: 500 });
    }

    const url = `${baseUrl.replace(/\/?$/, '/')}crm.item.add.json`;

    const safe = applicantData;

    const payload = {
      entityTypeId: 1038,
      fields: {
        title: `New Applicant: ${safe.full_name || ''}`,
        ufCrm8_1772192069412: safe.phone,
        ufCrm8_1772192889128: safe.email,
        ufCrm8_1772192916887: safe.address || safe.full_address,
        ufCrm8_1772192939863: safe.job_title,
        ufCrm8_1772192959631: safe.nationality,
        ufCrm8_1772193001136: safe.joining_date || safe.target_joining_date,
        ufCrm8_1772193012616: safe.dob,
        ufCrm8_1772193028487: safe.preferred_name,
        ufCrm8_1772193037231: safe.area_of_residency,
        ufCrm8_1772193061103: safe.joining_status === 'Yes' ? '326' : '328',
        ufCrm8_1772193100078: safe.graduation_year,
        ufCrm8_1772193111039: safe.work_experience,
        ufCrm8_1772193150190: safe.has_re_experience === 'Yes' || safe.has_real_estate_experience === 'Yes' ? '330' : '332',
        ufCrm8_1772194127805: safe.gender === 'Male' ? '416' : '418',
        ufCrm8_1774869698: safe.linkedin || safe.linkedin_url,
        ufCrm8_1774950629779: safe.current_dubai_role || safe.current_role_dubai,
        ufCrm8_1774950641068: safe.re_years_exp || safe.years_in_real_estate,
        ufCrm8_1774950651350: safe.current_brokerage,
        ufCrm8_1776858189: safe.notes,
      },
    };

    console.log('[Bitrix Recruitment] Sending to:', url);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const responseText = await response.text();
    console.log('[Bitrix Recruitment] Response status:', response.status);
    console.log('[Bitrix Recruitment] Response body:', responseText);

    if (!response.ok) {
      return Response.json({ ok: false, status: response.status, body: responseText }, { status: 502 });
    }

    return Response.json({ ok: true, data: JSON.parse(responseText) });
  } catch (error) {
    console.error('[Bitrix Recruitment] Error:', error.message);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
});