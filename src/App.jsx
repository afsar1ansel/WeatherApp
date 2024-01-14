import { useContext, useEffect, useState } from "react";
import Day from "./components/Day";
import style from "./App.module.css";
import { Context } from "./context/Context";
import FiveDay from "./components/FiveDay";
import axios from "axios";


function App() {
  const { area, celsius, setArea } = useContext(Context);
  const [weather, setWeather] = useState(null);
  const[location, setLocation] = useState(null);
  const [weather5, setWeather5] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error, {
        enableHighAccuracy: true,
      });
    } else {
      console.log("Geolocation not supported");
      fetchWeatherDetails()
    }

    function success(position) {
      const { latitude, longitude } = position.coords;
      console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
      setLocation({ latitude, longitude });
    }

    function error() {
      console.log("Turn on your location to get the accurate weather");
      fetchWeatherDetails()

    }
  }, []); // Empty dependency array ensures that this effect runs once on mount

  useEffect(() => {
    if (location) {
      fetchDataCurrentLocation(location.latitude, location.longitude);
    }
  }, [location]);

  const fetchDataCurrentLocation = async (lat, lon) => {
    try {
      let weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=metric`
      );
      let forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=metric`
      );
      setWeather(weatherResponse.data);
      setWeather5(forecastResponse.data);
      setArea(weatherResponse.data.name);
      console.log(weatherResponse, forecastResponse);

      
    } catch (error) {
      console.error("Error fetching data:", error);
      // alert("Error fetching data. Please try again later.");
    } 
  };

  ///here

  async function fetchWeatherDetails() {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=${
          celsius ? "metric" : ""
        }`
      );
      let data = await res.json();
      setWeather(data);
      if (data.cod !== 200) {
        setArea("bengaluru");
        alert("City not found, Please check your City Name");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWeatherFive() {
    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${area}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=${
          celsius ? "metric" : ""
        }`
      );
      let data = await res.json();
      setWeather5(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherDetails();
    fetchWeatherFive();
  }, [area, celsius]);

  return (
    <div className={style.app}>
      <Day weather={weather} />
      <FiveDay weatherFive={weather5?.list} />
    </div>
  );
}

export default App;
