import BaseService from "@/app/backend/services/baseService";
import { empty } from "@/app/backend/utils/data-check";
import { connectToDatabase } from "@/lib/mongoose";
import validateData from "@/lib/validate";
import User from "@/models/user";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await connectToDatabase();
  try {
    const post = await request.json();
    const { email, username, password }: { email: string; username: string, password: string } = post;

    const validateRule = {
        email: "email|required",
        username: "string|required",
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

      const userExists = await User.findOne({email});
      if(!empty(userExists)){
        return BaseService.sendFailedResponse("User already exists. Please log in");
      }


    const newPost = new User({
      email,
      username,
      password
    });

    await newPost.save();

    return BaseService.sendSuccessResponse(newPost);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
