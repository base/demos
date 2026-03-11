export const BACK = "__BACK__" as const;

export type BackValue = typeof BACK;
export type Backable<T> = T | BackValue;

export function isBack<T>(value: Backable<T>): value is BackValue {
  return value === BACK;
}
