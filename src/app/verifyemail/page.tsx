"use client";

import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const VerifyEmail = () => {
  const [token, setToken] = useState<string | null>(null);
  const [verified, setVerified] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const verifyEmail = async () => {
    setError(false);
    try {
      await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error.response.data.message || error.message, error);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (token) {
      verifyEmail();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-3 gap-4">
      <h1 className="text-4xl">Verify Email</h1>
      <h2 className="p-2 bg-orange-500 text-black">
        {token ? `token is ${token}` : "no token"}
      </h2>
      {verified && (
        <div>
          <h2 className="text-2xl">Email Verified</h2>
          <Link
            className={`${buttonVariants({ variant: "link" })} text-blue-500`}
            href={"/login"}
          >
            Login
          </Link>
        </div>
      )}

      {error && (
        <div>
          <h2 className="text-2xl bg-red-500 text-black">Error Occurred</h2>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
