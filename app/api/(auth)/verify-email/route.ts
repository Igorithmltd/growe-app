/**
 * @swagger
 * /api/verify-email:
 *   post:
 *     summary: Verify your email
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
    };

    const validateMessage = {
      required: ":attribute is required",
      "email.email": "Please provide a valid :attribute.",
    };

    const validateResult = validateData(post, validateRule, validateMessage);

    if (!validateResult.success) {
      return BaseService.sendFailedResponse(validateResult.data);
    }

    const { email }: { email: string } = post;

    const userExists = await User.findOne({ email });
    if (!empty(userExists)) {
      return BaseService.sendFailedResponse(
        "User already exists. Please log in"
      );
    }

    const newPost = new User({
      email,
    });

    await newPost.save();

    return BaseService.sendSuccessResponse("Registration Successful");
  } catch (error) {
    console.log(error, "the error");
    return NextResponse.json({ error }, { status: 500 });
  }
}
