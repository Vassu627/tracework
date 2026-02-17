import { generateAccessToken, verifyAccessToken } from './token.util';

describe('Token Utilities', () => {
  it('should generate and verify a valid token', () => {
    const token = generateAccessToken('user123');
    const payload = verifyAccessToken(token);

    expect(payload).not.toBeNull();
    expect(payload.userId).toBe('user123');
  });

  it('should reject tampered token', () => {
    const token = generateAccessToken('user123');
    const badToken = token + 'tampered';

    const payload = verifyAccessToken(badToken);
    expect(payload).toBeNull();
  });
});
