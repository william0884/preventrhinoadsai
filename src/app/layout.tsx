import "../../src/styles/globals.css";
import { Inter } from "next/font/google";
import {
  ClerkProvider,
} from "@clerk/nextjs";
import Navbar from "./_components/navbar";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Prevent Rhino Ads AI",
  description: "Prevent Rhino Ads AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
      <body className={`${inter.className} bg-gray-900 text-white`}>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
