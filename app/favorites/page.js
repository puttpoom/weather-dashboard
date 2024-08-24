import FavCard from "../../components/FavCard";

export default function FavoritesPage() {
  return (
    <div className="container flex flex-col items-center justify-center h-[80vh] mx-auto">
      <div className="flex flex-col items-center justify-center gap-2">
        <h1 className="text-2xl font-bold">Favorites Page</h1>
        <FavCard />
      </div>
    </div>
  );
}
