import type { NimSafeAny } from '@/types';

export function stringify(data: NimSafeAny): string {
  return JSON.stringify(data);
}

export function parse<T = NimSafeAny>(data: string): T | null {
  return JSON.parse(data) as T | null;
}
