import { sendEmail } from "@/helpers/mailer";
import Users from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest) => {
  try {
    const { email } = await request.json();

    const user = await Users.findOne({ email });

    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
          success: false,
        },
        { status: 500 }
      );
    }

    await sendEmail({ email, emailType: "RESET", userId: user._id });

    return NextResponse.json(
      {
        message: "mail sent successfully",
        success: true,
      },
      { status: 200 }
    );
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(
      "something went wrong on sending forget password token",
      error
    );
    return NextResponse.json(
      {
        error: error.message,
        message: "something went wrong on sending forget password token",
        success: false,
      },
      { status: 500 }
    );
  }
};
