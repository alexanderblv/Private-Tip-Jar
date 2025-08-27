import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TipJarProvider } from "@/components/providers/tip-jar-provider";
import { Navigation } from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Private Tip Jar",
  description: "Анонимные чаевые для официантов",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <TipJarProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navigation />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
          </div>
        </TipJarProvider>
      </body>
    </html>
  );
}