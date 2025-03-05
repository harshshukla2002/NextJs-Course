/* eslint-disable @typescript-eslint/no-explicit-any */
import Users from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/dbconfig/dbconfig";
import { sendEmail } from "@/helpers/mailer";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await Users.findOne({ email });

    if (user) {
      return NextResponse.json(
        { message: "user already exist" },
        { status: 500 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Users({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    return NextResponse.json(
      {
        message: "User Created",
        success: true,
        user: savedUser,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("something went wrong on singup post", error);
    return NextResponse.json(
      {
        error: error.message,
        message: "something went wrong on singup post",
        success: false,
      },
      { status: 500 }
    );
  }
};
