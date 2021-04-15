// Oak framework dependencies
export {
  Application,
  Router,
  Request,
  Response
} from "https://deno.land/x/oak/mod.ts";
  
export type {
  RouterContext
} from "https://deno.land/x/oak/mod.ts";

// Database dependencies
// export { Client } from "https://deno.land/x/postgres/mod.ts"
// export {
//     QueryClient,
//     DataType,
//     Constraint,
//     CreateTableMode,
// } from "https://deno.land/x/postquery/mod.ts"

// export type {
//     TableOptions
// } from "https://deno.land/x/postquery/mod.ts"

import type { Wallet as WalletType } from "https://cdn.skypack.dev/-/@ethersproject/wallet@v5.1.0-mpoCY8R8syeSEFVDZmv5/dist=es2020,mode=types/lib/index.d.ts";

import ethers from "https://dev.jspm.io/ethers@5.1.0";
export const Wallet = (ethers as any).Wallet as { new(): WalletType };
