require("dotenv").config();
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { OAuth2Client } = require("google-auth-library");
const { connectDB, getDB } = require("./database");

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET =
  process.env.JWT_SECRET || "artisan_marketplace_secret_key_2026";
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Always allow localhost for local development; add deployed frontend URLs via FRONTEND_URL env var
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nikhil-ecomm.vercel.app", // your actual Vercel URL
    ],
    credentials: true,
  }),
);
app.use(express.json());

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware: Authenticate JWT Token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, email, isArtisan
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid or expired token" });
  }
};

// Middleware: Require Artisan Role (RBAC)
const requireArtisan = (req, res, next) => {
  if (!req.user || req.user.isArtisan !== true) {
    return res
      .status(403)
      .json({ error: "Forbidden: Access restricted to Artisans only" });
  }
  next();
};

// ==================== PUBLIC ROUTES ====================

// Health Check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Express server running successfully",
    database: "MongoDB",
  });
});

// Get All Products
app.get("/api/products", async (req, res) => {
  try {
    const db = getDB();
    const products = await db.collection("products").find({}).toArray();
    res.json(products);
  } catch (err) {
    console.error("Error retrieving products:", err);
    res.status(500).json({ error: "Server error retrieving products" });
  }
});

// Search Products by query
app.get("/api/products/search", async (req, res) => {
  const query = String(req.query.query || "").trim();
  if (!query) {
    return res.json([]);
  }

  try {
    const db = getDB();
    const regex = new RegExp(query, "i");
    const products = await db
      .collection("products")
      .find({
        $or: [
          { name: regex },
          { description: regex },
          { category: regex },
          { materials: regex },
        ],
      })
      .limit(50)
      .toArray();
    res.json(products);
  } catch (err) {
    console.error("Search products error:", err);
    res.status(500).json({ error: "Server error searching products" });
  }
});

// Get Single Product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const db = getDB();
    const product = await db
      .collection("products")
      .findOne({ id: req.params.id });
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    console.error("Error retrieving product:", err);
    res.status(500).json({ error: "Server error retrieving product" });
  }
});

// User Registration
app.post("/api/auth/register", async (req, res) => {
  const { name, email, password, isArtisan } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const db = getDB();

    // Check if email already exists
    const existingUser = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: "Email is already registered" });
    }

    // Hash password securely with pure-JS bcryptjs
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // Create User Document
    const newUser = {
      id: Math.random().toString(36).substring(2, 11),
      name: name || email.split("@")[0],
      email: email.toLowerCase(),
      passwordHash,
      isArtisan: !!isArtisan,
      createdAt: new Date().toISOString(),
    };

    await db.collection("users").insertOne(newUser);

    // Create JWT Token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, isArtisan: newUser.isArtisan },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.status(201).json({
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        isArtisan: newUser.isArtisan,
      },
      token,
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error during registration" });
  }
});

// User Login
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Validate password
    const isPasswordValid = bcrypt.compareSync(password, user.passwordHash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Create JWT Token
    const token = jwt.sign(
      { id: user.id, email: user.email, isArtisan: user.isArtisan },
      JWT_SECRET,
      { expiresIn: "24h" },
    );

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        isArtisan: user.isArtisan,
      },
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error during login" });
  }
});

// User Logout
app.post("/api/auth/logout", (req, res) => {
  // In a stateless JWT system, we just send a success message to the client
  // so it can clear its local token and acknowledge the API call.
  res.json({ success: true, message: "Logged out successfully" });
});

// Forgot Password: Check if email exists
app.post("/api/auth/forgot-password", async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(404)
        .json({ error: "No account found with this email address" });
    }
    res.json({ success: true, message: "Email address verified" });
  } catch (err) {
    console.error("Forgot password error:", err);
    res.status(500).json({ error: "Server error checking email" });
  }
});

// Reset Password: Update to new password
app.post("/api/auth/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    return res
      .status(400)
      .json({ error: "Email and new password are required" });
  }

  try {
    const db = getDB();
    const user = await db
      .collection("users")
      .findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Securely hash the new password
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(newPassword, salt);

    // Update user in MongoDB
    await db
      .collection("users")
      .updateOne(
        { email: email.toLowerCase() },
        { $set: { passwordHash, updatedAt: new Date().toISOString() } },
      );

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    console.error("Reset password error:", err);
    res.status(500).json({ error: "Server error resetting password" });
  }
});

