import { connectDB } from "@/dbconfig/dbconfig";
import Users from "@/models/user.model";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    const user = await Users.findOne({
      forgotPasswordToken: token,
      forgorPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Token or expired token", success: false },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgorPasswordTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "password updated successfully", success: true },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error, error.message);
    return NextResponse.json(
      {
        error: error.message,
        message: "error on update password",
        success: true,
      },
      { status: 500 }
    );
  }
};
