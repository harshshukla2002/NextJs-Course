import { connectDB } from "@/dbconfig/dbconfig";
import Users from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const POST = async (request: NextRequest) => {
  try {
    const reqBody = await request.json();
    const { token } = reqBody;

    const user = await Users.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid Token or expired token", success: false },
        { status: 400 }
      );
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json(
      { message: "email verified", success: true },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error, error.message);
    return NextResponse.json(
      {
        error: error.message,
        message: "error on verify email",
        success: true,
      },
      { status: 500 }
    );
  }
};
