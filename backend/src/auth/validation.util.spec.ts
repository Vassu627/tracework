import { validateEmail, validatePassword } from './validation.util';

describe('Validation Utilities', () => {
  describe('validateEmail', () => {
    const cases = [
      { input: 'test@example.com', expected: true },
      { input: 'user@domain.co', expected: true },
      { input: 'invalid-email', expected: false },
      { input: 'test@', expected: false },
      { input: '@example.com', expected: false },
      { input: '', expected: false },
      { input: null as any, expected: false },
    ];

    cases.forEach(({ input, expected }) => {
      it(`should return ${expected} for email: ${input}`, () => {
        expect(validateEmail(input)).toBe(expected);
      });
    });
  });

  describe('validatePassword', () => {
    const cases = [
      { input: 'Test123!', expected: true },
      { input: 'StrongPass1$', expected: true },

      // invalid cases
      { input: 'short1!', expected: false },      // too short
      { input: 'nouppercase1!', expected: false },
      { input: 'NOLOWERCASE1!', expected: false },
      { input: 'NoNumber!', expected: false },
      { input: 'NoSpecial123', expected: false },
      { input: '', expected: false },
      { input: null as any, expected: false },
    ];

    cases.forEach(({ input, expected }) => {
      it(`should return ${expected} for password: ${input}`, () => {
        expect(validatePassword(input)).toBe(expected);
      });
    });
  });
});
