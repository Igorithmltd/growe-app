// global.d.ts
export {};

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: import("mongoose").Connection | null;
    promise: Promise<import("mongoose").Connection> | null;
  } | undefined;
}
