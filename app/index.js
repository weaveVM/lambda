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
          
//             if (input.function === "test") {
//                 state.counter += 1;
//                 return { state };
//             }
          
//           }`.split("").map((char) => char.charCodeAt(0)),
//           state: `{
//             "counter": 0,
//             "owner": "0x197f818c1313DC58b32D88078ecdfB40EA822614"
//           }`.split("").map((char) => char.charCodeAt(0))
//     }

//     console.log(JSON.stringify(res))
// }

// test()

function test() {
    const inputs = '{"function": "test"}'.split("").map((char) => char.charCodeAt(0))
    const data = {
        type: 2,
        inputs: inputs,
        contract: "0x9357462e25e9ba68c5aa3ee703a62c0d9c755852ab2e99f3e65df4603ee1e8f7"

    }

    console.log(JSON.stringify(data))
}

test()