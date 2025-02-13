const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();

// CORS 설정 (필요에 따라 변경)
app.use(cors({ origin: true }));
app.use(express.json());

// 환경 변수 (Firebase 환경 설정에 저장 필요)
const widgetSecretKey = functions.config().toss.widget_secret;
const apiSecretKey = functions.config().toss.api_secret;

const encryptedWidgetSecretKey =
  "Basic " + Buffer.from(widgetSecretKey + ":").toString("base64");
const encryptedApiSecretKey =
  "Basic " + Buffer.from(apiSecretKey + ":").toString("base64");

// 결제위젯 승인 엔드포인트
app.post("/confirm/widget", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        orderId,
        amount,
        paymentKey,
      },
      {
        headers: {
          Authorization: encryptedWidgetSecretKey,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }
});

// 결제창 승인 엔드포인트
app.post("/confirm/payment", async (req, res) => {
  const { paymentKey, orderId, amount } = req.body;

  try {
    const response = await axios.post(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        orderId,
        amount,
        paymentKey,
      },
      {
        headers: {
          Authorization: encryptedApiSecretKey,
          "Content-Type": "application/json",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json(error.response?.data || {});
  }
});


exports.api = functions.https.onRequest(app);
