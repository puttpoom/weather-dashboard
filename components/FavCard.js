"use client";
import { useSelector, useDispatch } from "react-redux";
import { deleteFav } from "../store/favSlice";

import db from "../utils/firestore";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

export default function FavCard() {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.fav);

  const handleDelete = async (id) => {
    const itemRef = doc(db, "favorites", id);
    try {
      await deleteDoc(itemRef);
      dispatch(deleteFav(id));
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
    <div className="container">
      {favItems.length > 0 ? (
        <div className="flex overflow-x-scroll gap-2 p-4 ">
          {favItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col justify-between gap-2 border rounded-md p-4"
            >
              <p className="text-lg font-bold">{item.city}</p>
              <p>Temperature: {item.temperature}°C</p>
              <p>Weather: {item.description}</p>
              <p>Humidity: {item.humidity}%</p>
              <p>Wind Speed: {item.windspeed} m/s</p>
              <p>Craeted At: {item.createdAt}</p>
              <p>ID: {item.id}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-400 min-w-64 text-white p-2 rounded-md font-bold text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
