import { database } from "../../../lib/firebaseConfig";
import { ref, get, set } from "firebase/database";

export async function GET(request) {
  const dbRef = ref(database, "favorites/");
  const snapshot = await get(dbRef);

  if (snapshot.exists()) {
    return new Response(JSON.stringify(snapshot.val()), {
      status: 200,
    });
  } else {
    return new Response(JSON.stringify({ message: "No data available" }), {
      status: 404,
    });
  }
}

export async function POST(request) {
  const body = await request.json();
  const dbRef = ref(database, `favorites/${body.id}`);

  await set(dbRef, body);

  return new Response(JSON.stringify({ message: "Data saved successfully!" }), {
    status: 200,
  });
}
