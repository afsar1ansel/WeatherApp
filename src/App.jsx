import { useContext, useEffect, useState } from 'react';
import Day from './components/Day';
import style from './App.module.css';
import { Context } from './context/Context';
import FiveDay from './components/FiveDay';

function App() {
  const { area, celsius,setArea } = useContext(Context);
  const [weather, setWeather] = useState(null);
  const [weather5, setWeather5] = useState(null);

  async function fetchWeatherDetails() {
    try {
      let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${area}&appid=1b9f718d43b4721dd314069ebb6e4ebd&units=${celsius ? 'metric' : ''}`);
      let data = await res.json();
      setWeather(data);
     if(data.cod!==200){
      setArea("bengaluru")
       alert("City not found, Please check your City Name");

     }
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
    <div
      style={{
        backgroundImage: `url("https://img.freepik.com/free-photo/sunset-sky-with-clouds-illuminated-vibrant-orange-hues_157027-2890.jpg?t=st=1705221585~exp=1705225185~hmac=6963ce7d275d9b2bab6ba9ff08e405a6c7484550a1a5033f1ff0d1c974b0987e&w=1380")`,
      }}
      className={style.app}
    >
      <Day weather={weather} />
      <FiveDay weatherFive={weather5?.list} />
    </div>
  );
}

export default App;
