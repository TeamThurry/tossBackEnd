const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const router = require("./payments.router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/sandbox-dev/api/v1/payments", router);

exports.api = functions.https.onRequest(app);
