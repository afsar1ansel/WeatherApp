import { useContext, useEffect, useState } from 'react';
import Day from './components/Day';
import style from './App.module.css';
import { Context } from './context/Context';
import FiveDay from './components/FiveDay';

function App() {
  const { area, celsius } = useContext(Context);
  const [weather, setWeather] = useState(null);
  const [weather5, setWeather5] = useState(null);

  async function fetchWeatherDetails() {
    try {
      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=${celsius ? 'metric' : ''}`);
      let data = await res.json();
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  }

  async function fetchWeatherFive() {
    try {
      let res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${area}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=${celsius ? 'metric' : ''}`);
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
    
      <div style={{ backgroundImage: `url("https://res.cloudinary.com/dannycoder/image/upload/v1450159983/rainy_fx8qwt.jpg")` }} className={style.app}>
        <Day weather={weather} />
      <FiveDay weatherFive={weather5?.list} />
      </div>
    
  );
}

export default App;
