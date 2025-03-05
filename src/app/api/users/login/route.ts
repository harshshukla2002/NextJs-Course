import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { connectDB } from "@/dbconfig/dbconfig";
import Users from "@/models/user.model";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const { email, password } = await request.json();

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "user not found", success: false },
        { status: 500 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json(
        { message: "wrong password", success: false },
        { status: 500 }
      );
    }

    const tokenData = { id: user._id };

    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    const response = NextResponse.json(
      { message: "User logged In", token, success: true },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log("error on login", error);
    return NextResponse.json(
      { error: error.message, success: false, message: "error on login" },
      { status: 500 }
    );
  }
};
