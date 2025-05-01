'use client';

import { Inter } from "next/font/google";
import "./global.css";
import Navbar from "@/components/ui/Navbar";
import { ParticleBackground } from "@/components/ui/ParticleBackground";
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const showParticles = !pathname.includes('/dashboard');

  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {showParticles && <ParticleBackground />}
        <main className="min-h-screen bg-transparent pt-4">
          {children}
        </main>
      </body>
    </html>
  );
}
