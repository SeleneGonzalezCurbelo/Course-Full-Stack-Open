const CountryList = ({ countries, onShowDetails }) => {
    
    if (!countries || countries.length === 0) return null;

    return (
      <ul>
        {countries.map(country => (
          <li key={country.cca3}>
            {country.name.common} 
            <button onClick={() => onShowDetails(country)}>Show</button>
          </li>
        ))}
      </ul>
    );
  };

  export default CountryList