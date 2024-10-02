import './index.css';
import React, { useState, useEffect } from 'react';
import countriesService from './services/countries'
import CountryDetails from './components/CountryDetails';
import CountryList from './components/CountryList';

const App = () => {

  const [inputValue, setInputValue] = useState(''); 
  const [countries, setCountries] = useState([]);
  const [filteredCountry, setFilteredCountry] = useState(null); 
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    countriesService
        .getAll()
        .then(response => {
          setCountries(response.data);
        });
  }, []);

  const checkCountry = () => {
    return filteredCountries.length > 10;
  }

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setShowDetails(false);
    setFilteredCountry(null);
  };

  const handleShowDetails = (country) => {
    setFilteredCountry(country);
    setShowDetails(true);
  };

  useEffect(() => {
    if (filteredCountries.length === 1) {
      setFilteredCountry(filteredCountries[0]);
      setShowDetails(true);
    }
  }, [filteredCountries]);

  useEffect(() => {
    if (showDetails && filteredCountry) {
      countriesService
        .getCountry(filteredCountry.name.common.toLowerCase())
        .then(response => {
          setFilteredCountry(response.data);
        });
    } 
  }, [showDetails, filteredCountry]);

  return (
    <div className="body">
        <p className="inline-elements">Find countries </p>
        <input 
          className="inline-elements" 
          value={inputValue} 
          onChange={handleInputChange}
        />
        <ul>
          {checkCountry() ? (
            <li>Too many matches, specify another filter</li>
          ) : (
            filteredCountries.length === 0 ? (
              <li>No countries match your search.</li>
            ) : (
              showDetails && filteredCountry ? (
                <CountryDetails country={filteredCountry} />
              ) :  (
                <CountryList countries={filteredCountries} onShowDetails={handleShowDetails} />
              )
            )
          )}
        </ul>
    </div>
  );
}

export default App;
