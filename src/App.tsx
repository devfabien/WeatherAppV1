import { useState } from "react";
import PWABadge from "./PWABadge.tsx";
import fetchWeather from "./api/fetchWeather.ts";
import { WeatherInfo } from "./types/weatherInfo.ts";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState<WeatherInfo>();
  const [notFound, setNotFound] = useState<null | string>();
  const [isLoading, setIsLoading] = useState(false);

  const search = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (query.trim().length !== 0) {
      setIsLoading(true);
      try {
        const resp = await fetchWeather(query);
        setWeather(resp);
        localStorage.setItem("weather", JSON.stringify(resp));
        setNotFound(null);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.message === "City not found") {
          setNotFound("City not found");
        }
        // If fetch fails, check local storage for cached weather data
        const cachedWeather = localStorage.getItem("weather");
        if (cachedWeather) {
          setWeather(JSON.parse(cachedWeather));
        }
      }
      setQuery("");
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="h-screen w-full bg-[url('/bg.webp')] bg-no-repeat bg-cover items-center justify-center flex flex-col">
        {notFound && (
          <div className="p-3 rounded-lg bg-yellow-200 my-2 absolute left-0 right-0 top-4 mx-4 w-fit justify-center">
            {notFound}
          </div>
        )}
        {isLoading && (
          <svg
            version="1.1"
            id="L5"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 100 100"
            enableBackground="new 0 0 0 0"
            xmlSpace="preserve"
            className="w-24 h-24 inline-block m-5"
          >
            <circle fill="#fff" stroke="none" cx="6" cy="50" r="6">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 15 ; 0 -15; 0 15"
                repeatCount="indefinite"
                begin="0.1"
              />
            </circle>
            <circle fill="#fff" stroke="none" cx="30" cy="50" r="6">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 10 ; 0 -10; 0 10"
                repeatCount="indefinite"
                begin="0.2"
              />
            </circle>
            <circle fill="#fff" stroke="none" cx="54" cy="50" r="6">
              <animateTransform
                attributeName="transform"
                dur="1s"
                type="translate"
                values="0 5 ; 0 -5; 0 5"
                repeatCount="indefinite"
                begin="0.3"
              />
            </circle>
          </svg>
        )}
        <form
          id="searchform"
          className="w-[70%] md:w-[40%] p-3 rounded-lg flex items-center bg-white gap-2"
          onSubmit={search}
        >
          <input
            name="search"
            className="w-full p-3 rounded-lg outline-none"
            placeholder="City name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6 hover:bg-slate-400 rounded-lg"
            onClick={search}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </form>
        {weather?.main && !notFound ? (
          <div className="mt-3 rounded-xl bg-slate-300/70 w-[80%] md:w-[50%] flex flex-col justify-center items-center p-4">
            <h2>
              <span className="text-3xl">{weather.name}</span>
              <sup className="px-3 rounded-md text-xl bg-yellow-500">
                {weather.sys.country}
              </sup>
            </h2>
            <div className="my-2 text-2xl font-medium">
              <span>{(Math.round(weather.main.temp) - 273.15).toFixed(1)}</span>{" "}
              <sup>&deg;c</sup>
            </div>
            <div className="my-2">
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
              <p className="my-2 text-xl font-bold italic">
                {weather.weather[0].description}{" "}
              </p>
            </div>
          </div>
        ) : null}
        <PWABadge />
      </div>
    </>
  );
}

export default App;
