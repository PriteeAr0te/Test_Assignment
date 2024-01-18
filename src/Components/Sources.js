import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import { Card } from 'react-bootstrap';

const Sources = () => {
  const { data } = useContext(dataContext);

  const [selectedSource, setSelectedSource] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedSource) {
      console.log(`Selected Source: ${selectedSource}`);
    }
  }, [selectedSource]);

  const uniqueSources = [...new Set(data.map((item) => item.source))];
  const sourceFrequency = uniqueSources.reduce((acc, source) => {
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  const topSources = Object.keys(sourceFrequency)
    .sort((a, b) => sourceFrequency[b] - sourceFrequency[a])
    .filter((source) => source !== "")
    .slice(0, 10);

  const handleSourceChange = (source) => {
    setSelectedSource(source);
  };

  return (
    <div className="mb-3">
      <form>
        <h2 className="mt-5" style={{ color: '#bc6c25' }}>
          <label className="form-label">Select Source:</label>
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
          {topSources.map((source) => (
            <div key={source} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${source}`}
                value={source}
                checked={selectedSource === source}
                onChange={() => handleSourceChange(source)}
              />
              <label className="form-check-label" htmlFor={`radio-${source}`}>
                {source}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedSource && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px' }}>
          {data
            .filter((item) => item.source === selectedSource)
            .map((item) => (
              <Card key={item._id} style={{ width: '18rem', background: '#a3b18a' }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted"><strong>Intensity:</strong> {item.intensity}</Card.Subtitle>
                  <Card.Text>
                    <strong>Sector:</strong> {item.sector}
                    <br />
                    <strong>Topic:</strong> {item.topic}
                    <br />
                    <strong>Region:</strong> {item.region}
                    <br />
                    <strong>Country:</strong> {item.country}
                    <br />
                    <strong>Likelihood:</strong> {item.likelihood}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default Sources;