// Google Authentication: Login or register a verified Google user
app.post("/api/auth/google", async (req, res) => {
  try {
    const { credential } = req.body;

    console.log("Google login request received");
    console.log("Credential exists:", !!credential);

    if (!credential) {
      return res.status(400).json({
        error: "Google credential is required",
      });
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      return res.status(500).json({
        error: "GOOGLE_CLIENT_ID missing in server .env",
      });
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    console.log("Google payload:", payload);

    if (!payload || !payload.email) {
      return res.status(400).json({
        error: "Invalid Google token",
      });
    }

    const db = getDB();

    const email = payload.email.toLowerCase();
    const name = payload.name || email.split("@")[0];
    const googleId = payload.sub;

    let user = await db.collection("users").findOne({
      email,
    });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(2);

      const passwordHash = await bcrypt.hash(randomPassword, 10);

      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        passwordHash,
        isArtisan: false,
        authProvider: "google",
        googleId,
        createdAt: new Date().toISOString(),
      };

      await db.collection("users").insertOne(newUser);

      user = newUser;
    } else {
      await db.collection("users").updateOne(
        { email },
        {
          $set: {
            googleId,
            authProvider: "google",
          },
        },
      );

      user.googleId = googleId;
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        isArtisan: user.isArtisan,
      },
      JWT_SECRET,
      {
        expiresIn: "24h",
      },
    );

    return res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isArtisan: user.isArtisan,
      },
    });
  } catch (error) {
    console.error("Google authentication error:", error);

    return res.status(500).json({
      error: "Google authentication failed",
    });
  }
});

// ==================== AUTHENTICATED ROUTES ====================

// Get Logged In User Profile (Restore Session)
app.get("/api/auth/me", authenticateJWT, async (req, res) => {
  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ id: req.user.id });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      id: user.id,
      email: user.email,
      name: user.name,
      isArtisan: user.isArtisan,
    });
  } catch (err) {
    res.status(500).json({ error: "Server error fetching user profile" });
  }
});

// Get User's Cart
app.get("/api/cart", authenticateJWT, async (req, res) => {
  try {
    const db = getDB();
    const userCart = await db
      .collection("carts")
      .findOne({ userId: req.user.id });
    res.json(userCart ? userCart.items : []);
  } catch (err) {
    res.status(500).json({ error: "Server error retrieving cart" });
  }
});

// Sync/Save User's Cart
app.post("/api/cart", authenticateJWT, async (req, res) => {
  const { items } = req.body;

  if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Cart items must be a valid array" });
  }

  try {
    const db = getDB();
    // Upsert: update if exists, insert if not
    await db.collection("carts").updateOne(
      { userId: req.user.id },
      {
        $set: {
          userId: req.user.id,
          items,
          updatedAt: new Date().toISOString(),
        },
      },
      { upsert: true },
    );
    res.json({ success: true, message: "Cart synced successfully" });
  } catch (err) {
    console.error("Cart sync error:", err);
    res.status(500).json({ error: "Server error syncing cart" });
  }
});

// ==================== ROLE-PROTECTED ROUTES (ARTISAN ONLY) ====================

// Create New Product
app.post("/api/products", authenticateJWT, requireArtisan, async (req, res) => {
  const productData = req.body;

  // Basic validation
  if (!productData.name || !productData.price) {
    return res
      .status(400)
      .json({ error: "Product name and price are required" });
  }

  try {
    const db = getDB();
    const user = await db.collection("users").findOne({ id: req.user.id });

    // Build complete Product object
    const newProduct = {
      id: Math.random().toString(36).substring(2, 11),
      name: productData.name,
      price: Number(productData.price),
      image:
        productData.image ||
        "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      artisan: {
        name: user ? user.name : "Unknown Artisan",
        avatar: "https://i.pravatar.cc/150?img=12", // generic avatar
        id: req.user.id,
      },
      description: productData.description || "No description provided.",
      materials: Array.isArray(productData.materials)
        ? productData.materials
        : [],
      category: productData.category || "Uncategorized",
      rating: 5.0,
      reviews: 0,
      inStock: Number(productData.inStock) || 10,
      customizable: !!productData.customizable,
      images: [
        productData.image ||
          "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
      ],
      location: productData.location || "Asheville, NC",
      createdAt: new Date().toISOString(),
    };

    await db.collection("products").insertOne(newProduct);

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Create product error:", err);
    res.status(500).json({ error: "Server error creating product" });
  }
});

// ==================== START SERVER WITH MONGODB ====================

async function startServer() {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start Express server
    app.listen(PORT, () => {
      console.log(`===============================================`);
      console.log(`🚀 Artisan Marketplace Backend is running!`);
      console.log(`🌐 API Server: http://localhost:${PORT}`);
      console.log(`📌 Health check: http://localhost:${PORT}/api/health`);
      console.log(`🗄️  Database: MongoDB`);
      console.log(`===============================================`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

startServer();
