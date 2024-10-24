import dotenv from "dotenv";
import express from "express";
import http from "http";
import cors from "cors";

// Load environment variables
dotenv.config();

import IO from "./socket.io/index.js";
import routes from "./routes/index.js";
import connect from "./database/connect.js";

// database connection
connect(process.env.DATABASE_URI);

// utils
const app = express();
const server = http.createServer(app);

// Middleware to parse JSON bodies
app.use(express.json());

// cors
app.use(cors());

// Socket.io setup
IO(server);

// Start the server
const PORT = process.env.PORT || 3000; // Access environment variables
server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

// Routes
app.get("/", (req, res) => res.end("working..."));
app.use("/api", routes);
