export function validateEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;

  // simple RFC-like email pattern
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export function validatePassword(password: string): boolean {
  if (!password || typeof password !== 'string') return false;

  // At least:
  // 8 characters
  // 1 uppercase
  // 1 lowercase
  // 1 number
  // 1 special char
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;

  return regex.test(password);
}
