import Link from "next/link";

const itemsLi: { href: string; text: string }[] = [
  { href: "/", text: "home" },
  { href: "/auth", text: "login" },
];

export default function NavBar() {
  return (
    <nav className="w-full px-8 py-4 bg-slate-500">
      <ul className="flex w-full justify-between">
        {itemsLi.map(({ href, text }, i) => {
          return (
            <li key={i}>
              <Link href={href}>{text}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
