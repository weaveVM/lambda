import { createRequire } from "module";
const require = createRequire(import.meta.url);
export const ethabi = require("..");

const res = ethabi.rs_encode("weaveGM");
const res2 = ethabi.rs_decode("000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000077765617665474d00000000000000000000000000000000000000000000000000")
export const test_encode = ethabi.rs_encode;
// console.log(res2)

// function test() {
//     const res = {
//         type: 1,
//         sc: `export async function handle(state, action) {
//             const input = action.input;
          
//             if (input.function === "mint") {
//               const { amount } = input;
//               ContractAssert(blobvm.msg.sender === state.owner, "err_invalid_caller");
//               const newOwnerBalance =
//                 BigInt(amount) + BigInt(state.balances[state.owner]);
//               state.balances[state.owner] = String(newOwnerBalance);
//               return { state };
//             }
          
//             if (input.function === "transfer") {
//               const { target, amount } = input;
          
//               ContractAssert(blobvm.msg.sender in state.balances, "err_caller_not_found");
          
//               const bintAmount = BigInt(amount);
//               const callerBalance = BigInt(state.balances[blobvm.msg.sender]);
          
//               ContractAssert(/^0x[a-fA-F0-9]{40}$/.test(target), "err_invalid_address");
//               ContractAssert(callerBalance >= bintAmount, "err_invalid_amount");
          
//               if (!(target in state.balances)) {
//                 state.balances[target] = BigInt(0n);
//               }
          
//               const newTargetBalance = bintAmount + BigInt(state.balances[target]);
//               state.balances[target] = String(newTargetBalance);
          
//               const newCallerBalance =
//                 BigInt(state.balances[blobvm.msg.sender]) - bintAmount;
//               state.balances[blobvm.msg.sender] = String(newCallerBalance);
          
//               return { state };
//             }
//           }`.split("").map((char) => char.charCodeAt(0)),
//           state: `{
//             "ticker": "SMARTBLOB",
//             "decimals": 18,
//             "balances": {},
//             "owner": "0x197f818c1313DC58b32D88078ecdfB40EA822614"
//           }`.split("").map((char) => char.charCodeAt(0))
//     }

//     console.log(JSON.stringify(res))
// }

// test()