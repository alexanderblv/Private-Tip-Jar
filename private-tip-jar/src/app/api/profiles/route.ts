import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { listProfiles, saveProfile, type WorkerProfile } from '@/lib/kv'

const ProfileInput = z.object({
  id: z.string().min(3),
  address: z.string().min(3),
  name: z.string().min(1),
  bio: z.string().optional(),
  avatarUrl: z.string().url().optional(),
})

export async function GET() {
  const profiles = await listProfiles()
  return NextResponse.json({ profiles })
}

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null)
  const parsed = ProfileInput.safeParse(json)
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid payload', issues: parsed.error.issues }, { status: 400 })
  }
  const payload = parsed.data
  const profile: WorkerProfile = {
    ...payload,
    createdAt: Date.now(),
  }
  await saveProfile(profile)
  return NextResponse.json({ profile }, { status: 201 })
}