"use client";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/themeSlice";
import { useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.fav);
  const theme = useSelector((state) => state.theme.value);

  useEffect(() => {
    document.documentElement.classList = theme;
  }, [theme]);

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
      <button
        onClick={() => {
          dispatch(toggleTheme());
        }}
        className="font-bold"
      >
        {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </header>
  );
}
