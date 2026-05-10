import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithNim } from '@/lib/ai';

export async function POST(req: NextRequest) {
  const body = await req.json();
  return NextResponse.json(await analyzeWithNim(body));
}
