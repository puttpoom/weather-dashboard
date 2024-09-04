"use client";
import "./globals.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { addFav } from "../store/favSlice";

import db from "../utils/firestore";
import { collection, addDoc } from "firebase/firestore";

//Components
import SearchBar from "../components/SearchBar";
import Link from "next/link";

export default function HomePage() {
  const dispatch = useDispatch();
  const [weatherData, setWeatherData] = useState(null);
  const [isLocation, setIsLocation] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const weatherInfo = {
              city: data.name,
              temperature: data.main.temp,
              description: data.weather[0].description,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
            };
            setIsLocation(true);
            setWeatherData(weatherInfo);
          })
          .catch((error) => {
            setError(error.message);
          });
      });
    }
  }, []);

  const handleGetCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
        )
          .then((response) => response.json())
          .then((data) => {
            const weatherInfo = {
              city: data.name,
              temperature: data.main.temp,
              description: data.weather[0].description,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
            };
            setIsLocation(true);
            setWeatherData(weatherInfo);
          })
          .catch((error) => {
            setError(error.message);
          });
      });
    }
  };

  const handleFavorite = async (data) => {
    const { city, temperature, humidity, windSpeed, description } = data;
    const newData = {
      city: city,
      temperature: temperature,
      humidity: humidity,
      windSpeed: windSpeed,
      description: description,
      createdAt: new Date().toLocaleString(),
    };
    try {
      const docRef = await addDoc(collection(db, "favorites"), newData);
      dispatch(addFav({ id: docRef.id, ...newData }));
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const handleSearch = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found");
      }
      const data = await response.json();

      const weatherInfo = {
        city: data.name,
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      };

      setWeatherData(weatherInfo);
      setError(null);
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  return (
    <div className="container flex flex-col items-center gap-4 justify-center h-[80vh] mx-auto">
      <h1 className="text-2xl font-bold mb-4">Weather Search</h1>
      <SearchBar onSearch={handleSearch} />
      {/* <button onClick={() => handleGetCurrentLocation()}>
        getCurrentPosition
      </button> */}
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {weatherData && (
        <div className="flex flex-col gap-2 border p-4 rounded-md hover:bg-gray-50">
          {isLocation && (
            <p className="font-bold text-center text-md text-green-500">
              Your Location
            </p>
          )}
          <Link
            href={`/weather/${weatherData.city}`}
            className="flex flex-col gap-2 "
          >
            <h2 className="text-xl font-semibold">{weatherData.city}</h2>
            <p>Temperature: {weatherData.temperature}°C</p>
            <p>Weather: {weatherData.description}</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windSpeed} m/s</p>
          </Link>
          <button
            className="bg-pink-400 min-w-64 font-bold text-sm p-2 text-white rounded-md"
            onClick={() => handleFavorite(weatherData)}
          >
            Add to Favorite
          </button>
        </div>
      )}

      {/* <FavCard /> */}
    </div>
  );
}
