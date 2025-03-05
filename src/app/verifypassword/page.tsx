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

const VerifyPassword = () => {
  const [password, setPassword] = useState<string | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    setDisabled(true);
    try {
      if (password === confirmPassword) {
        const res = await axios.post("/api/users/verifypassword", {
          password,
          token,
        });
        toast.success(res.data.message);
        setPassword(null);
        router.push("/login");
      } else {
        toast.error("password mismatch");
      }
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      toast.error(
        error?.response?.data?.message ||
          "something went wrong on updating password"
      );
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken);
  }, []);

  useEffect(() => {
    if (password && password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [password]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Update Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col" onSubmit={onSubmit}>
              <div className="flex flex-col gap-1 my-2">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  placeholder="enter email"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 my-2">
                <Label htmlFor="username">Confirm Password</Label>
                <Input
                  type="password"
                  placeholder="enter email"
                  value={confirmPassword || ""}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={disabled}
              >
                {loading ? "Loading..." : "Update"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyPassword;
