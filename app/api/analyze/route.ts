import { NextRequest, NextResponse } from 'next/server';
import { analyzeWithNim } from '@/lib/ai';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const analysis = await analyzeWithNim(body);
    return NextResponse.json(analysis);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to analyze request' }, { status: 500 });
  }
}
