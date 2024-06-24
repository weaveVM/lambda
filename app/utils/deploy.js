import assert from "node:assert";
import { decodeCalldata } from "./web3-utils.js";
import { SEQUENCER_ADDRESS } from "./constants.js";
import { uploadDataToIrys } from "./irys.js";
import { psLogTransaction, psDeployContract} from "./planetscale.js";

function encodeEvmData(data) {
    const encodedData = data.split("").map((char) => char.charCodeAt(0));
    return encodedData;
  }


export async function deployContract(txid) {
  try {

    const tx = (await decodeCalldata(txid));
    const data = tx.data;
    const from = tx.from;

    assert.equal(data.type == 1, true);
    assert.equal(tx.to == SEQUENCER_ADDRESS, true);
    console.log(data);
    const sourceCode = data.sc.map((char) => String.fromCharCode(char))
    .join("");
    const initState = data.state.map((char) => String.fromCharCode(char))
    .join("");

    const parsedState = JSON.parse(initState)
    console.log(JSON.stringify(parsedState))

    // add the decoded contract data to the Contracts table
    const psdeploy = await psDeployContract(
      txid,
      sourceCode,
      JSON.stringify(parsedState),
    );
    // log the transaction in Transactions table
    const irysTxid = await uploadDataToIrys(
      txid,
      1,
      from,
      data,
    );

    console.log(irysTxid)

    const pslog = await psLogTransaction(txid, 1, irysTxid);
    if (psdeploy?.rowsAffected && pslog?.rowsAffected) {
      return { result: true };
    }
    return { result: false };

  } catch(error) {
    console.log(error)
  }
}

deployContract("0x9357462e25e9ba68c5aa3ee703a62c0d9c755852ab2e99f3e65df4603ee1e8f7")