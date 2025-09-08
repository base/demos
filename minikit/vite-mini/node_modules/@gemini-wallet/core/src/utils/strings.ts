export const hexStringFromNumber = (num: number): string =>
  `0x${BigInt(num).toString(16)}`;

export const safeJsonStringify = (obj: unknown) =>
  JSON.stringify(
    obj,
    (_, value) => (typeof value === "bigint" ? value.toString() + "n" : value),
    2,
  );
