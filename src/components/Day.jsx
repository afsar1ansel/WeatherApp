import { FaLocationDot } from "react-icons/fa6";
import style from "../App.module.css";
import MapComponent from "./Map";
import { useContext, useState } from "react";
// import { TbWorldSearch } from "react-icons/tb";
import { Context } from "../context/Context";
import Icon from "./Icon";

export default function Day({ weather }) {
  const [searchValue, setSearchValue] = useState("");
  const { area, setArea, getTime, celsius, setCelsius } = useContext(Context);

  function degreesToCompass(degrees) {
    const val = Math.floor(degrees / 22.5 + 0.5);
    const compassDirections = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    return compassDirections[val % 16];
  }

  function handleClick() {
    setArea(searchValue);
  }

  return (
    <div className={style.dayBox}>
      <div className={style.day}>
        <div className={style.top}>
          <div className={style.searchBox}>
            <FaLocationDot className={style.iconn} />
            <input
              type="text"
              name="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="City Name"
              className={style.search}
            />
            <button className={style.btn} onClick={() => handleClick()}>
              Search
            </button>
          </div>
          <div>
            {/* <h4 style={{textAlign: "end"}}>{weather?.sys?.country}</h4> */}
            <p style={{ textAlign: "end" }}>{getTime(weather?.dt)}</p>
          </div>
        </div>
        <div className={style.center}>
          <div className={style.icon}>
            <Icon main={weather?.dt} mi={weather?.weather?.[0]?.main} />
          </div>
          <div className={style.temp}>
            <h1 style={{ fontSize: "3em" }}>
              {weather?.main?.temp}
              {celsius ? "°C" : "°F"}
            </h1>
            <h4 style={{ textAlign: "end" }}>
              Feels {weather?.main?.feels_like}
              {celsius ? "°C" : "°F"}
            </h4>
          </div>
        </div>
        <div>
          <button className={style.tglBtn} onClick={() => setCelsius(!celsius)}>
            {celsius ? "°C" : "°F"}
          </button>
        </div>
        <div className={style.detailBox}>
          <div>
            <h5>
              Max:- {weather?.main?.temp_max} {celsius ? "°C" : "°F"}
            </h5>
          </div>
          <div>
            <h5>
              Min:- {weather?.main?.temp_min} {celsius ? "°C" : "°F"}
            </h5>
          </div>
          <div>
            <h5>Wind:- {weather?.wind?.speed} km/h </h5>
          </div>
          <div><h5>direction</h5></div>
          <div>
            <h5>Humidity:- {weather?.main?.humidity}</h5>
          </div>
          <div>
            <h5>Descripton:- {weather?.weather?.[0]?.description}</h5>
          </div>
        </div>
      </div>
      <div className={style.mapBox}>
        <MapComponent />
      </div>
    </div>
  );
}
