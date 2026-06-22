import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

const FALLBACK_ASSIGNED_BY_ID = 54;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const data = await req.json();

    const baseUrl = Deno.env.get('VITE_BITRIX_WEBHOOK_URL');
    if (!baseUrl) {
      console.error('[Bitrix Lead] Missing VITE_BITRIX_WEBHOOK_URL secret');
      return Response.json({ ok: false, error: 'Missing webhook URL' }, { status: 500 });
    }

    const url = `${baseUrl.replace(/\/?$/, '/')}crm.lead.add.json`;
    const leadType = data.lead_type || 'Investor';
    const isSeller = !!data.is_seller;

    const comments = isSeller
      ? `Property Interest: ${data.property_interest || 'Not specified'}\n${data.notes || ''}\nSubmitted from: ${data.page_url || 'website'}`
      : `Investment Budget: ${data.investment_budget || 'Not specified'}\nInvestment Goal: ${data.investment_goal || 'Not specified'}\nProperty Interest: ${data.property_interest || 'Not specified'}\nSubmitted from: ${data.page_url || 'website'}`;

    const isPropertyViewing = leadType === 'Investor' && data.property_id;

    let fields;

    if (isPropertyViewing) {
      // Property viewing / inquiry payload
      const viewingComments = `Property Name: ${data.property_title || ''}\nProperty Reference: ${data.property_id || 'Not specified'}\nAssigned Agent: ${data.assigned_agent_name || 'Unassigned'}\nSubmitted from: ${data.page_url || 'website'}`;
      fields = {
        TITLE: `Website Property Inquiry: ${data.property_title || data.property_interest || ''}`,
        NAME: data.full_name,
        PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
        EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
        SOURCE_ID: 'WEB',
        ASSIGNED_BY_ID: FALLBACK_ASSIGNED_BY_ID,
        UF_CRM_1772139089925: data.property_id,
        UF_CRM_1772139069211: data.page_url || '',
        COMMENTS: viewingComments,
      };
    } else {
      // Standard investor / seller lead payload
      fields = {
        TITLE: data.title || (isSeller ? `Website Seller Inquiry: ${data.property_interest || ''}` : 'Website Investor Lead'),
        NAME: data.full_name,
        PHONE: [{ VALUE: data.phone, VALUE_TYPE: 'WORK' }],
        EMAIL: [{ VALUE: data.email, VALUE_TYPE: 'WORK' }],
        SOURCE_ID: 'WEB',
        ASSIGNED_BY_ID: FALLBACK_ASSIGNED_BY_ID,
        OPPORTUNITY: data.opportunity || undefined,
        CURRENCY_ID: 'AED',
        UF_CRM_LEAD_1774534738299: data.investment_budget,
        UF_CRM_LEAD_1774534216919: data.investment_goal,
        UF_CRM_1774618391777: data.property_interest,
        UF_CRM_1772137811136: '66',
        COMMENTS: comments,
      };
    }

    console.log('[Bitrix Lead] Sending to:', url, '| Type:', isPropertyViewing ? 'property-viewing' : leadType);

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields, params: { REGISTER_SONET_EVENT: 'Y' } }),
    });

    const responseText = await response.text();
    console.log('[Bitrix Lead] Status:', response.status, '| Body:', responseText);

    if (!response.ok) {
      return Response.json({ ok: false, status: response.status, body: responseText }, { status: 502 });
    }

    return Response.json({ ok: true, data: JSON.parse(responseText) });
  } catch (error) {
    console.error('[Bitrix Lead] Error:', error.message);
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
});