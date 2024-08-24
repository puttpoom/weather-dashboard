export async function GET(request, { params }) {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${process.env.OPENWEATHERMAP_API_KEY}`
  );

  if (!res.ok) {
    return new Response("City not found", { status: 404 });
  }

  const data = await res.json();

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
