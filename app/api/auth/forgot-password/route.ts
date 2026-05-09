import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { render } from "@react-email/render";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import resend from "@/lib/resend";
import PasswordResetEmail from "@/emails/PasswordReset";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success even if user not found
    // This prevents email enumeration attacks
    if (!user) {
      return NextResponse.json({
        message:
          "If an account exists with this email, a reset link has been sent.",
      });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // Save hashed token with 1 hour expiry
    await User.findByIdAndUpdate(user._id, {
      resetToken: hashedToken,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
    });

    // Build reset URL with raw token
    const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password?token=${resetToken}&email=${email}`;

    // Send email
    const html = await render(
      PasswordResetEmail({
        resetUrl,
        customerName: user.firstName,
      }),
    );

    await resend.emails.send({
      from: "Noire Luxe Collection <onboarding@resend.dev>",
      to: user.email,
      subject: "Reset Your Password — Noire Luxe Collection",
      html,
    });

    return NextResponse.json({
      message:
        "If an account exists with this email, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
