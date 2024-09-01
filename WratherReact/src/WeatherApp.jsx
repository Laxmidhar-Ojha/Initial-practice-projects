import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

export default function WeatherApp(){
   const [weatherInfo,setWeatherInfo] =useState({
      city:"Khaira",
      feels_like: 33.44,
      humidity: 81,
      temp: 28.45,
      tempMax: 28.45,
      tempMin: 28.45,
      weather: "overcast clouds",
  });

  let updateInfo=(newInfo)=>{
   setWeatherInfo(newInfo);
  }

   return(
    <div style={{textAlign:"center"}}>
    <h2>WeatherApp by Banty</h2>
    <SearchBox updateInfo={updateInfo}/>
    <InfoBox info={weatherInfo}/>
    </div>
   ) 
   
}