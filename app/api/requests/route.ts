import { NextRequest, NextResponse } from 'next/server';
import { createRequest, listRequests, updateRequestStatus } from '@/lib/workflow';

export async function GET() { return NextResponse.json(listRequests()); }
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(createRequest(body), { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  const updated = updateRequestStatus(body.id, body.status, body.actor || 'Approver', body.message || 'Status updated');
  if (!updated) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(updated);
}
