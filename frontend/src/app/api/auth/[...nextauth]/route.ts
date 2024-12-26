// import NextAuth from "next-auth";
// import TwitterProvider from "next-auth/providers/twitter";
// import DiscordProvider from "next-auth/providers/discord";
// import { NextAuthOptions } from "next-auth";
// import TelegramProvider from "@/lib/TelegramProvider";




// if (
//   !process.env.TWITTER_CLIENT_ID ||
//   !process.env.TWITTER_CLIENT_SECRET ||
//   !process.env.DISCORD_CLIENT_ID ||
//   !process.env.DISCORD_CLIENT_SECRET ||
//   !process.env.TELEGRAM_CLIENT_ID ||
//   !process.env.TELEGRAM_CLIENT_SECRET
// ) {
//   throw new Error("Missing Twitter OAuth Credentials");
// }

// export const authOptions: NextAuthOptions = {
//   providers: [
//     TwitterProvider({
//       clientId: process.env.TWITTER_CLIENT_ID!,
//       clientSecret: process.env.TWITTER_CLIENT_SECRET!,
//       version: "2.0",
//     }),
//     DiscordProvider({
//       clientId: process.env.DISCORD_CLIENT_ID!,
//       clientSecret: process.env.DISCORD_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           scope: "identify email guilds",
//           prompt: "consent",
//         },
//       },
//     }),
//     TelegramProvider({
//       clientId: process.env.TELEGRAM_CLIENT_SECRET!.split(":")[0],
//       clientSecret: process.env.TELEGRAM_CLIENT_SECRET!,
//       // clientId: process.env.TELEGRAM_CLIENT_ID!,
//       // clientSecret: process.env.TELEGRAM_CLIENT_SECRET!,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.provider = account.provider;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken as string;
//       session.provider = token.provider as string;
//       return session;
//     },
//   },
//   debug: true,
//   // logger: {
//   //   error: (code, ...message) => {
//   //     console.error(code, message);
//   //   },
//   //   warn: (code, ...message) => {
//   //     console.warn(code, message);
//   //   },
//   //   debug: (code, ...message) => {
//   //     console.debug(code, message);
//   //   },
//   // },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);

// export { handler as GET, handler as POST };


import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

