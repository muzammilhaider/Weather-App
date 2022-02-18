import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [weatherData, setWeatherData] = useState({});
  const [cityName, setCityName] = useState("");
  const [searchCity, setSearchCity] = useState("karachi");
  useEffect(()=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=0e41a976732ba681544195060a5a5bf4&units=metric`)
    .then((response)=>response.json())
    .then((result)=>{
      setWeatherData(result)
    }).catch((err)=>{
      console.log(err);
    })
  },[cityName])
  const search = () => {
    setSearchCity(cityName)
  }
  return (
    <div className='d-flex justify-content-center'>
      <div className='flex-column my-3 w-25'>
        <h1 className='p-3'>Weather App</h1>
        <input placeholder='Enter city' value={cityName} onChange={(e)=>setCityName(e.target.value)} className='form-control mx-3' />
        <button className='my-3 mx-3 btn btn-info' onClick={search}>SEARCH</button>
        <div className='d-flex mx-3 my-3'>
          <div className='flex-column'>
            <h3 className='d-block py-4'>CITY: {(weatherData && weatherData.name) ? weatherData.name : ''}</h3>
            <h3>TEMP: {(weatherData && weatherData.main && weatherData.main.temp) ? weatherData.main.temp : ''}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
