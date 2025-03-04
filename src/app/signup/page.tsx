"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

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

interface User {
  email: string;
  password: string;
  username: string;
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
  username: "",
};

const SignupPage = () => {
  const [user, setUser] = useState<User>(intialState);
  const router = useRouter();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  const onChange = (event: FormInputEvent) => {
    const { name, value } = event.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSignup = async (event: any) => {
    event.preventDefault();
    setDisabled(true);
    setLoading(true);
    try {
      const res = await axios.post("api/users/signup", user);
      toast.success(res.data.message);
      router.push("/login");
      setUser(intialState);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error?.response?.data?.message || error);
      toast.error(
        error?.response?.data?.message || "something went wrong on signup"
      );
    } finally {
      setLoading(false);
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [user]);

  return (
    <Card className="w-[28%] m-auto mt-[10%] rounded-sm">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Signup</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col" onSubmit={onSignup}>
          <div className="flex flex-col gap-1 my-2">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="enter username"
              value={user.username}
              name="username"
              onChange={onChange}
              required
            />
          </div>
          <div className="flex flex-col gap-1 my-2">
            <Label htmlFor="email">Email</Label>
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
            <Label htmlFor="password">Password</Label>
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
          <Button type="submit" className="cursor-pointer" disabled={disabled}>
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Link className={buttonVariants({ variant: "link" })} href={"/login"}>
          Visit Login here
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignupPage;
