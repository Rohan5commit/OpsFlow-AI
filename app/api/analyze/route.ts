import { NextRequest, NextResponse } from 'next/server';
import { analyzeRequest } from '@/lib/workflow';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(analyzeRequest(body));
}
