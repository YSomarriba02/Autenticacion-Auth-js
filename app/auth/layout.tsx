import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Auth",
  description: "Inicia sesión o crea tu cuenta de forma segura",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
