export default function Footer() {
  return (
    <footer className="flex flex-col items-center justify-center w-full h-16 border-t">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Weather Dashboard
      </p>
      <p className="text-sm">github.com/puttpoom, putthiphoom.bm@gmail.com</p>
    </footer>
  );
}
