import mongoose from "mongoose";
import { userModel } from "../../../models/user-schema";
import mongooseConnection from "../../../mongoose-config/page";
import { NextResponse } from "next/server";

export async function POST(req: any) {
  try {
    const body = await req.json();
    const email = body.email;

    // Establish mongoose connection
    await mongooseConnection();

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) {
      return NextResponse.json([
        {
          msg: "User already registered. you can login or use another email.",
          path: "email",
        },
      ]);
    }

    // Create user using userModel
    const createdUser = await userModel.create(body);

    // Logging for debugging
    console.log(`body ${JSON.stringify(body)}`);
    console.log(`createdUser ${JSON.stringify(createdUser)}`);

    // Respond with "ok" if successful
    return NextResponse.json({
      message: "User created successfully",
      success: true,
    });
  } catch (e) {
    let errorList: any[] = [];
    // Handling validation errors
    if (e instanceof mongoose.Error.ValidationError) {
      for (let errKey in e.errors) {
        errorList.push({
          msg: e.errors[errKey].message,
          path: e.errors[errKey].path,
        });
      }
      console.log(errorList);

      return NextResponse.json(errorList);
    }
    console.error(e); // Add error logging for other types of errors
    return NextResponse.json({
      msg: "There was an error while creating user.",
      success: false,
    });
  }
}
