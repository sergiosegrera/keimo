import Link from "next/link";
// import Image from "next/image";
import { APP_CONTACT_EMAIL, APP_NAME } from "@/lib/constants";

export default function Footer() {
  return (
    <section className="py-16 justify-center items-center flex bg-white rounded-xl border-2 border-gray-100 m-4">
      <footer className="container flex flex-col items-center justify-center text-center text-sm text-muted-foreground gap-6">
        <Link className="flex items-center gap-1" href="/">
          {/* <Image src="/icon1.png" alt={APP_NAME} width={48} height={48} /> */}
          <h1 className="text-3xl font-serif font-medium">{APP_NAME}</h1>
        </Link>

        <div className="flex flex-wrap justify-center gap-6">
          <Link
            href={"privacy"}
            className="hover:text-blue-500 transition-colors"
          >
            Privacy
          </Link>
          <Link
            href={"/terms"}
            className="hover:text-blue-500 transition-colors"
          >
            Terms
          </Link>
          <a
            href={`mailto:${APP_CONTACT_EMAIL}`}
            className="hover:text-blue-500 transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="flex flex-col gap-2 items-center">
          <p className="text-xs">
            &copy; 2025 {APP_NAME}. All rights reserved.
          </p>
          <a
            href={`mailto:${APP_CONTACT_EMAIL}`}
            className="text-muted-foreground hover:text-blue-500 transition-colors text-xs"
          >
            {APP_CONTACT_EMAIL}
          </a>
        </div>
      </footer>
    </section>
  );
}
