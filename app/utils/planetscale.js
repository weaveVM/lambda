import "dotenv/config";
import { connect } from "@planetscale/database";

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(config);

export async function psDeployContract(contractId, sourceCode, initState) {
  try {
    const results = await conn.execute(
      `INSERT INTO Contracts (ContractId, SourceCode, InitState, LatestState) VALUES ('${contractId}', '${sourceCode}', '${initState}', '${initState}')`,
      [1],
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}

export async function psLogTransaction(TxId, Type, ArweaveTxId) {
  try {
    console.log(TxId, Type, ArweaveTxId);
    const results = await conn.execute(
      `INSERT INTO Transactions (TxId, Type, ArweaveTxId) VALUES ('${TxId}', ${Type}, '${ArweaveTxId}')`,
      [1],
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function psGetState(id) {
  try {
    const results = await conn.execute(
      `SELECT LatestState from Contracts WHERE ContractId = '${id}'`,
      [1],
    );
    console.log(results.rows[0].LatestState)
    return JSON.parse(results.rows[0].LatestState);
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function psGetContract(id) {
  try {
    const results = await conn.execute(
      `SELECT * from Contracts WHERE ContractId = '${id}'`,
      [1],
    );
    return results.rows;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function psUpdateContractState(id, state) {
  try {
    const results = await conn.execute(
      `UPDATE Contracts SET LatestState = '${state}' WHERE ContractId = '${id}'`,
      [1],
    );
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
    return false;
  }
}