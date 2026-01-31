import React, { useState } from "react";
import "./OrganicPage.css";

function OrderModal({ isOpen, onClose, product, quantity }) {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const vendorNumber = "917259323346"; // vendor WhatsApp number
  console.log("Sending order to backend...");

  const handleOrder = async () => {
    if (!customerName || !phone) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    const message = `🛍️ *New Order Received!*\n
*Product:* ${product.name}
*Quantity:* ${quantity}
*Customer:* ${customerName}
*Phone:* ${phone}`;

    try {
      // Send order to backend
      const response = await fetch("http://localhost:5000/send-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vendorNumber,
          message,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("✅ Your order has been placed successfully!");
        onClose();
      } else {
        alert("❌ Failed to send order. Try again.");
      }
    } catch (error) {
      console.error(error);
      alert("⚠️ Something went wrong.");
    }

    setLoading(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Complete Your Order</h2>

        <label>Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <label>Phone Number</label>
        <input
          type="number"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <label>Quantity</label>
        <input type="text" value={quantity} disabled />

        <div className="modal-actions">
          <button onClick={handleOrder} className="btn-buy" disabled={loading}>
            {loading ? "Processing..." : "Order"}
          </button>
          <button onClick={onClose} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderModal;
