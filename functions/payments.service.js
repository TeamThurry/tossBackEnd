const fetch = require("node-fetch");
const functions = require("firebase-functions");

// 쿼리 스트링 방식으로 클라이언트에서 요청을 보내야 함
async function confirmPayment(paymentInfo = {}) {
  const { paymentKey, orderId, amount } = paymentInfo;
  const secretKey = functions.config().toss.secret_key;

  const encryptedSecretKey =
    "Basic " + Buffer.from(secretKey + ":").toString("base64");

  try {
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        body: JSON.stringify({ orderId, amount, paymentKey }),
        headers: {
          Authorization: encryptedSecretKey,
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    // 에러가 포함된 경우 확인
    if (data.code || data.message) {
        console.error("Toss Payments API Error:", data);
        throw new Error(data.message || "Failed to confirm payment");
      }

    console.log("Toss Payments API Response:", data);
    return data;
  } catch (error) {
    console.error("Error in confirmPayment:", error);
    throw new Error("Failed to confirm payment");
  }
}

module.exports = { confirmPayment };
