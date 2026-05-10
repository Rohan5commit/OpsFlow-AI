import { analyzeRequest } from '@/lib/workflow';

const NIM_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

export async function analyzeWithNim(input: Record<string, string>) {
  const fallback = analyzeRequest(input);
  const key = process.env.NVIDIA_NIM_API_KEY;
  if (!key) return { ...fallback, provider: 'local-rules' };

  try {
    const prompt = `
      Analyze this internal operations request and return a JSON object.
      Request: ${JSON.stringify(input)}

      Rules:
      1. Type: software_access, purchase_approval, travel_request.
      2. Urgency: low, medium, high.
      3. Missing Fields:
         - software_access: [tool_name, business_justification, manager_name]
         - purchase_approval: [amount, vendor_name, vendor_quote, business_justification]
         - travel_request: [destination, dates, estimated_cost, business_purpose]
      4. Route:
         - software_access -> IT Operations (Mia Brooks)
         - purchase_approval -> Finance (Noah Patel)
         - travel_request -> People Ops (Ethan Rivera)

      Return ONLY JSON:
      {
        "type": "...",
        "urgency": "...",
        "missingFields": [],
        "fieldsComplete": true,
        "routeTeam": "...",
        "approver": "...",
        "summary": "..."
      }
    `;

    const res = await fetch(NIM_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta/llama-3.3-70b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1,
        response_format: { type: "json_object" }
      })
    });

    if (!res.ok) return { ...fallback, provider: 'local-rules' };
    
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    
    return { 
      ...fallback, 
      ...parsed, 
      fieldsComplete: parsed.missingFields?.length === 0,
      provider: 'nvidia-nim' 
    };
  } catch (err) {
    console.error("AI Analysis error:", err);
    return { ...fallback, provider: 'local-rules' };
  }
}
