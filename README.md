<p align="center">
  <a href="https://wvm.dev">
    <img src="https://raw.githubusercontent.com/weaveVM/.github/main/profile/bg.png">
  </a>
</p>

## Synopsis 
Lambda (læmdə, Greek: λάμ(β)δα, lám(b)da, λ) is a [smartweave](https://github.com/ArweaveTeam/SmartWeave) execution layer as rollup on top of [WeaveVM testnet](https://wvm.dev), more precisely, an [MEM](https://mem.tech) implementation. Lambda make use of WeaveVM's DA and [Arweave](https://arweave.org) permanent storage (via WeaveVM as proxy) to facilitate highly complex smart contracts beyond EVM and solidty (bytecode machine) limitations.

## Build Locally

```bash
git clone https://github.com/weavevm/lambda.git

cd lambda

npm install && npm run sequencer
```

## Lambda Terminology

[Lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus) (λ-calculus) is the foundation of [Lazy Evaluation](https://en.wikipedia.org/wiki/Lazy_evaluation), the programming language theory on which SmartWeave (and thus Lambda) is built. Therefore, we decided to name this rollup "Lambda".

## Technical Architecture
Currently, the sequencer is written in JavaScript with NAPI-rs bindings to facilitate a full transition to Rust in the near future.

## Data Protocol Design

Lambda follows the data protocol outlined in [ERC-7689](https://github.com/ethereum/ERCs/pull/380/files?short_path=76e2488#diff-76e2488af7a122c34cb7c9a212513d060730dde895baa65b1ea6fbbf4e8e6216) (smart blobs) with slight modifications. Most importantly, it shares to the same data structure for ERC-7689 [transactions](https://github.com/weaveVM/blobvm-core?tab=readme-ov-file#blobvm-transactions) (types 1 and 2).

### Data Differences

#### Data Availability

ERC-7689 describes how to utilize EIP-4844 (blobs) to create a data-computation layer. In contrast, Lambda uses transaction calldata. This difference in data availability allows Lambda to be deployed on any EVM L1s and L2s, while ERC-7689 is limited to EVMs with EIP-4844 implemented, mostly restricted to L1s.

Calldata offers Lambda a "permanent" data availability on the EVM network, while blobs are limited to ~14 days of availability.


#### Data Archiving Transactions

This section outlines the format used by the lambda sequencer to push data to Arweave. The sequencer interfaces with Arweave using [Irys](https://irys.xyz). When indexing data from lambda into Arweave, the following JSON format is utilized to construct the tx data:

```json
{
  "TxId": "L1_txid",
  "Type": "1 or 2",
  "Caller": "tx_caller",
  "Data": "tx_calldata"
}
```

#### Lambda Context

The Lambda context is injected by the sequencer during the lazy evaluation of a transaction. It provides a suite of useful APIs that are accessible during execution and the retroactive lazy evaluation:

| method  | description | status |
| :-------------: |:-------------:|:-------------:|
| `lambda.msg.sender` | return the transaction sender (EOA)     |  supported       |
| `lambda.tx.id`      | return the call's transaction id     |  supported       |

## Examples

#### Contract source code
```js
export async function handle(state, action) {
  const input = action.input;

  if (input.function === "increment") {
    state.counter += 1;
    state.users.push(lambda.msg.sender);
    return { state };
  }
}
```

#### Contract initial state
```json
{
  "counter": 0,
  "users": []
}
```

## Lambda Sequencer


#### Testnet sequencer endpoint: https://lambda.pink

### Methods

#### Transaction Type 1: deploy contract

```bash
curl -X POST https://wvm-lambda-0755acbdae90.herokuapp.com/deploy -H "Content-Type: application/json" -d '{"txid":"$CONTRACT_ADDRESS"}'
```

#### Transaction Type 2: send interaction
```bash
curl -X POST https://wvm-lambda-0755acbdae90.herokuapp.com/transactions -H "Content-Type: application/json" -d '{"txid":"$INTERACTION_TXID"}'
```

#### Type Agnostic Method: handles both types 1 and 2 automatically


```bash
curl -X POST https://wvm-lambda-0755acbdae90.herokuapp.com/tx -H "Content-Type: application/json" -d '{"txid":"$TXID"}'
```

For more code examples on how to interact with the Lambda sequencer (deploying contracts, sending interactions, reading state), check the code snippets available in [examples](./examples).

## License
This repository is licensed under the [MIT License](./LICENSE).
