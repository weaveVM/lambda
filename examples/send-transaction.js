import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const SEQUENCER_ADDRESS = "0x197f818c1313dc58b32d88078ecdfb40ea822614";
const WVM_RPC_URL= "https://testnet-rpc.wvm.dev"
const SEQUENCER_ENDPOINT = "https://wvm-lambda-0755acbdae90.herokuapp.com";

const provider = new ethers.JsonRpcProvider(WVM_RPC_URL);
const wallet = new ethers.Wallet(process.env.PATH_TO_YOUR_WVM_WALLET, provider);

/**
 * 
 * @param {*} input 
 * @returns hash
 */
async function postCalldata(input) {
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
    return transactionResponse.hash;
  } catch (error) {
    console.error(`Error sending transaction: ${error}`);
  }
}

/**
 * 
 * @returns transaction
 */
function prepareTransactionData() {
    const inputs = '{"function": "test"}'.split("").map((char) => char.charCodeAt(0))
    const transaction = {
        type: 2,
        inputs: inputs,
        contract: "0x364f6a24d3a8f4b319ac2b4f12e93b386e4257040528a69bb8419a5647ba9a74"

    }
    return JSON.stringify(transaction);
}

/**
 * To deploy via curl:
 * curl -X POST https://wvm-lambda-0755acbdae90.herokuapp.com/transactions -H "Content-Type: application/json" -d '{"txid":"$TXID"}'
 */
async function sendTransaction() {
    try {
        const transactionRawData = prepareTransactionData();
        const txid = await postCalldata(transactionRawData);
        const response = await axios.post(`${SEQUENCER_ENDPOINT}/transactions`, { txid });

        console.log('Transaction response:', response.data);
        return response.data;

    } catch(error) {
        console.log(error)
    }
}

sendTransaction();
