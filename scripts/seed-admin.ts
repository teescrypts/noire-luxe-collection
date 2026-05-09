import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = "mongodb://localhost:27017/noire-luxe";

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    role: String,
  },
  { timestamps: true },
);

const User = mongoose.models.User ?? mongoose.model("User", UserSchema);

async function seedAdmin() {
  await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB");

  const existing = await User.findOne({ email: "admin@noireluxe.com" });
  if (existing) {
    console.log("Admin already exists");
    await mongoose.disconnect();
    return;
  }

  const password = await bcrypt.hash("NoireLuxe2024!", 12);

  await User.create({
    firstName: "Store",
    lastName: "Owner",
    email: "admin@noireluxe.com",
    password,
    role: "admin",
  });

  console.log("✓ Admin created successfully");
  console.log("  Email:    admin@noireluxe.com");
  console.log("  Password: NoireLuxe2024!");
  console.log("  Change this password after first login!");

  await mongoose.disconnect();
}

seedAdmin().catch(console.error);
