export function isEmpty<T>(value?: T[]): boolean {
  return !(value && value.length > 0);
}
