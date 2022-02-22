import React, { useEffect, useState } from 'react'

function WeatherApp() {
    const [weatherData, setWeatherData] = useState({});
    const [cityName, setCityName] = useState("new york");
    const [locationCity, setLocationCity] = useState({})
    const [searchCity, setSearchCity] = useState("");

    useEffect(()=>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                setLocationCity(position)
                setCityName("")
            },(err)=>{
                console.log(err);
                setSearchCity(cityName)
            })
        } else{
            alert("Browser not supported geolocation")
        }
    },[])

    useEffect(()=>{
        let query = locationCity && locationCity.coords 
            ? `lat=${locationCity.coords.latitude}&lon=${locationCity.coords.longitude}` 
            : `q=${searchCity ? searchCity : cityName}`
      fetch(`https://api.openweathermap.org/data/2.5/weather?${query}&appid=0e41a976732ba681544195060a5a5bf4&units=metric`)
      .then((response)=>response.json())
      .then((result)=>{
        setWeatherData(result)
      }).catch((err)=>{
        console.log(err);
      })
    },[searchCity,locationCity])
    const search = (e) => {
        if(e.key == "Enter"){
            setSearchCity(cityName)
            setLocationCity({})
            setCityName("")
        }
    }
    return (
      <div className='d-flex justify-content-center'>
        <div className='flex-column my-3 w-25'>
          <h1 className='p-3'>Weather App</h1>
          <input placeholder='Enter city' value={cityName} onKeyDown={search} onChange={(e)=>setCityName(e.target.value)} className='form-control mx-3' />
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

export default WeatherApp