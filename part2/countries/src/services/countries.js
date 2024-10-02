import axios from 'axios'
const allUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const countryUrl = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const getAll = () => {
  return axios.get(allUrl)
}

const getCountry = (nameCountry) => {
    return axios.get(`${countryUrl}/${nameCountry}`)
}

export default { 
  getAll: getAll, 
  getCountry: getCountry,
}