import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-24 border-t text-sm">
      <p>Weather Dashboard - {new Date().getFullYear()}</p>
      <Link href="https://github.com/puttpoom/weather-dashboard">
        github.com/puttpoom/weather-dashboard
      </Link>
      <p>putthiphoom.bm@gmail.com</p>
    </footer>
  );
}
