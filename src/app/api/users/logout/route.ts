import { NextResponse } from "next/server";

export const GET = () => {
  try {
    const response = NextResponse.json({
      message: "logout successful",
      success: true,
    });

    response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });

    return response;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("error on logout", error);
    return NextResponse.json(
      { error: error.message, message: "error on logout", success: false },
      { status: 500 }
    );
  }
};
