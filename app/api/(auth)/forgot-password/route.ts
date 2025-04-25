/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Send password reset email
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *     responses:
 *       200:
 *         description: Reset email sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Reset email sent
 *       400:
 *         description: Missing or invalid email
 *       500:
 *         description: Server error
 */

import BaseService from "@/app/backend/services/baseService";
import sendEmail from "@/app/backend/utils/email/sendEmail";
import { generateOTP } from "@/app/backend/utils/helpers";
import { connectToDatabase } from "@/lib/mongoose";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const { email } = await req.json();

    // Validate email
    if (!email) {
      return BaseService.sendFailedResponse("Email is required");
    }

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return BaseService.sendFailedResponse("User not found");
    }
    // Generate OTP
    const otp = generateOTP();
    userExists.otp = otp;
    userExists.otp_expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    await userExists.save();
    // Send OTP email
    const emailHtml = `
    <h1>Password Reset Request</h1>
     <p>Hi <strong>${email}</strong>,</p>
     <p>Your password reset code is ${otp}</p>
  `;
    await sendEmail({
      subject: "Password Reset Request",
      to: email,
      html: emailHtml,
    });
    // Send response
    return BaseService.sendSuccessResponse("Password Reset Request Successful");
  } catch (error) {
    console.log(error, "the error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
