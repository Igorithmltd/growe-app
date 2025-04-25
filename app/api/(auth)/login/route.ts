/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login
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
 *                 format: string
 *                 example: Passcode134
 *     responses:
 *       200:
 *         description: Login successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Login successfully
 *       400:
 *         description: Missing or invalid email or Password
 *       500:
 *         description: Server error
 */




import BaseService from "@/app/backend/services/baseService";
import { connectToDatabase } from "@/lib/mongoose";
import validateData from "@/lib/validate";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
import * as cookie from 'cookie'; // ✅ this works


export async function POST(request: NextRequest) {
  await connectToDatabase();
  try {
    const post = await request.json();
    const { email, password }: { email: string, password: string } = post;

    const validateRule = {
        email: "email|required",
        password: "string|required",
      };
      const validateMessage = {
        required: ":attribute is required",
        string: ":attribute must be a string",
        "email.email": "Please provide a valid :attribute.",
      };

      const validateResult = validateData(post, validateRule, validateMessage);
      if (!validateResult.success) {
        return BaseService.sendFailedResponse(validateResult.data);
      }

      const userExists = await User.findOne({email})

      if (!(await userExists.comparePassword(password))) {
        return BaseService.sendFailedResponse('Wrong email or password')
      }
      const token = await userExists.generateToken(
        process.env.TOKEN_SECRET || ""
      );

      const headers = new Headers();
      headers.append(
        'Set-Cookie',
        cookie.serialize('growe_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600 * 2, // let do 2 hour
          path: '/',
        })
      );

    return BaseService.sendSuccessResponse(token);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
