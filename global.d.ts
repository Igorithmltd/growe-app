// global.d.ts
declare global {
    const mongoose: {
      conn: any;
      promise: Promise<any> | null;
    };
  }
  
  export {};
  