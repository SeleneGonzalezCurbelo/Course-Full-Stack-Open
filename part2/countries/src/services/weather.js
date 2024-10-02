import axios from 'axios';
console.log(import.meta.env);

const apiKey = process.env.REACT_APP_API_KEY; 
console.log(apiKey)
const urlWeatherCountry = 'https://api.openweathermap.org/data/2.5/weather';
const urlPhotoWeather = 'https://openweathermap.org/img/wn'

const getWeatherCountry = (nameCountry) => {

  console.log('nameCountry')
  console.log(nameCountry)
  
  return axios.get(`${urlWeatherCountry}?q=${nameCountry}&appid=${apiKey}`);
};

const getPhotoWeather = (codeWeather) => {
  return `${urlPhotoWeather}/${codeWeather}@2x.png`;
}

export default { 
  getWeatherCountry: getWeatherCountry,
  getPhotoWeather: getPhotoWeather
};
