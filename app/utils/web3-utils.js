import { ethers } from "ethers";
import { WVM_RPC_URL, SEQUENCER_ADDRESS } from "./constants.js";
import dotenv from "dotenv";
dotenv.config();

const provider = new ethers.JsonRpcProvider(WVM_RPC_URL);
const wallet = new ethers.Wallet(process.env.TEST_PK, provider);

async function postCalldata(input) {
  try {
    const calldata = ethers.hexlify(ethers.toUtf8Bytes(input));
    console.log(calldata);

    const tx = {
      to: SEQUENCER_ADDRESS,
      value: ethers.parseEther("0"),
      data: calldata,
      gasLimit: ethers.toBigInt("40000"),
      gasPrice: ethers.parseUnits("10", "gwei"),
    };
    const transactionResponse = await wallet.sendTransaction(tx);
    console.log(`Transaction sent: ${transactionResponse.hash}`);

    const receipt = await transactionResponse.wait();
    console.log(`Transaction mined in block: ${receipt.blockNumber}`);
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
}

async function decodeCalldata(txid) {
  try {
    const transaction = await provider.getTransaction(txid);

    if (transaction) {
      const calldata = transaction.data;
      const decodedData = ethers.toUtf8String(calldata);
      console.log(`Decoded calldata: ${decodedData}`);
    } else {
      console.log("Transaction not found");
    }
  } catch (error) {
    console.error(`Error decoding calldata: ${error}`);
  }
}

decodeCalldata(
  "0x6ce548e461a79683864f1d48ded8e587148bd43b19742be4b1040d68d124b86c",
);
