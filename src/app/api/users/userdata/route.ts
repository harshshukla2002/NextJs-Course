import { connectDB } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import Users from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const GET = async (request: NextRequest) => {
  try {
    const userId = await getDataFromToken(request);
    const user = await Users.findOne({ _id: userId }).select("-password");

    return NextResponse.json({ user, success: true }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.log(error.message || error);
    return NextResponse.json(
      {
        error: error.message,
        message: "error on getting user data",
        success: false,
      },
      { status: 500 }
    );
  }
};
