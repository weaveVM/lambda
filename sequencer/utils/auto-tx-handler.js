import { evaluateTx } from "./tx.js";
import { deployContract } from "./deploy.js";
import { decodeCalldata } from "./web3-utils.js";

export async function handleTx(txid) {
  try {
    const tx = await decodeCalldata(txid);
    const data = tx.data;

    if (data.type == 2) {
      await evaluateTx(txid);
      return;
    } else if (data.type == 1) {
      await deployContract(txid);
      return;
    }
  } catch (err) {
    return { result: false };
  }
}
