import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Certificate Verifier - Geeks for Geeks",
  description: "Verify and Download Your Certificate from Geeks for Geeks Python and AIML Session",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50 flex flex-col`}>
        
        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="w-full bg-white/70 backdrop-blur-md shadow-inner py-4 mt-auto">
          <div className="max-w-5xl mx-auto text-center text-sm sm:text-base text-gray-500">
            © 2025 Corbett House. All Rights Reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
