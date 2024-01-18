import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import * as d3 from 'd3';

const Sectors = () => {
  const { data } = useContext(dataContext);

  const [selectedSector, setSelectedSector] = useState('');

  useEffect(() => {
    // useEffect logic
    if (selectedSector) {
      console.log(`Selected Sector: ${selectedSector}`);
      // You can perform additional logic here based on the selectedSector
    }
  }, [selectedSector]);

  const uniqueSectors = [...new Set(data.map((item) => item.sector))];
  const sectorFrequency = uniqueSectors.reduce((acc, sector) => {
    if (sector !== "") {
      acc[sector] = (acc[sector] || 0) + 1;
    }
    return acc;
  }, {});

  const topSectors = Object.keys(sectorFrequency)
    .sort((a, b) => sectorFrequency[b] - sectorFrequency[a])
    .filter((sector) => sector !== "")
    .slice(0, 10);


  const handleSectorChange = (sector) => {
    setSelectedSector(sector);
  };

  useEffect(() => {
    if (selectedSector) {
      renderBarChart(selectedSector);
    }
  }, [selectedSector]);

  const renderBarChart = (selectedSector) => {
    // Filter data based on the selected sector
    const filteredData = data.filter((item) => item.sector === selectedSector);

    // Prepare data for the bar chart
    const chartData = filteredData.map((item) => ({ region: item.region, intensity: item.intensity }));

    // Clear existing chart if any
    d3.select("#bar-chart-container").selectAll("*").remove();

    // Set up the chart dimensions
    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 90, left: 50 };

    // Create the SVG container
    const svg = d3
      .select("#bar-chart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Create the scales
    const xScale = d3.scaleBand().domain(chartData.map((d) => d.region)).range([0, width - margin.left - margin.right]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(chartData, (d) => d.intensity)]).range([height - margin.top - margin.bottom, 0]);

    // Create the bars
    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "#457b9d")
      .attr("x", (d) => xScale(d.region))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d.intensity))
      .attr("height", (d) => height - margin.top - margin.bottom - yScale(d.intensity));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom + 10})`)
      .call(d3.axisBottom(xScale).tickFormat((d) => (d === "" || typeof d === "undefined" ? "Unknown Label" : d)))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
      .style("fill", "#e9edc9"); 

    // Style the x-axis line
    svg
      .select(".domain") 
      .style("stroke-width", "4px")
      .style("stroke", "#bc6c25");

    // Style the x-axis ticks
    svg
      .selectAll(".tick line")
      .style("stroke-width", "4px")
      .style("stroke", "#bc6c25");

    svg.append("g")
      .attr("transform", `translate(0,0)`)
      .call(d3.axisLeft(yScale))
      .selectAll("path, line")
      .style("stroke-width", "4px")
      .style("stroke", "#bc6c25")
      .style("shape-rendering", "crispEdges");
  };

  return (
    <div className="mb-3">
      <form>
        <h2 className="mt-5" style={{ color: '#bc6c25' }}>
          <h2><label className="form-label">Select Sector:</label></h2>
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
          {topSectors.map((sector) => (
            <div key={sector} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${sector}`}
                value={sector}
                checked={selectedSector === sector}
                onChange={() => handleSectorChange(sector)}
              />
              <label className="form-check-label" htmlFor={`radio-${sector}`}>
                {sector}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedSector && (
        <div className='mt-5'>
          <h3 style={{ color: '#bc6c25' }}>Bar Chart for {selectedSector}</h3>
          <div id="bar-chart-container"></div>
        </div>
      )}
    </div>
  );
};

export default Sectors;
