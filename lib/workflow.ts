import { seedRequests } from '@/data/demoData';
import { OpsRequest, RequestType } from '@/lib/types';

const db: OpsRequest[] = [...seedRequests];

const requiredFields: Record<RequestType, string[]> = {
  software_access: ['tool_name', 'business_justification', 'manager_name'],
  purchase_approval: ['amount', 'vendor_name', 'vendor_quote', 'business_justification'],
  travel_request: ['destination', 'dates', 'estimated_cost', 'business_purpose']
};

export function analyzeRequest(input: Record<string, string>) {
  const text = `${input.title || ''} ${input.description || ''}`.toLowerCase();
  let type: RequestType = 'software_access';
  if (text.includes('travel') || text.includes('flight')) type = 'travel_request';
  else if (text.includes('buy') || text.includes('purchase') || text.includes('vendor')) type = 'purchase_approval';

  const urgency: 'low' | 'medium' | 'high' = text.includes('urgent') || text.includes('asap') ? 'high' : text.includes('today') ? 'medium' : 'low';
  const missingFields = requiredFields[type].filter((f) => !input[f]);
  const route = type === 'software_access' ? { team: 'IT Operations', approver: 'Mia Brooks' } : type === 'purchase_approval' ? { team: 'Finance', approver: 'Noah Patel' } : { team: 'People Ops', approver: 'Ethan Rivera' };

  return {
    type,
    urgency,
    missingFields,
    fieldsComplete: missingFields.length === 0,
    routeTeam: route.team,
    approver: route.approver,
    summary: `${type.replace('_', ' ')} request from ${input.employeeName || 'employee'} routed to ${route.team}.`
  };
}

export function listRequests() { return db; }
export function getRequest(id: string) { return db.find((r) => r.id === id); }

export function createRequest(input: Record<string, string>) {
  const ai = analyzeRequest(input);
  const id = `REQ-${1000 + db.length + 1}`;
  const record: OpsRequest = {
    id,
    employeeName: input.employeeName || 'Unknown',
    department: input.department || 'Unknown',
    type: ai.type,
    title: input.title || 'Untitled Request',
    description: input.description || '',
    amount: input.amount ? Number(input.amount) : undefined,
    urgency: ai.urgency,
    fieldsComplete: ai.fieldsComplete,
    missingFields: ai.missingFields,
    approver: ai.approver,
    routeTeam: ai.routeTeam,
    summary: ai.summary,
    status: ai.fieldsComplete ? 'submitted' : 'needs_info',
    createdAt: new Date().toISOString().slice(0, 10),
    comments: [],
    history: [{ status: ai.fieldsComplete ? 'submitted' : 'needs_info', at: new Date().toISOString().slice(0, 10) }]
  };
  db.unshift(record);
  return record;
}

export function metrics() {
  const total = db.length;
  const approved = db.filter((r) => r.status === 'approved').length;
  return {
    total,
    approved,
    avgTurnaroundDays: 1.8,
    manualHandoffsReducedPct: 42,
    estimatedHoursSavedMonthly: total * 0.75,
    bottleneck: 'Purchase approvals waiting on missing vendor quote'
  };
}
