import axios from "axios";
import assert from "node:assert";
import {
  psLogTransaction,
  psGetContract,
  psUpdateContractState,
} from "./planetscale.js";
import { uploadDataToIrys } from "./irys.js";
import { MEM_SIMULATE_ENDPOINT } from "./constants.js";
import { decodeCalldata } from "./web3-utils.js";

export async function evaluateTx(txid) {
  try {
    const tx = (await decodeCalldata(txid));
    console.log(tx)
    
    const data = tx.data;
    const from = tx.from;
    console.log(data, from)
    console.log(data.type)

    assert.equal(data.type == 2, true);
    const interaction = JSON.parse(
      data.inputs.map((char) => String.fromCharCode(char)).join(""),
    );
    console.log(interaction)
    const targetContract = data.contract;
    console.log(targetContract)

    const contract = (await psGetContract(targetContract))?.[0];
    console.log(contract)

    const normalizedString = contract.SourceCode.replace(/\r\n/g, "");

    const normalizedSourceCode = normalizedString.split("").join("");

    const code = `const msg = {}; msg.sender = "${from}"; const tx = {}; tx.id = "${txid}"; const lambda = {msg, tx}; `.concat(
      normalizedSourceCode,
    );

    console.log(code)
    const state = contract.LatestState;

    const newState = await testBlobEvaluate(
      code,
      JSON.stringify(JSON.parse(state)),
      JSON.stringify(interaction),
    );

    console.log(newState)
    if (!newState.length) {
      return { result: false };
    }
    const irysTxid = await uploadDataToIrys(
      txid,
      2,
      from,
      data,
    );
    if (!irysTxid) {
      return { result: false };
    }

    const pslog = await psLogTransaction(txid, 2, irysTxid);

    if (!pslog) {
      return { result: false };
    }

    const updateState = await psUpdateContractState(targetContract, newState);
    if (!updateState) {
      return { result: false };
    }

    if (updateState?.rowsAffected && pslog?.rowsAffected) {
      return { result: true };
    }
    return { result: false };
  } catch (error) {
    return { result: false };
  }
}

async function testBlobEvaluate(sc, state, tx) {
  try {
    const options = {
      contractType: 0,
      initState: state,
      input: tx,
      contractSrc: sc,
    };

    const result = await axios.post(MEM_SIMULATE_ENDPOINT, options);
    console.log(result)

    return JSON.stringify(result.data.state);
  } catch (error) {
    console.log(error);
    return "";
  }
}

// evaluateTx("0x44ca4ea99366225b4bf4a2912d7f7b0361c3f6a30967e6994af5310d22398ecc")
