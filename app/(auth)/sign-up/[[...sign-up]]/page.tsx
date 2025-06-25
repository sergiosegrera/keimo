"use client";

import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full py-16">
      <SignUp signInUrl="/sign-in" />
    </div>
  );
}
