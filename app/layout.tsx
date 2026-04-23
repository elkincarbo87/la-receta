import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { IceCream } from "lucide-react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Heladera - Ice Cream Recipe Tracker",
  description: "Save and manage your ice cream recipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 flex h-14 items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <IceCream className="h-5 w-5" />
              Heladera
            </Link>
            <nav className="ml-auto flex items-center gap-4">
              <Link
                href="/recetas/nueva"
                className="text-sm font-medium text-primary hover:underline underline-offset-4"
              >
                Nueva Receta
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
