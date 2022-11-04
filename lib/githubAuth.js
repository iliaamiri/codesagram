// generate random token
import crypto from 'crypto'

export function getUrlRequestUserGitHubIdentity() {
  console.log(process.env.NEXT_PUBLIC_GITHUB_ID)
  const params = {
    client_id: process.env.NEXT_PUBLIC_GITHUB_ID,
    redirect_uri: process.env.NEXT_PUBLIC_GITHUB_REDIRECT_URI,
    scope: "read:user",
    allow_signup: "true",
    state: crypto.randomBytes(48).toString('hex'),
  };

  const stringifiedParams = Object.entries(params)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `https://github.com/login/oauth/authorize?${stringifiedParams}`;
}