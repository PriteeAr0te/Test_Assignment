import React, { useContext, useState, useEffect } from 'react';
import dataContext from '../Context/Data/dataContext';
import * as d3 from 'd3';

const Topics = () => {
  const { data } = useContext(dataContext);

  const [selectedTopic, setSelectedTopic] = useState('');

  useEffect(() => {
    if (selectedTopic) {
      renderBarChart(selectedTopic);
    }
  }, [selectedTopic]);

  const getTopTopics = () => {
    const uniqueTopics = [...new Set(data.map((item) => item.topic))];
    const topicFrequency = uniqueTopics.reduce((acc, topic) => {
      if (topic !== "") {
        acc[topic] = (acc[topic] || 0) + 1;
      }
      return acc;
    }, {});

    const topTopics = Object.keys(topicFrequency)
      .sort((a, b) => topicFrequency[b] - topicFrequency[a])
      .filter((topic) => topic !== "")
      .slice(0, 10);

    return topTopics;
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
  };

  const renderBarChart = (selectedTopic) => {
    const filteredData = data.filter((item) => item.topic === selectedTopic);

    const chartData = filteredData.map((item) => ({ pestle: item.pestle, likelihood: item.likelihood }));

    d3.select("#bar-chart-container").selectAll("*").remove();

    const width = 600;
    const height = 400;
    const margin = { top: 20, right: 20, bottom: 90, left: 50 };

    const svg = d3
      .select("#bar-chart-container")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const xScale = d3.scaleBand().domain(chartData.map((d) => d.pestle)).range([0, width - margin.left - margin.right]).padding(0.1);
    const yScale = d3.scaleLinear().domain([0, d3.max(chartData, (d) => d.likelihood)]).range([height - margin.top - margin.bottom, 0]);

    svg
      .selectAll(".bar")
      .data(chartData)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("fill", "#457b9d")
      .attr("x", (d) => xScale(d.pestle))
      .attr("width", xScale.bandwidth())
      .attr("y", (d) => yScale(d.likelihood))
      .attr("height", (d) => height - margin.top - margin.bottom - yScale(d.likelihood));

    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.top - margin.bottom + 10})`)
      .call(d3.axisBottom(xScale))
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("transform", "rotate(-45)")
      .style("fill", "#e9edc9");

    svg
      .select(".domain")
      .style("stroke-width", "4px")
      .style("stroke", "#bc6c25");

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
          <label className="form-label">Select Topic:</label>
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
          {getTopTopics().map((topic) => (
            <div key={topic} className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                id={`radio-${topic}`}
                value={topic}
                checked={selectedTopic === topic}
                onChange={() => handleTopicChange(topic)}
              />
              <label className="form-check-label" htmlFor={`radio-${topic}`}>
                {topic}
              </label>
            </div>
          ))}
        </div>
      </form>

      {selectedTopic && (
        <div className='mt-5'>
          <h3 style={{ color: '#bc6c25' }}>Bar Chart for {selectedTopic}</h3>
          <div id="bar-chart-container"></div>
        </div>
      )}
    </div>
  );
};

export default Topics;
