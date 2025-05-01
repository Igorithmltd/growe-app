/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register new user
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
 *               password:
 *                 type: string
 *                 format: password
 *                 example: gRDERIdiidfjii@
 *               fullname:
 *                 type: string
 *                 format: full name
 *                 example: John Doe
 *               phone_number:
 *                 type: string
 *                 format: phone number
 *                 example: 08151128383
 *               refferal_code:
 *                 type: string
 *                 format: refferal code
 *                 example: user123
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
 *                   example: Email verified successfully
 *       400:
 *         description: Missing or invalid email
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
      phone_number: "string|required",
      username: "string|required",
      fullname: "string|required",
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

    const { email, ...registerData }: { email: string, password: string, phone_number: string, fullname: string, referral_code?: string, username: string } = post;

    const userExists = await User.findOne({ email });
    if (empty(userExists)) {
      return BaseService.sendFailedResponse(
        "User does not exist. Please try again later",
      );
    }

    userExists.verified = true;
    userExists.fullname = registerData.fullname;
    userExists.phone_number = registerData.phone_number;
    userExists.password = registerData.password;
    userExists.username = registerData.username;
    if(registerData.referral_code){
        userExists.referral_code = registerData.referral_code;
    }

    userExists.markModified("password"); 
    await userExists.save();

    // Send OTP email
    const emailHtml = `
       <h1>Registration successful</h1>
        <p>Hi <strong>${email}</strong>,</p>
        <p>Welcome to the Growe app</p>
    `;
    await sendEmail({
      subject: "Registration Successful",
      to: email,
      html: emailHtml,
    });

    return BaseService.sendSuccessResponse("Registration Successful");
  } catch (error) {
    console.log(error, "the error");
    return NextResponse.json({ error }, { status: 500 });
  }
}