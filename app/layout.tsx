import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { SessionProviderWrapper } from "./components/auth/SessionProviderWrapper";
import { ThemeProvider } from "./components/ui/ThemeProvider";
import { GlassHeader } from "./components/ui/GlassHeader";
import { GradientBackground } from "./components/ui/GradientBackground";
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
  title: "Casa Nieve Lab - Ice Cream Recipe Tracker",
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
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col relative">
        <NextTopLoader
          color="hsl(var(--primary))"
          height={3}
          showSpinner={false}
        />
        <SessionProviderWrapper>
          <ThemeProvider>
            <GradientBackground />
            <GlassHeader />
            <main className="flex-1 mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
          </ThemeProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
