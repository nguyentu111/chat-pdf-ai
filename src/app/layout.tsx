import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/auth-provider";
import { auth } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ChatPDF",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, session } = await auth();
  return (
    <AuthProvider user={user} session={session}>
      <Providers>
        <html lang="en">
          <body className={inter.className}>{children}</body>
          <Toaster />
        </html>
      </Providers>
    </AuthProvider>
  );
}
