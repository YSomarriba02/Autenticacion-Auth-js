import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "../components/NavBar";
import AuthProvider from "./AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | AuthCore",
    default: "AuthCore",
  },
  description:
    "Gestiona tu cuenta de forma segura: inicia sesión con email y contraseña, recupera tu acceso fácilmente y edita tu perfil personal.",

  keywords: [
    "autenticación",
    "login email",
    "recuperar contraseña",
    "perfil usuario",
    "Next.js",
    "Auth.js",
  ],
  authors: [{ name: "Yaser Antonio" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[image:var(--background_gradiente)] bg-fixed dark:bg-[image:none] dark:bg-(--background_1) text-(--text)  transition-colors duration-300 ease-out`}
      >
        <NavBar />
        <main className="p-10 py-18 h-full">
          <AuthProvider>{children}</AuthProvider>
        </main>
      </body>
    </html>
  );
}
