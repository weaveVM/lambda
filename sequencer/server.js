import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import { deployContract } from "./utils/deploy.js";
import { evaluateTx } from "./utils/tx.js";
import { psGetState } from "./utils/planetscale.js";
import { handleTx } from "./utils/auto-tx-handler.js";

const app = express();
const port = process.env.PORT || 3000;

app.use(
  bodyParser.urlencoded({
    limit: "200mb",
    extended: false,
  }),
);
app.use(bodyParser.json({ limit: "200mb" }));

app.use(function (req, res, next) {
  req.setTimeout(500000, function () {});
  next();
});

app.use((err, req, res, next) => {
  console.error("An error occurred:", err);
  res.status(500).json({ error: "An internal server error occurred." });
});

app.use(
  cors({
    origin: "*",
  }),
);

app.get("/state/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await psGetState(id);
    console.log(data)
    res.json(data);
  } catch (error) {
    console.log(error);
    return {error: "invalid_contract_address"}
  }
});

app.post("/deploy", async (req, res) => {
  try {
    const { txid } = req.body;

    const tx = await deployContract(txid);

    res.send(tx);
  } catch (error) {
    console.log(error);
    return {result: false}
  }
});

app.post("/transactions", async (req, res) => {
  try {
    const { txid } = req.body;

    const tx = await evaluateTx(txid);

    res.send(tx);
  } catch (error) {
    console.log(error);
    return {result: false}
  }
});

// auto tx handler, type agnostic (handles both type 1 and 2)
app.post("/tx", async (req, res) => {
  try {
    const { txid, bulk, txs } = req.body;
    console.log(`/tx`, req.body);

    // TODO: Handle dissapointments
    if(bulk) {
      const all = txs.map((tx) => handleTx(tx));
      const wait = await Promise.allSettled(all);
      res.send({ result: wait.status === "fulfilled" });
    } else {
      const tx = await handleTx(txid);
      res.send(tx);
    }
  } catch (error) {
    console.log(error);
    return {result: false}
  }
});


app.listen(port, () => console.log("Server started"));