import React, {useState} from "react";
export const Context = React.createContext();

const MyContext = ({children})  => {
    const [area, setArea] = useState("bengaluru");
    const [celsius, setCelsius] = useState(true);

    function getTime(timezone) {
        let amOrpm;
        let dateTime = new Date(timezone * 1000);
        let month = [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "may",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Now",
          "Dec",
        ];
        let hour;
        let date;
        let min;
        if (dateTime.getHours() % 12 < 10) {
          hour = `0${dateTime.getHours() % 12}`;
        } else {
          hour = `${dateTime.getHours() % 12}`;
        }
        if (dateTime.getDate() < 10) {
          date = `0${dateTime.getDate()}`;
        } else {
          date = `${dateTime.getDate()}`;
        }
        if (dateTime.getMinutes() < 10) {
          min = `0${dateTime.getMinutes()}`;
        } else {
          min = `${dateTime.getMinutes()}`;
        }
        if (dateTime.getHours() > 12) {
          amOrpm = "PM";
        } else {
          amOrpm = "AM";
        }

    
        return `${month[dateTime.getMonth()]}${date}, ${hour}:${min} ${amOrpm}`;
    
      }
    

    return (
        <Context.Provider value={{area, setArea, getTime, celsius, setCelsius}}>
            {children}
        </Context.Provider>
    )
    
}

export default MyContext