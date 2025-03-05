"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

interface User {
  email: string;
  password: string;
}

interface FormInputEvent {
  target: {
    name: string;
    value: string;
  };
}

const intialState: User = {
  email: "",
  password: "",
};

const LoginPage = () => {
  const [user, setUser] = useState<User>(intialState);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const onChange = (event: FormInputEvent) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onLogin = async (event: any) => {
    event.preventDefault();
    setDisabled(true);
    setLoading(true);
    try {
      const res = await axios.post("api/users/login", user);
      toast.success(res.data.message);
      router.push("/profile");
      setUser(intialState);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      toast.error(
        error?.response?.data?.message || "something went wrong on login"
      );
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card className="rounded-sm">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col" onSubmit={onLogin}>
              <div className="flex flex-col gap-1 my-2">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  placeholder="enter email"
                  value={user.email}
                  name="email"
                  onChange={onChange}
                  required
                />
              </div>
              <div className="flex flex-col gap-1 my-2">
                <Label htmlFor="username">Password</Label>
                <Input
                  type="password"
                  placeholder="enter password"
                  value={user.password}
                  name="password"
                  onChange={onChange}
                  required
                />
              </div>
              <br />
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={disabled}
              >
                {loading ? "Loading..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <Link
              className={`${buttonVariants({
                variant: "link",
              })} text-right text-blue-500`}
              href={"/forgetpassword"}
            >
              forget password?
            </Link>
            <Link
              className={buttonVariants({ variant: "link" })}
              href={"/signup"}
            >
              Visit Signup here
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
