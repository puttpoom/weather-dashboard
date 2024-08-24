export default async function CityPage({ params }) {
  const { city } = params;

  const res = await fetch(`http://localhost:3000/api/city/${city}`);
  const data = await res.json();

  return (
    <div className="container flex items-center gap-2 justify-center h-[80vh] mx-auto ">
      <div className="border rounded-md p-4">
        <h1 className="font-bold text-[24px]">{params.city}</h1>
        <p>Temperature: {data.main.temp}°C</p>
        <p>Weather: {data.weather[0].description}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind Speed: {data.wind.speed} m/s</p>
        <p>Res status: {res.status}</p>
      </div>
    </div>
  );
}
