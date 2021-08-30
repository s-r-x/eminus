// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function throttle<T extends (...args: any[]) => any>(fn: T, ms: number) {
  let timeout: NodeJS.Timeout;
  let hasTimeout = false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let lastFn: any;
  const timeoutFn = () => {
    hasTimeout = false;
    if (lastFn) {
      lastFn();
    }
    clearTimeout(timeout);
  };
  const throttled = (...args: Parameters<T>) => {
    lastFn = () => fn(...args);
    if (!hasTimeout) {
      hasTimeout = true;
      timeout = setTimeout(timeoutFn, ms);
    }
  };
  return throttled;
}
