/** Browser-safe validators shared by the forms and the server. No Node imports here. */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const FREE_MAIL = /@(gmail|yahoo|hotmail|outlook|live|icloud|proton|protonmail|aol)\./i;
const FORBIDDEN = /(password|passwd|pwd|api[_ -]?key|secret|token)\s*[:=]/i;
const PHONE_RE = /^\+?[0-9][0-9\s().-]{6,19}$/;

export function isValidEmail(v: string) {
  return EMAIL_RE.test(v.trim());
}
export function isWorkEmail(v: string) {
  return isValidEmail(v) && !FREE_MAIL.test(v);
}
export function isValidPhone(v: string) {
  return PHONE_RE.test(v.trim());
}
export function normaliseUrl(v: string) {
  const t = v.trim();
  if (!t) return "";
  return /^https?:\/\//i.test(t) ? t : `https://${t}`;
}
export function looksLikeCredentials(v?: string) {
  return !!v && FORBIDDEN.test(v);
}
