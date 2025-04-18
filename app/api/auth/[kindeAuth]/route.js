import { handleAuth } from '@kinde-oss/kinde-auth-nextjs/server';

export default handleAuth({
  authUrl: process.env.KINDE_ISSUER_URL,
  clientId: process.env.KINDE_CLIENT_ID,
  clientSecret: process.env.KINDE_CLIENT_SECRET,
  siteUrl: process.env.NEXTAUTH_URL,
  redirectUrl: process.env.KINDE_SITE_URL,
  postLoginRedirectUri: process.env.KINDE_POST_LOGIN_REDIRECT_URL,
  postLogoutRedirectUri: process.env.KINDE_POST_LOGOUT_REDIRECT_URL
});