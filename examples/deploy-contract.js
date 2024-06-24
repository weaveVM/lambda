import { ethers } from "ethers";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
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
function prepareContractData() {
    const transaction = {
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

    return JSON.stringify(res);
}

/**
 * To deploy via curl:
 * curl -X POST https://wvm-lambda-0755acbdae90.herokuapp.com/deploy -H "Content-Type: application/json" -d '{"txid":"$CONTRACT_ADDRESS"}'
 */
async function deployContract() {
    try {
        const contractRawData = prepareContractData();
        const contractAddress = await postCalldata(contractRawData);
        const response = await axios.post(`${SEQUENCER_ENDPOINT}/deploy`, { txid: contractAddress });

        console.log('Transaction response:', response.data);
        return response.data;

    } catch(error) {
        console.log(error)
    }
}

deployContract();