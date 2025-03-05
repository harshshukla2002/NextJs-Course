/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    return decoded.id;
  } catch (error: any) {
    console.error("error on getting data from token", error.message || error);
    throw new Error(error.message);
  }
};
