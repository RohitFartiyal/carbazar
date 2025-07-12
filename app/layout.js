
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "CarBazar",
  description: "Find your Dream Car",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className}`}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Toaster richColors />

          <footer className="bg-gray-300 py-12">
            <div className="container mx-auto px-4 text-center text-gray-800">
              <p>Made for project use by Rohit Fartiyal</p>
            </div>
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
