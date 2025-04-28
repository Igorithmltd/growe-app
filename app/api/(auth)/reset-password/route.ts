/**
 * @swagger
 * /api/reset-password:
 *   post:
 *     summary: Change your password
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
 *         description: Password reset successfully
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
      password: "string|required",
    };

    const validateMessage = {
      required: ":attribute is required",
      "email.email": "Please provide a valid :attribute.",
    };

    const validateResult = validateData(post, validateRule, validateMessage);

    if (!validateResult.success) {
      return BaseService.sendFailedResponse(validateResult.data);
    }

    const { email, password }: { email: string; password: string } = post;

    const userExists = await User.findOne({ email });
    if (empty(userExists)) {
      return BaseService.sendFailedResponse(
        "User not found. Please try again later"
      );
    }

    userExists.password = password;
    userExists.markModified("password");
    await userExists.save();

    // Send OTP email
    const emailHtml = `
        <h1>Password Reset</h1>
        <p>Hi <strong>${email}</strong>,</p>
        <p>Your Password has been reset successfully</p>
    `;
    await sendEmail({
      subject: "Password Reset Confirmation",
      to: email,
      html: emailHtml,
    });

    return BaseService.sendSuccessResponse("Password reset successfullly");
  } catch (error) {
    console.log(error, "the error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
