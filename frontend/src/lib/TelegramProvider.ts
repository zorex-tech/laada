import { OAuthConfig, OAuthUserConfig } from "next-auth/providers/oauth";

export interface TelegramProfile extends Record<string, any> {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  auth_date: number;
}

export default function TelegramProvider<P extends TelegramProfile>(
  options: OAuthUserConfig<P>
): OAuthConfig<P> {
  return {
    id: "telegram",
    name: "Telegram",
    type: "oauth",
    authorization: {
      url: "https://telegram.org/js/telegram-widget.js",
      params: {
        bot_id: options.clientSecret,
      },
    },
    // authorization: "https://oauth.telegram.org/auth",
    // token: "https://oauth.telegram.org/access_token",
    // userinfo: "https://oauth.telegram.org/userinfo",
    profile(profile) {
      return {
        id: profile.id.toString(),
        name: `${profile.first_name} ${profile.last_name || ""}`.trim(),
        email: null,
        image: profile.photo_url,
      };
    },
    ...options,
  };
}
