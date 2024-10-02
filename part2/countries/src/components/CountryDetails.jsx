import Weather from "./Weather";

const CountryDetails = ({ country }) => {

    if (!country) return null;
  
    return (
      <div>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h4>Languages:</h4>
        <ul>
          {Object.entries(country.languages).map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img className='imgFlag' src={country.flags.png} alt={country.flags.alt} />

        <Weather country={country}/>
      </div>
    );
  };

  export default CountryDetails