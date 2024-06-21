import Irys from "@irys/sdk";
import "dotenv/config";
import { IRYS_EVM_RPC_URL } from "./constants.js";

const getIrys = async () => {
  console.log(Irys);
  const network = "devnet";
  const token = "ethereum";

  const irys = new Irys({
    network,
    token,
    key: process.env.IRYS_WALLET_PK,
    config: { providerUrl: IRYS_EVM_RPC_URL },
  });
  return irys;
};

export async function uploadDataToIrys(
  TxId,
  Type,
  Caller,
  VersionedHash,
  Proof,
  Commitment,
  Data,
) {
  try {
    const data = { TxId, Type, Caller, VersionedHash, Proof, Commitment, Data };
    const irysConn = await getIrys();
    const tags = [
      { name: "Protocol", value: "blobvm-testnet" },
      { name: "Content-Type", value: "application/json" },
    ];
    const receipt = await irysConn.upload(JSON.stringify(data), { tags: tags });
    return receipt.id;
  } catch (error) {
    console.log(error);
    return null;
  }
}