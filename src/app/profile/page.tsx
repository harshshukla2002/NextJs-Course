"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";

interface User {
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

const Profile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);

  const getUser = async () => {
    setUserLoading(true);
    try {
      const response = await axios.get("/api/users/userdata");
      setUser(response.data.user);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "error on get user",
        error?.response?.data?.message || error
      );
    } finally {
      setUserLoading(false);
    }
  };

  const onLogout = async () => {
    setLoading(true);
    try {
      await axios.get("/api/users/logout");
      router.push("/login");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("error on logout", error.response.data.message || error);
      toast.error(error.response.data.message || "error on logout");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div>
      <div className="flex flex-row justify-between items-center p-5 w-[70%] m-auto shadow-md rounded-md mt-4">
        <h1 className="text-2xl">Profile</h1>
        <Button
          className="cursor-pointer"
          variant="destructive"
          onClick={onLogout}
          disabled={loading}
        >
          {loading ? "Loading..." : "Logout"}
        </Button>
      </div>
      <div className="w-[60%] m-auto">
        {userLoading ? (
          <h1 className="text-center text-2xl mt-[10%]">Loading...</h1>
        ) : (
          <>
            <h3 className="m-10 text-3xl capitalize">
              Welcome {user?.username}
            </h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
