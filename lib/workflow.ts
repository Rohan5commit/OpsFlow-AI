import { seedRequests } from '@/data/demoData';
import { OpsRequest, RequestStatus, RequestType } from '@/lib/types';

// Simple in-memory storage that simulates a DB
let db: OpsRequest[] = [...seedRequests];

const requiredFields: Record<RequestType, string[]> = {
  software_access: ['tool_name', 'business_justification', 'manager_name'],
  purchase_approval: ['amount', 'vendor_name', 'vendor_quote', 'business_justification'],
  travel_request: ['destination', 'dates', 'estimated_cost', 'business_purpose']
};

export function analyzeRequest(input: Record<string, string>) {
  const text = `${input.title || ''} ${input.description || ''}`.toLowerCase();
  let type: RequestType = 'software_access';
  
  if (text.match(/travel|flight|hotel|onsite/)) type = 'travel_request';
  else if (text.match(/buy|purchase|vendor|invoice|quote/)) type = 'purchase_approval';

  const urgency: 'low' | 'medium' | 'high' = text.match(/urgent|asap|blocker|security/) ? 'high' : text.match(/today|this week/) ? 'medium' : 'low';
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

export function createRequest(record: OpsRequest) {
  db.unshift(record);
  return record;
}

export function metrics() {
  const total = db.length;
  const approved = db.filter((r) => r.status === 'approved').length;
  const needsInfo = db.filter((r) => r.status === 'needs_info').length;
  
  // Dynamic ROI calculation
  const hoursSavedPerRequest = 0.75; // 45 minutes saved per automated triage
  const totalHoursSaved = total * hoursSavedPerRequest;
  
  return {
    total,
    approved,
    needsInfo,
    avgTurnaroundDays: 1.2,
    manualHandoffsReducedPct: Math.min(95, Math.round((approved / (total || 1)) * 100)),
    estimatedHoursSavedMonthly: totalHoursSaved,
    bottleneck: needsInfo > total * 0.3 ? 'High volume of requests missing critical documentation' : 'Smooth operations'
  };
}
