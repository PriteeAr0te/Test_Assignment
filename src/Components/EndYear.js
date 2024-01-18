import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import { Card } from 'react-bootstrap';


const EndYear = () => {
  const { data } = useContext(dataContext);

  const [selectedEndYear, setSelectedEndYear] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedEndYear) {
      console.log(`Selected End Year: ${selectedEndYear}`);
      // You can perform additional logic here based on the selectedEndYear
    }
  }, [selectedEndYear]);

  const uniqueEndYears = [...new Set(data.map((item) => item.end_year))];
  const endYearFrequency = uniqueEndYears.reduce((acc, year) => {
    acc[year] = (acc[year] || 0) + 1;
    return acc;
  }, {});

  const topEndYears = Object.keys(endYearFrequency)
    .sort((a, b) => endYearFrequency[b] - endYearFrequency[a])
    .slice(0, 10);

  const handleEndYearChange = (year) => {
    setSelectedEndYear(year);
  };

  return (
    <div className="mb-3">
        <form>
          <h2 className='mt-5' style={{color: '#bc6c25'}}>
            <label className="form-label">Select End Year:</label>
          </h2>
          <div style={{color: 'black', background: '#dda15e', padding: '20px', borderRadius: '8px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px', alignItems: 'center', margin: '20px auto' }}>
            {topEndYears.map((year) => (
              <div key={year} className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  id={`radio-${year}`}
                  value={year}
                  checked={selectedEndYear === year}
                  onChange={() => handleEndYearChange(year)}
                />
                <label className="form-check-label" htmlFor={`radio-${year}`}>
                  {year}
                </label>
              </div>
            ))}
          </div>
        </form>

      {selectedEndYear && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridGap: '15px' }}>
          {data
            .filter((item) => item.end_year === selectedEndYear)
            .map((item) => (
              <Card key={item._id} style={{ width: '18rem', background:'#a3b18a' }}>
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">{item.country}</Card.Subtitle>
                </Card.Body>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
};

export default EndYear;
