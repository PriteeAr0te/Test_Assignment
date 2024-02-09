import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataContext from '../Context/Data/dataContext';

const Barchart = () => {
    const { data } = useContext(dataContext);
    const svgRef = useRef();

    useEffect(() => {
        // JSON data
        const jsonData = data;

        function getTopCountries(data, limit) {
            // Create an object to store country counts
            const countryCounts = {};

            // Loop through the data and count occurrences of each country
            data.forEach((item) => {
                const country = item.country;

                // Check if the country is not an empty string
                if (country) {
                    // If the country already exists, increment the count, otherwise set the count to 1
                    countryCounts[country] = (countryCounts[country] || 0) + 1;
                }
            });

            // Convert the object to an array of { country, count } objects
            const countryArray = Object.entries(countryCounts).map(([country, count]) => ({
                country,
                count,
            }));

            // Sort the array in descending order based on count
            countryArray.sort((a, b) => b.count - a.count);

            // Return the top 'limit' countries
            return countryArray.slice(0, limit);
        }

        const topCountries = getTopCountries(jsonData, 6);

        // D3 code for creating the bar chart
        const margin = { top: 20, right: 0, bottom: 20, left: 30 };
        const width = 480 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const scaleX = d3.scaleBand()
            .domain(topCountries.map(({ country }) => country))
            .range([0, width])
            .padding(0.5);
        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(topCountries, ({ count }) => count)])
            .range([height, 0]);

        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove(); 

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg
            .select("g")
            .append("g")
            .call(d3.axisBottom(scaleX))
            .attr("transform", `translate(0, ${height})`);

        svg
            .select("g")
            .append("g")
            .call(d3.axisLeft(scaleY));

        svg
            .select("g")
            .selectAll(".bar")
            .data(topCountries)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", ({ country }) => scaleX(country))
            .attr("y", ({ count }) => scaleY(count))
            .attr("width", scaleX.bandwidth())
            .attr("fill", "#fb8500")
            .attr("height", ({ count }) => height - scaleY(count));
    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
}

export default Barchart;
