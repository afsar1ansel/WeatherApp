import { FaLocationDot } from "react-icons/fa6";
import style from "../App.module.css";
import MapComponent from "./Map";
import { TbWorldSearch } from "react-icons/tb";
import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import Icon from "./Icon";

export default function FiveDay({ weatherFive }) {
  const { area, setArea, getTime, celsius, setCelsius } = useContext(Context);

  const decodeAndExtractData = (weatherData) => {
    const groupedByDay = {};

    // Group data by day
    weatherData.forEach((entry) => {
      const date = entry.dt_txt.split(" ")[0];
      if (!groupedByDay[date] && Object.keys(groupedByDay).length < 5) {
        if (!groupedByDay[date]) {
          groupedByDay[date] = {
            dates: [],
            temperatures: [],
            descriptions: [],
            icons: [],
          };
        }

        groupedByDay[date].dates.push(entry.dt_txt);
        groupedByDay[date].temperatures.push(entry.main.temp);
        groupedByDay[date].descriptions.push(entry.weather[0].description);
        groupedByDay[date].icons.push(entry.weather[0].icon);
      }
    });

    // Extracted data for each day
    const decodedData = Object.entries(groupedByDay).map(([date, data]) => ({
      date: date,
      averageTemperature:
        data.temperatures.reduce((sum, temp) => sum + temp, 0) /
        data.temperatures.length,
      description: data.descriptions[0],
      icon: data.icons[0],
    }));

    return decodedData;
  };
  
  const firstFiveData = decodeAndExtractData(weatherFive || []); 
  console.log(firstFiveData);

  return (
    <div className={style.fiveDayBox}>
      {firstFiveData.map((data, index) => (
        <div className={style.fiveDays} key={index}>
          <h3>{data.date}</h3>
          <p >{data.averageTemperature.toFixed(2)}°C</p>
         <img src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`} alt="icon" />
          <p >{data.description}</p>
        </div>
      ))}
    </div>
  );
}
