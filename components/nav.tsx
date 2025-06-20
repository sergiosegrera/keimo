"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { APP_NAME } from "@/lib/constants";

export default function Nav() {
  return (
    <nav className="justify-between flex m-4 mb-8 container mx-auto items-center px-2">
      <Link className="flex items-center gap-1" href="/">
        <Image
          src="/icon1.png"
          alt={APP_NAME}
          width={48}
          height={48}
          priority
        />
        <h1 className="text-3xl font-serif font-medium">{APP_NAME}</h1>
      </Link>

      <Suspense>
        <SignedOut>
          <div className="flex items-center gap-1">
            <Button variant="outline" asChild>
              <SignUpButton />
            </Button>
            <Button asChild>
              <SignInButton />
            </Button>
          </div>
        </SignedOut>
        <SignedIn>
          <div className="flex items-center gap-2">
            <UserButton />
          </div>
        </SignedIn>
      </Suspense>
    </nav>
  );
}
