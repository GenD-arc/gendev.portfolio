import { NextResponse } from "next/server";

let count = 847;
const requestTimes: number[] = [];

export async function GET() {
  const now = Date.now();

  while (requestTimes.length && requestTimes[0] < now - 10000) {
    requestTimes.shift();
  }

  if (requestTimes.length > 10) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  requestTimes.push(now);
  count += Math.random() > 0.7 ? 1 : 0;

  return NextResponse.json({ count });
}