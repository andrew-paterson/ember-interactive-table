export default function isEmptyObject(arg = {}) {
  return Object.entries(arg).length === 0 && typeof arg === 'object';
}