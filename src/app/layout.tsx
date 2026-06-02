import type { Metadata } from "next";
import { Bebas_Neue, Share_Tech_Mono, Oswald } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/Sidebar";
import { getUserProfile } from "./actions";

const bebasNeue = Bebas_Neue({
  weight: "400",
  variable: "--font-title",
  subsets: ["latin"],
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  variable: "--font-mono",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "O Sistema - Operação Aprovação",
  description: "Gerenciador de Estudos Tático e Gamificado",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserProfile();
  return (
    <html
      lang="pt-BR"
      className={`${bebasNeue.variable} ${shareTechMono.variable} ${oswald.variable} dark antialiased`}
    >
      <body className="min-h-screen bg-system-bg text-system-text flex">
        {user && <Sidebar user={user} />}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto">
          {children}
        </div>
      </body>
    </html>
  );
}
