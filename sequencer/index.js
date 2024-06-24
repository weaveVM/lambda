import { createRequire } from "module";
const require = createRequire(import.meta.url);
export const ethabi = require("..");

const res = ethabi.rs_encode("weaveGM");
const res2 = ethabi.rs_decode("000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000077765617665474d00000000000000000000000000000000000000000000000000")
export const test_encode = ethabi.rs_encode;
// console.log(res2)

function test1() {
    const res = {
        type: 1,
        sc: `export async function handle(state, action) {
            const input = action.input;
          
            if (input.function === "test") {
                state.counter += 1;
                state.callers.push(lambda.msg.sender);
                return { state };
            }
          
          }`.split("").map((char) => char.charCodeAt(0)),
          state: `{
            "counter": 0,
            "callers": [],
            "owner": "0x197f818c1313DC58b32D88078ecdfB40EA822614"
          }`.split("").map((char) => char.charCodeAt(0))
    }

    console.log(JSON.stringify(res))
}

// test1()

function test() {
    const inputs = '{"function": "test"}'.split("").map((char) => char.charCodeAt(0))
    const data = {
        type: 2,
        inputs: inputs,
        contract: "0x364f6a24d3a8f4b319ac2b4f12e93b386e4257040528a69bb8419a5647ba9a74"

    }

    console.log(JSON.stringify(data))
}

// test()