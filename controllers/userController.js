import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// database models
import User from "../database/models/User.js";

export default {
  async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("Invalid email or password");
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).send("Invalid email or password");
      }

      const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET);

      res.status(200).json({
        token,
        user: { id: user._id, name: user.name, email: user.email },
      });
    } catch (err) {
      res.status(500).send("Internal server error");
    }
  },

  async register(req, res) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const user = new User({ ...req.body, password: hashedPassword });
      await user.save();
      res.status(201).json("User created successfully");
    } catch (err) {
      res.status(400).send("Error creating user");
    }
  },

  authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extract token from Bearer token

    if (!token) {
      return res.sendStatus(401); // If no token, return Unauthorized
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403); // If token is invalid, return Forbidden
      }
      req.user = user; // Attach the user data to the request object
      next(); // Proceed to the next middleware or route
    });
  },

  async user(req, res) {
    const id = req.user.userId;

    try {
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).send("User not found");
      }
      res.json({ id: user._id, name: user.name, email: user.email });
    } catch (err) {
      res.status(500).send("Server error");
    }
  },
};
