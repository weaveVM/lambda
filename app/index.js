import { createRequire } from "module";
const require = createRequire(import.meta.url);
const ethabi = require("..");

const res = ethabi.rs_encode("weaveGM");
const res2 = ethabi.rs_decode("000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000077765617665474d00000000000000000000000000000000000000000000000000")

console.log(res2)