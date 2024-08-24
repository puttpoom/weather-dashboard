"use client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addFav, deleteFav } from "../store/favSlice";

import db from "../utils/firestore";
import { collection, doc, getDocs, deleteDoc } from "firebase/firestore";

export default function FavCard() {
  const dispatch = useDispatch();
  const favItems = useSelector((state) => state.fav);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "favorites"));
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        dispatch(
          addFav({
            id: doc.id,
            city: doc.data().city,
            temperature: doc.data().temperature,
            humidity: doc.data().humidity,
            windspeed: doc.data().windSpeed,
            description: doc.data().description,
            createdAt: doc.data().createdAt,
          })
        );
      });
    };
    console.log("NO fetching data from firestore");

    if (favItems.length === 0) {
      fetchData();
      console.log("fetching data from firestore");
    }
  }, []);

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
    <>
      {favItems.length > 0 ? (
        <div className="flex gap-2 p-4 ">
          {favItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-2 border rounded-md p-4"
            >
              <p className="text-lg font-bold">{item.city}</p>
              <p>Temperature: {item.temperature}°C</p>
              <p>Weather: {item.description}</p>
              <p>Humidity: {item.humidity}%</p>
              <p>Wind Speed: {item.windspeed} m/s</p>
              {/* <p>Craeted at: {item.createdAt}</p> */}
              <p>ID: {item.id}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="bg-red-400 p-2 rounded-md font-bold text-sm text-white"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
}
