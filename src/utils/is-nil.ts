export function isNil<T>(value: T): boolean {
  return typeof value === 'undefined' || value === null;
}
