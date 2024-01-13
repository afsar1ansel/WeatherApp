import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../context/Context';
import icon from './icons/weather.svg';
import Thunderstorm from './icons/Thunderstorm.svg';
import Drizzle from './icons/Drizzle.svg';
import Rain from './icons/Rain.svg';
import Snow from './icons/Snow.svg';
import ClearDay from './icons/ClearDay.svg';
import ClearNight from './icons/ClearNight.svg';
import Day from './icons/ClearDay.svg';
import Night from './icons/ClearNight.svg';
import Atmosphere from './icons/Atmosphere.svg';
import CloudyNight from './icons/CloudyNight.svg';
import CloudyDay from './icons/CloudyDay.svg';

const Icon = ({ main, mi }) => {
  const { getTime } = useContext(Context);
  const [value, setValue] = useState({ time: "", am: "" });

  function getdate() {
    const data = getTime(main);
    const time = data[data.length - 8] + data[data.length - 7];
    setValue({ time, am: data[data.length - 2] });
  }

  useEffect(() => {
    getdate();
  }, [main]);

  let selectedIcon = icon;

  
  const hour = parseInt(value.time);
  const isDay = hour >= 6 && hour < 18;

 
  switch (mi) {
    case "Thunderstorm":
      selectedIcon = isDay ? Thunderstorm : Night;
      break;
    case "Drizzle":
      selectedIcon = isDay ? Drizzle : Night;
      break;
    case "Rain":
      selectedIcon = isDay ? Rain : Night;
      break;
    case "Snow":
      selectedIcon = isDay ? Snow : Night;
      break;
    case "Clear":
      selectedIcon = isDay ? ClearDay : ClearNight;
      break;
    case "Atmosphere":
      selectedIcon = isDay ? Atmosphere : Night;
      break;
    case "CloudyNight":
      selectedIcon = CloudyNight;
      break;
    case "CloudyDay":
      selectedIcon = CloudyDay;
      break;
    default:
      selectedIcon = isDay ? Day : Night;
      break;
  }

  return <img style={{ width: "50%" }} src={selectedIcon} alt="" />;
};

export default Icon;
