import { NextResponse } from 'next/server';
import { metrics } from '@/lib/workflow';

export async function GET() { return NextResponse.json(metrics()); }
