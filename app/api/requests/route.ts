import { NextRequest, NextResponse } from 'next/server';
import { createRequest, listRequests } from '@/lib/workflow';
import { analyzeWithNim } from '@/lib/ai';
import { OpsRequest } from '@/lib/types';

export async function GET() { 
  return NextResponse.json(listRequests()); 
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ai = await analyzeWithNim(body);
  
  const id = `REQ-${1000 + listRequests().length + 1}`;
  const record: OpsRequest = {
    id,
    employeeName: body.employeeName || 'Unknown',
    department: body.department || 'Unknown',
    type: ai.type,
    title: body.title || 'Untitled Request',
    description: body.description || '',
    amount: body.amount ? Number(body.amount) : undefined,
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

  const request = createRequest(record);
  return NextResponse.json(request, { status: 201 });
}
