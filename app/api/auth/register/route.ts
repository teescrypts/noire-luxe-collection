import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, setAuthCookie } from "@/lib/auth";
import { validateRegister } from "@/lib/validation";

export async function POST(request: NextRequest) {
  try {
    const { firstName, lastName, email, password } = await request.json();

    const { valid, errors } = validateRegister({
      firstName,
      lastName,
      email,
      password,
    });

    if (!valid) {
      return NextResponse.json({ error: errors[0].message }, { status: 400 });
    }

    // Validate
    // if (!firstName || !lastName || !email || !password) {
    //   return NextResponse.json(
    //     { error: "All fields are required." },
    //     { status: 400 },
    //   );
    // }

    // if (password.length < 8) {
    //   return NextResponse.json(
    //     { error: "Password must be at least 8 characters." },
    //     { status: 400 },
    //   );
    // }

    await connectDB();

    // Check if email already exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 },
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "customer",
    });

    // Sign token and set cookie
    const token = signToken({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    });

    await setAuthCookie(token);

    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
        },
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
