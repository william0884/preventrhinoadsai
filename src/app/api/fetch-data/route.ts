// src/app/api/fetch-data/route.ts
import { NextResponse } from "next/server";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { accidentAd } from "../../../server/db/schema";
import { desc, eq } from 'drizzle-orm';
import { auth } from "@clerk/nextjs/server";
export const dynamic = 'force-dynamic';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const result = await db
      .select()
      .from(accidentAd)
      .where(eq(accidentAd.userId, userId))
      .orderBy(desc(accidentAd.id))
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 'no-store, max-age=0'
      }
  });
  } catch (err) {
    console.error(err); 
    return new NextResponse("Failed to fetch data", { status: 500 });
  }
}