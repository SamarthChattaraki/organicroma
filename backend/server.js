import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN =
  "EAATnH8IdLdUBQGZAsDcd0oMgRgaVXW9JmleD2mST0B56FZBg8JNpuGZCgRZBoLY8tya86CAIAY2Oti5eUcWo9g03ZBl1vLQDwIlTZAMi8lgLYir5JJ1wXchr4sRRBLilAC8WpmbckRUyf8fs2B4zfYhUGaMxQwEHPZBgFXgfD5CNS0fFElPfPxlfKxxV9ZCLdDAHMwZDZD";

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
