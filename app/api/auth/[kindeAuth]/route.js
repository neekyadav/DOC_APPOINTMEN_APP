// import {handleAuth} from "@kinde-oss/kinde-auth-nextjs/server";
// export const GET = handleAuth();

import { login } from '@kinde-oss/kinde-auth-nextjs/server';

export async function GET(req) {
  return login(req);
}
