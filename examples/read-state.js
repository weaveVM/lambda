import axios from "axios";

const SEQUENCER_ENDPOINT = "https://wvm-lambda-0755acbdae90.herokuapp.com";

async function readState(contract_address) {
  try {
    const state = (
      await axios.get(`${SEQUENCER_ENDPOINT}/state/${contract_address}`)
    )?.data;
    console.log(state);
    return state;
  } catch (error) {
    console.log(error);
  }
}

readState("0x364f6a24d3a8f4b319ac2b4f12e93b386e4257040528a69bb8419a5647ba9a74");
