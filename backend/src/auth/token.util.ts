import * as crypto from 'crypto';

const SECRET = 'supersecretkey'; // later move to env
const ACCESS_TOKEN_EXPIRY = 15 * 60; // 15 minutes (seconds)

function base64url(input: string) {
  return Buffer.from(input)
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export function generateAccessToken(userId: string): string {
  const payload = {
    userId,
    exp: Math.floor(Date.now() / 1000) + ACCESS_TOKEN_EXPIRY,
  };

  const payloadStr = JSON.stringify(payload);
  const encodedPayload = base64url(payloadStr);

  const signature = crypto
    .createHmac('sha256', SECRET)
    .update(encodedPayload)
    .digest('base64url');

  return `${encodedPayload}.${signature}`;
}

export function verifyAccessToken(token: string) {
  try {
    const [encodedPayload, signature] = token.split('.');

    const expectedSignature = crypto
      .createHmac('sha256', SECRET)
      .update(encodedPayload)
      .digest('base64url');

    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64').toString(),
    );

    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
