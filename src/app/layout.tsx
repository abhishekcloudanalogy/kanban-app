"use client";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "../redux/providers";
import Navbar from "@components/Navbar";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const pjs = Plus_Jakarta_Sans({ subsets: ["latin"], display: "swap" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [sessionUser, setSessionUser] = useState("");
  const getSessionDetails = async () => {
    const session = await getSession();
    if (session) {
      setSessionUser(session.user);
    }
  };
  useEffect(() => {
    getSessionDetails();
  }, []);
  return (
    <html suppressHydrationWarning lang="en" className={pjs.className}>
      <body suppressHydrationWarning className="pb-24 h-screen overflow-hidden'">
        <Providers>
          <Navbar session={sessionUser} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
