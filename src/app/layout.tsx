import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Suspense } from "react";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "myVote",
  description: "Create and Contest your own Elections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      > <main className="flex-grow">
        <SessionProvider>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
        </Suspense>
          {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          
          </ThemeProvider> */}
        </SessionProvider>
      </main>
        
        <footer className="text-[14px] text-gray-600 bg-gray-50 px-20 py-8">Made by Shuvayan Nandy</footer>
  
      </body>
     
       </html>
  );
}
