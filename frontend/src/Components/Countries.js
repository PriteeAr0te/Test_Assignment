import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import { Card } from 'react-bootstrap';

const Countries = () => {
  const { data } = useContext(dataContext);

  const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedCountry) {
      console.log(`Selected Country: ${selectedCountry}`);
    }
  }, [selectedCountry]);

  const uniqueCountries = [...new Set(data.map((item) => item.country))].filter(country => country !== ""); // Exclude empty strings
  const countryFrequency = uniqueCountries.reduce((acc, country) => {
    acc[country] = (acc[country] || 0) + 1;
    return acc;
  }, {});

  const topCountries = Object.keys(countryFrequency)
    .sort((a, b) => countryFrequency[b] - countryFrequency[a])
    .slice(0, 10);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
  };

  return (
    <div className="mb-3">
      <form>
        <h2 className="mt-5" style={{ color: '#bc6c25' }}>
          <label className="form-label">Select Country:</label>
        </h2>
        <div
          style={{
            color: 'black',
            background: '#dda15e',
            padding: '20px',
            borderRadius: '8px',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '15px',
            alignItems: 'center',
            margin: '20px auto',
          }}
        >
          {topCountries.map((country) => (
            <div key={country} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${country}`}
                value={country}
                checked={selectedCountry === country}
                onChange={() => handleCountryChange(country)}
              />
              <label className="form-check-label" htmlFor={`radio-${country}`}>
                {country}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedCountry && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px' }}>
          {data
            .filter((item) => item.country === selectedCountry)
            .map((item) => (
              <Card key={item._id} style={{ width: '18rem', background: '#a3b18a' }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"><strong>Intensity:</strong> {item.intensity}</Card.Subtitle>
                  <Card.Text>
                    <strong>Region:</strong> {item.region}
                    <br />
                    <strong>Sector:</strong> {item.sector}
                    <br />
                    <strong>Likelihood:</strong> {item.likelihood}
                    <br />
                    <strong>Topic:</strong> {item.topic}
                    <br />
                    <strong>Source:</strong> {item.source}
                    <br />
                    <strong>Pestle:</strong> {item.pestle}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
