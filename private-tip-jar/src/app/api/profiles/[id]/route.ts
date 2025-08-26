import { NextResponse } from 'next/server'
import { getProfile } from '@/lib/kv'

interface Params { params: { id: string } }

export async function GET(_: Request, { params }: Params) {
  const profile = await getProfile(params.id)
  if (!profile) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ profile })
}