/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

const ForgetPassword = () => {
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);
    try {
      const res = await axios.post("/api/users/forgetpassword", { email });
      toast.success(res.data.message);
      setEmail(null);
      router.push("/login");
    } catch (error: any) {
      console.log(error?.response?.data?.message || error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong on sending forget password"
      );
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (email && email.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Forget Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col" onSubmit={onSubmit}>
              <div className="flex flex-col gap-1 my-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  placeholder="enter email"
                  value={email || ""}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={disabled}
              >
                {loading ? "Loading..." : "Send Email"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgetPassword;
