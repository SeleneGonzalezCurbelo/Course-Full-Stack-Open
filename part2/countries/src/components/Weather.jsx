import weatherService from '../services/weather'
import React, { useState, useEffect } from 'react';

const Weather = ({ country }) => {
  
  const [weather, setWeather] = useState(''); 
  const [weatherImage, setWeatherImage] = useState('');

  console.log('capital')
  console.log(country.capital)

  useEffect(() => {
    if (country.capital) {

      console.log('uwu')

      weatherService
        .getWeatherCountry(country.capital)
        .then(response => {
          setWeather(response.data);

          console.log('weather')
          console.log(weather)

          const weatherIconCode = response.data.weather[0].icon; 
          setWeatherImage(weatherService.getPhotoWeather(weatherIconCode));
        })
        .catch(error => {
          console.error("Error fetching weather data", error);
        });
    }
  }, [country]);

    if (!weather) {
      return <p>Loading weather data...</p>;
    }

    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)} °C</p>
        <img className='imgWeather' src={weatherImage} alt="Weather icon" />
        <p>Wind: {weather.wind.speed} m/s</p>
      </div>
    );
  };

  export default Weather