import { ethers } from "ethers";
import { WVM_RPC_URL, SEQUENCER_ADDRESS } from "./constants.js";
import dotenv from "dotenv";

dotenv.config();
const provider = new ethers.JsonRpcProvider(WVM_RPC_URL);
const wallet = new ethers.Wallet(process.env.TEST_PK, provider);

export async function postCalldata(input) {
  try {
    const calldata = ethers.hexlify(ethers.toUtf8Bytes(input));
    console.log(calldata);

    const tx = {
      to: SEQUENCER_ADDRESS,
      value: ethers.parseEther("0"),
      data: calldata,
      gasLimit: ethers.toBigInt("5000000"),
      gasPrice: ethers.parseUnits("100", "gwei"),
    };
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log(`Transaction sent: ${transactionResponse.hash}`);
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
}

export async function decodeCalldata(txid) {
  try {
    const transaction = await provider.getTransaction(txid);

    if (transaction) {
      const calldata = transaction.data;
      const decodedData = ethers.toUtf8String(calldata);

      const res = {
        from: transaction.from,
        to: transaction.to,
        data: JSON.parse(decodedData)
      }

      console.log(res);
      return res;
    } else {
      console.log("Transaction not found");
    }
  } catch (error) {
    console.error(`Error decoding calldata: ${error}`);
  }
}

// decodeCalldata(
//   "0xad1ac2f2aa22c97174c738bdb652be0350329e6e0e973bc213fd0279e1f80789",
// );


// postCalldata('{"type":1,"sc":[101,120,112,111,114,116,32,97,115,121,110,99,32,102,117,110,99,116,105,111,110,32,104,97,110,100,108,101,40,115,116,97,116,101,44,32,97,99,116,105,111,110,41,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,105,110,112,117,116,32,61,32,97,99,116,105,111,110,46,105,110,112,117,116,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,105,102,32,40,105,110,112,117,116,46,102,117,110,99,116,105,111,110,32,61,61,61,32,34,109,105,110,116,34,41,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,123,32,97,109,111,117,110,116,32,125,32,61,32,105,110,112,117,116,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,67,111,110,116,114,97,99,116,65,115,115,101,114,116,40,98,108,111,98,118,109,46,109,115,103,46,115,101,110,100,101,114,32,61,61,61,32,115,116,97,116,101,46,111,119,110,101,114,44,32,34,101,114,114,95,105,110,118,97,108,105,100,95,99,97,108,108,101,114,34,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,110,101,119,79,119,110,101,114,66,97,108,97,110,99,101,32,61,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,66,105,103,73,110,116,40,97,109,111,117,110,116,41,32,43,32,66,105,103,73,110,116,40,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,115,116,97,116,101,46,111,119,110,101,114,93,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,115,116,97,116,101,46,111,119,110,101,114,93,32,61,32,83,116,114,105,110,103,40,110,101,119,79,119,110,101,114,66,97,108,97,110,99,101,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,114,101,116,117,114,110,32,123,32,115,116,97,116,101,32,125,59,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,105,102,32,40,105,110,112,117,116,46,102,117,110,99,116,105,111,110,32,61,61,61,32,34,116,114,97,110,115,102,101,114,34,41,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,123,32,116,97,114,103,101,116,44,32,97,109,111,117,110,116,32,125,32,61,32,105,110,112,117,116,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,67,111,110,116,114,97,99,116,65,115,115,101,114,116,40,98,108,111,98,118,109,46,109,115,103,46,115,101,110,100,101,114,32,105,110,32,115,116,97,116,101,46,98,97,108,97,110,99,101,115,44,32,34,101,114,114,95,99,97,108,108,101,114,95,110,111,116,95,102,111,117,110,100,34,41,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,98,105,110,116,65,109,111,117,110,116,32,61,32,66,105,103,73,110,116,40,97,109,111,117,110,116,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,99,97,108,108,101,114,66,97,108,97,110,99,101,32,61,32,66,105,103,73,110,116,40,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,98,108,111,98,118,109,46,109,115,103,46,115,101,110,100,101,114,93,41,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,67,111,110,116,114,97,99,116,65,115,115,101,114,116,40,47,94,48,120,91,97,45,102,65,45,70,48,45,57,93,123,52,48,125,36,47,46,116,101,115,116,40,116,97,114,103,101,116,41,44,32,34,101,114,114,95,105,110,118,97,108,105,100,95,97,100,100,114,101,115,115,34,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,67,111,110,116,114,97,99,116,65,115,115,101,114,116,40,99,97,108,108,101,114,66,97,108,97,110,99,101,32,62,61,32,98,105,110,116,65,109,111,117,110,116,44,32,34,101,114,114,95,105,110,118,97,108,105,100,95,97,109,111,117,110,116,34,41,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,105,102,32,40,33,40,116,97,114,103,101,116,32,105,110,32,115,116,97,116,101,46,98,97,108,97,110,99,101,115,41,41,32,123,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,116,97,114,103,101,116,93,32,61,32,66,105,103,73,110,116,40,48,110,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,110,101,119,84,97,114,103,101,116,66,97,108,97,110,99,101,32,61,32,98,105,110,116,65,109,111,117,110,116,32,43,32,66,105,103,73,110,116,40,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,116,97,114,103,101,116,93,41,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,116,97,114,103,101,116,93,32,61,32,83,116,114,105,110,103,40,110,101,119,84,97,114,103,101,116,66,97,108,97,110,99,101,41,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,99,111,110,115,116,32,110,101,119,67,97,108,108,101,114,66,97,108,97,110,99,101,32,61,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,66,105,103,73,110,116,40,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,98,108,111,98,118,109,46,109,115,103,46,115,101,110,100,101,114,93,41,32,45,32,98,105,110,116,65,109,111,117,110,116,59,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,115,116,97,116,101,46,98,97,108,97,110,99,101,115,91,98,108,111,98,118,109,46,109,115,103,46,115,101,110,100,101,114,93,32,61,32,83,116,114,105,110,103,40,110,101,119,67,97,108,108,101,114,66,97,108,97,110,99,101,41,59,10,32,32,32,32,32,32,32,32,32,32,10,32,32,32,32,32,32,32,32,32,32,32,32,32,32,114,101,116,117,114,110,32,123,32,115,116,97,116,101,32,125,59,10,32,32,32,32,32,32,32,32,32,32,32,32,125,10,32,32,32,32,32,32,32,32,32,32,125],"state":[123,10,32,32,32,32,32,32,32,32,32,32,32,32,34,116,105,99,107,101,114,34,58,32,34,83,77,65,82,84,66,76,79,66,34,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,100,101,99,105,109,97,108,115,34,58,32,49,56,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,98,97,108,97,110,99,101,115,34,58,32,123,125,44,10,32,32,32,32,32,32,32,32,32,32,32,32,34,111,119,110,101,114,34,58,32,34,48,120,49,57,55,102,56,49,56,99,49,51,49,51,68,67,53,56,98,51,50,68,56,56,48,55,56,101,99,100,102,66,52,48,69,65,56,50,50,54,49,52,34,10,32,32,32,32,32,32,32,32,32,32,125]}')
