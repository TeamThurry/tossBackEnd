const service = require("./payments.service");

async function confirmPayment(req, res) {
  try {
    const confirmResponse = await service.confirmPayment(req.query);
    return res.json({ data: confirmResponse });
  } catch (error) {
    console.error("Error in confirmPayment:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = { confirmPayment };
