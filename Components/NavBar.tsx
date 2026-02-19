import Link from "next/link";
import { auth } from "@/auth";
import Image from "next/image";

type navLink = { href: string; text: string; icon?: string };

export default async function NavBar() {
  const session = await auth();
  const user = session?.user;
  const image = user?.image || "";

  const linkDinamico: navLink = {
    href: session ? "/profile" : "/auth",
    text: session ? "yo" : "Iniciar",
    icon: image,
  };

  const itemsLi: navLink[] = [{ href: "/", text: "home" }, linkDinamico];
  return (
    <nav className="w-full px-8 py-2 bg-slate-600 fixed top-0 z-10 h-16 flex items-center rounded-b-lg">
      <ul className="flex w-full justify-between items-center">
        {itemsLi.map(({ href, text, icon }, i) => {
          return (
            <li key={i}>
              <Link href={href}>
                {icon ? (
                  <Image
                    alt={icon!}
                    src={icon!}
                    height={100}
                    width={100}
                    loading="eager"
                    className="size-12 border-green-400 border-2 rounded-full"
                  ></Image>
                ) : (
                  text
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
