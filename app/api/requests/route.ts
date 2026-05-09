import { NextRequest, NextResponse } from 'next/server';
import { createRequest, listRequests } from '@/lib/workflow';

export async function GET() { return NextResponse.json(listRequests()); }
export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(createRequest(body), { status: 201 });
}
