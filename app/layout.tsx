import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AuthProvider } from "@/components/auth-provider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "JJC Puerto Princesa Perlas - Empowered to Inspire",
  description: "The Official Website of JJC Puerto Princesa Perlas - Building Leaders, Serving Humanity",
  keywords: ["JJC", "Junior Jaycees", "Puerto Princesa", "Youth Leadership", "Community Service", "Philippines"],
  authors: [{ name: "JJC Puerto Princesa Perlas" }],
  openGraph: {
    title: "JJC Puerto Princesa Perlas - Empowered to Inspire",
    description: "Building Leaders, Serving Humanity",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: "/jjcperlas_logo.jpg", type: "image/jpeg" },
    ],
    apple: [
      { url: "/jjcperlas_logo.jpg", type: "image/jpeg" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gradient-to-b from-secondary/20 to-white">
        <AuthProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}

