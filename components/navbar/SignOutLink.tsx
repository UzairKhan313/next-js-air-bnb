"use client";

import { useToast } from "@/hooks/use-toast";
import { SignOutButton } from "@clerk/nextjs";

const SignOutLink = () => {
  const { toast } = useToast();
  const logoutHandler = () => {
    toast({ description: "Logout successfully." });
  };
  return (
    <SignOutButton redirectUrl="/">
      <button className="w-full text-left ml-2" onClick={logoutHandler}>
        Logout
      </button>
    </SignOutButton>
  );
};

export default SignOutLink;
