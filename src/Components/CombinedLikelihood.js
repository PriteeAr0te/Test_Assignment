import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataContext from '../Context/Data/dataContext';

// ... (previous imports and code)

const CombinedLikelihood = ({ dimensions }) => {
    const { data } = useContext(dataContext);
    const svgRef = useRef();

    useEffect(() => {
        // JSON data
        const jsonData = data;

        // Function to truncate title to a specified length
        function truncateTitle(title, maxLength) {
            return title.length > maxLength ? `${title.substr(0, maxLength)}...` : title;
        }

        // Assume you have a getTopCombined function that returns an array of combined dimensions
        function getTopCombined(data, limit, dimensions) {
            const sortedData = data.slice().sort((a, b) => {
                for (const dimension of dimensions) {
                    const valueA = a[dimension];
                    const valueB = b[dimension];

                    if (valueA < valueB) {
                        return 1;
                    } else if (valueA > valueB) {
                        return -1;
                    }
                }

                return 0;
            });

            const topCombined = sortedData.slice(0, limit).map(item => ({
                ...item,
                likelihood: item.likelihood || 0,
                title: truncateTitle(item.title, 15),
            }));

            return topCombined;
        }

        const topCombined = getTopCombined(jsonData, 20, dimensions);

        // D3 code for creating the bar chart
        const margin = { top: 20, right: 0, bottom: 90, left: 30 };
        const width = 480 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const scaleX = d3.scaleBand()
            .domain(topCombined.map(item => dimensions.map(dimension => item[dimension]).join('-')))
            .range([0, width])
            .padding(0.5);

        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(topCombined, ({ likelihood }) => likelihood)])
            .range([height, 0]);

        const svg = d3.select(svgRef.current);

        svg.selectAll("*").remove(); // Clear previous content

        svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        svg
            .select("g")
            .append("g")
            .call(d3.axisBottom(scaleX))
            .attr("transform", `translate(0, ${height})`)
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end")
            .text(item => {
                const dataItem = topCombined.find(data => dimensions.map(dimension => data[dimension]).join('-') === item);
                return dataItem ? dataItem.title : '';
            });
        svg
            .select("g")
            .append("g")
            .call(d3.axisLeft(scaleY));

        svg
            .select("g")
            .selectAll(".bar")
            .data(topCombined)
            .enter()
            .append("rect")
            .attr("class", "bar")
            .attr("x", item => scaleX(dimensions.map(dimension => item[dimension]).join('-')))
            .attr("y", item => scaleY(item.likelihood))
            .attr("width", scaleX.bandwidth())
            .attr("fill", "#fb8500")
            .attr("height", item => height - scaleY(item.likelihood));

    }, []);

    return (
        <div className='mt-5'>
            <h3>{`Top Combined by ${dimensions.join(', ')}`}</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default CombinedLikelihood;
