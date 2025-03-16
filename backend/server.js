require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

const contactRoute = require("./router/contact-route");
const connectDB = require("./utils/db");

const corsOptions = {
  origin: [
    "https://lucky-longre.onrender.com",
    "https://contact-showcase.vercel.app"
  ],
  methods: ["POST","GET"], // Ensure it's an array
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // Add if needed
};


app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/contact", contactRoute);

app.get("/", (req, res) => {
  res.send("Welcome to ShadowX API");
});
connectDB().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
  });
});
