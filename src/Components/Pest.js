import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import { Card } from 'react-bootstrap';

const PestleFilter = () => {
  const { data } = useContext(dataContext);

  const [selectedPestle, setSelectedPestle] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedPestle) {
      console.log(`Selected PESTLE: ${selectedPestle}`);
    }
  }, [selectedPestle]);

  const uniquePestles = [...new Set(data.map((item) => item.pestle))].filter(pestle => pestle !== "");
  const pestleFrequency = uniquePestles.reduce((acc, pestle) => {
    acc[pestle] = (acc[pestle] || 0) + 1;
    return acc;
  }, {});

  const topPestles = Object.keys(pestleFrequency)
    .sort((a, b) => pestleFrequency[b] - pestleFrequency[a])
    .slice(0, 10);

  const handlePestleChange = (pestle) => {
    setSelectedPestle(pestle);
  };

  return (
    <div className="mb-3">
      <form>
        <h2 className="mt-5" style={{ color: '#bc6c25' }}>
          <label className="form-label">Select PESTLE:</label>
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
          {topPestles.map((pestle) => (
            <div key={pestle} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${pestle}`}
                value={pestle}
                checked={selectedPestle === pestle}
                onChange={() => handlePestleChange(pestle)}
              />
              <label className="form-check-label" htmlFor={`radio-${pestle}`}>
                {pestle}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedPestle && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px' }}>
          {data
            .filter((item) => item.pestle === selectedPestle)
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

export default PestleFilter;
