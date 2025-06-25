"use client";

import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16">
      <SignIn signUpUrl="/sign-up" />
    </div>
  );
}
