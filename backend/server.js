const express = require("express");
const app = express();
const stripe = require("stripe")("YOUR_SECRET_KEY");

app.use(express.json());

app.post("/create-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "T-Shirt",
            },
            unit_amount: 1000, // Amount in cents ($10)
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ id: session.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// Start server
app.listen(3000, () => console.log("Server running on port 3000"));