import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import Image from "next/image";
import "./globals.css";

interface RootLayoutProps {  children: React.ReactNode;
}

const sfPro = localFont({
  src: "../../public/fonts/SF-Pro.ttf",
  variable: "--font-sf-pro",
 
});
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Munchies",
  description: "A food delivery app",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        className={`${sfPro.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header>
          <Image
            src="/images/munchies-logo.png"
            alt="Munchies Logo"
            width={250}
            height={40}
            className="mt-6 sm:mt-12 pl-6 w-40 sm:pl-10 sm:w-62 dark:invert"
          />
        </header>
        {children}
      </body>
    </html>
  );
}
