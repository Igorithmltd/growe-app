import BaseService from "@/app/backend/services/baseService";
import { connectToDatabase } from "@/lib/mongoose";
import validateData from "@/lib/validate";
import User from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  await connectToDatabase();
  const users = await User.find({});
  const respose = BaseService.sendSuccessResponse(users);
  return NextResponse.json(respose);
}

