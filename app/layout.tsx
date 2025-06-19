import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { APP_NAME, APP_URL } from "@/lib/constants";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: ["400"],
});

// TODO: change this to your own metadata
export const metadata: Metadata = {
  title: APP_NAME,
  description: "boilerplate",
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: APP_NAME,
    description: "boilerplate",
    url: APP_URL,
    siteName: APP_NAME,
    images: [
      {
        url: "/banner.png", // make sure you generate and host this
        width: 1200,
        height: 675,
        alt: APP_NAME,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: APP_NAME,
    description: "boilerplate",
    images: ["/banner.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          {/* Modify this to change the title of the app on the home screen */}
          <meta name="apple-mobile-web-app-title" content={APP_NAME} />
        </head>
        <body
          className={`${inter.variable} ${instrumentSerif.variable} antialiased flex flex-col min-h-screen`}
        >
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
