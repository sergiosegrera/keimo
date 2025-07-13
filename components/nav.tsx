"use client";

import { Button } from "@/components/ui/button";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { APP_NAME } from "@/lib/constants";
import { MessageCircleIcon } from "lucide-react";

export default function Nav() {
  const pathname = usePathname();

  const isChatPage = pathname === "/chat";

  return (
    <nav className="justify-between flex m-4 mb-8 container mx-auto items-center px-4">
      <Link className="flex items-center gap-1" href="/">
        {/* <Image
          src="/icon1.png"
          alt={APP_NAME}
          width={48}
          height={48}
          priority
        /> */}
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
            {!isChatPage && (
              <Button asChild>
                <Link href="/chat">
                  <MessageCircleIcon className="w-4 h-4" />
                  Chat
                </Link>
              </Button>
            )}
            <UserButton />
          </div>
        </SignedIn>
      </Suspense>
    </nav>
  );
}
