"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Header() {
  const favItems = useSelector((state) => state.fav);
  return (
    <header className="flex bg-transparent shadow-sm p-2 justify-end gap-4 font-bold">
      <Link href="/">Home</Link>
      <Link href="/favorites" className="relative">
        Favorites
        {favItems.length > 0 ? (
          <p className="absolute top-0 right-0 inline-flex items-center justify-center px-1 py-0.5 text-xs leading-none text-white bg-red-500 rounded-full transform translate-x-1/2 -translate-y-1/2">
            {favItems.length}
          </p>
        ) : null}
      </Link>
    </header>
  );
}
