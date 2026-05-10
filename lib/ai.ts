import { analyzeRequest } from '@/lib/workflow';

const NIM_URL = 'https://integrate.api.nvidia.com/v1/chat/completions';

export async function analyzeWithNim(input: Record<string, string>) {
  const fallback = analyzeRequest(input);
  const key = process.env.NVIDIA_NIM_API_KEY;
  if (!key) return { ...fallback, provider: 'local-rules' };

  try {
    const prompt = `Classify this internal ops request and return strict JSON with keys: type, urgency, missingFields, fieldsComplete, routeTeam, approver, summary. Request: ${JSON.stringify(input)}`;
    const res = await fetch(NIM_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'meta/llama-3.1-8b-instruct',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.1
      })
    });
    if (!res.ok) return { ...fallback, provider: 'local-rules' };
    const data = await res.json();
    const content = data?.choices?.[0]?.message?.content;
    const parsed = JSON.parse(content);
    return { ...fallback, ...parsed, provider: 'nvidia-nim' };
  } catch {
    return { ...fallback, provider: 'local-rules' };
  }
}
