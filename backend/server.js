import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN =
  "EAATnH8IdLdUBP0GIZACpPMohI1bfVZBjfZB15U6FG8f3EylJEpmfc8bRHaopobKuW7aI5IaDklH6AZAOuoIXEZCl6AlRJ9lGZCU57QqLBwznH71EoAeZB51Gu5nWGrnyOoVaSpR9zkE7XXnWevgu9OE0FQcrTiZCMOIKC6cX0diIHZBioHCjoPDBTxgHbxmbeZAuoXbQZDZDs";

const PHONE_NUMBER_ID = "903734079484245";

app.post("/send-order", async (req, res) => {
  let { vendorNumber, message } = req.body;

  // Remove "+" if it exists
  vendorNumber = vendorNumber.replace("+", "");

  try {
    const response = await axios.post(
      `https://graph.facebook.com/v20.0/${PHONE_NUMBER_ID}/messages`,
      {
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: vendorNumber,
        type: "text",
        text: { body: message },
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("WhatsApp API response:", response.data);

    res.json({ success: true, message: "Message sent to vendor!" });
  } catch (error) {
    console.error("WHATSAPP ERROR:", error.response?.data || error);
    res.status(500).json({ success: false, error: error.response?.data });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));
