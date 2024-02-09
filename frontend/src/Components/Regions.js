import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import { Card } from 'react-bootstrap';

const Regions = () => {
  const { data } = useContext(dataContext);

  const [selectedRegion, setSelectedRegion] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedRegion) {
      console.log(`Selected Region: ${selectedRegion}`);
    }
  }, [selectedRegion]);

  const uniqueRegions = [...new Set(data.map((item) => item.region))];
  const regionFrequency = uniqueRegions.reduce((acc, region) => {
    acc[region] = (acc[region] || 0) + 1;
    return acc;
  }, {});

  const topRegions = Object.keys(regionFrequency)
    .sort((a, b) => regionFrequency[b] - regionFrequency[a])
    .filter((region) => region !== "")
    .slice(0, 10);

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
  };

  return (
    <div className="mb-3">
      <form>
        <h2 className="mt-5" style={{ color: '#bc6c25' }}>
          <label className="form-label">Select Region:</label>
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
          {topRegions.map((region) => (
            <div key={region} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${region}`}
                value={region}
                checked={selectedRegion === region}
                onChange={() => handleRegionChange(region)}
              />
              <label className="form-check-label" htmlFor={`radio-${region}`}>
                {region}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedRegion && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px' }}>
          {data
            .filter((item) => item.region === selectedRegion)
            .map((item) => (
              <Card key={item._id} style={{ width: '18rem', background: '#a3b18a' }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2"><strong>Region:</strong> {item.region}</Card.Subtitle>
                  <Card.Text>
                    <strong>Intensity:</strong> {item.intensity}
                    <br />
                    <strong>Topic:</strong> {item.topic}
                    <br />
                    <strong>Sector:</strong> {item.sector}
                    <br />
                    <strong>Country:</strong> {item.country}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Regions;
