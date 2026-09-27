const express = require("express");

const app = express();
app.use(express.json());

const VERIFY_TOKEN =
  process.env.VERIFY_TOKEN || "TOKEN_RAHASIA_KAMU";

app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

app.post("/webhook", (req, res) => {
  console.log("Pesan masuk:");
  console.log(JSON.stringify(req.body, null, 2));

  res.sendStatus(200);
});

app.get("/", (req, res) => {
  res.send("WhatsApp Webhook MuArfiMedia aktif!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});
