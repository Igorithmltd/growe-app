/**
 * @swagger
 * /api/verify-password-otp:
 *   post:
 *     summary: Verify your reset password OTP
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
 *               otp:
 *                 type: string
 *                 format: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: OTP verified successfully
 *       400:
 *         description: Missing or invalid email or OTP
 *       500:
 *         description: Server error
 */

import BaseService from "@/app/backend/services/baseService";
import { empty } from "@/app/backend/utils/data-check";
import sendEmail from "@/app/backend/utils/email/sendEmail";
import { connectToDatabase } from "@/lib/mongoose";
import validateData from "@/lib/validate";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const post = await request.json();

    const validateRule = {
      email: "email|required",
      otp: "string|required",
    };

    const validateMessage = {
      required: ":attribute is required",
      "email.email": "Please provide a valid :attribute.",
    };

    const validateResult = validateData(post, validateRule, validateMessage);

    if (!validateResult.success) {
      return BaseService.sendFailedResponse(validateResult.data);
    }

    const { email, otp }: { email: string; otp: string } = post;

    const userExists = await User.findOne({ email });
    if (empty(userExists)) {
      return BaseService.sendFailedResponse(
        "User not found. Please try again later"
      );
    }

    if (empty(userExists.otp)) {
      return BaseService.sendFailedResponse("OTP not found");
    }

    if (userExists.otp !== otp) {
      return BaseService.sendFailedResponse("Invalid OTP");
    }
    if (userExists.otpExpiresAt < new Date()) {
      return BaseService.sendFailedResponse("OTP expired");
    }

    userExists.otp = "";
    userExists.otpExpiresAt = null;
    await userExists.save();

    // Send OTP email
    const emailHtml = `
        <h1>Your password OTP has been verified</h1>
        <p>Hi <strong>${email}</strong>,</p>
        <p>Please reset your password</p>
    `;
    await sendEmail({
      subject: "Password Reset Verification",
      to: email,
      html: emailHtml,
    });

    return BaseService.sendSuccessResponse("OTP verified successfullly");
  } catch (error) {
    console.log(error, "the error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
