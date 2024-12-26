import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    {
      hasDiscordId: !!process.env.DISCORD_CLIENT_ID,
      hasDiscordSecret: !!process.env.DISCORD_CLIENT_SECRET,
      hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
      hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
      nextAuthUrl: process.env.NEXTAUTH_URL,
      discordClientIdLength: process.env.DISCORD_CLIENT_ID?.length || 0,
    },
    {
      status: 200,
    }
  );
}
