import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = new URLSearchParams(searchParams);
  return NextResponse.redirect(
    new URL(`/auth/confirm?${params.toString()}`, request.url)
  );
}
