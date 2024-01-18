import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import { Card } from 'react-bootstrap';

const SwotFilter = () => {
  const { data } = useContext(dataContext);

  const [selectedSwot, setSelectedSwot] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedSwot) {
      console.log(`Selected SWOT: ${selectedSwot}`);
    }
  }, [selectedSwot]);

  const uniqueSwots = [...new Set(data.map((item) => item.topic))].filter(swot => swot !== "");
  const swotFrequency = uniqueSwots.reduce((acc, swot) => {
    acc[swot] = (acc[swot] || 0) + 1;
    return acc;
  }, {});

  const topSwots = Object.keys(swotFrequency)
    .sort((a, b) => swotFrequency[b] - swotFrequency[a])
    .slice(0, 10);

  const handleSwotChange = (swot) => {
    setSelectedSwot(swot);
  };

  return (
    <div className="mb-3">
      <form>
        <h2 className="mt-5" style={{ color: '#bc6c25' }}>
          <label className="form-label">Select SWOT:</label>
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
          {topSwots.map((swot) => (
            <div key={swot} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${swot}`}
                value={swot}
                checked={selectedSwot === swot}
                onChange={() => handleSwotChange(swot)}
              />
              <label className="form-check-label" htmlFor={`radio-${swot}`}>
                {swot}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedSwot && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px' }}>
          {data
            .filter((item) => item.topic === selectedSwot)
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

export default SwotFilter;
