import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataContext from '../Context/Data/dataContext';

const Likelihood = ({ dimension }) => {
    const { data } = useContext(dataContext);
    const svgRef = useRef();

    useEffect(() => {
        // JSON data
        const jsonData = data;

        // Assume you have a getTopLikelihoods function that returns an array of likelihoods based on the specified dimension
        function getTopLikelihoods(data, limit, dimension) {
            const sortedData = data.slice().sort((a, b) => {
                if (dimension === 'start_year' || dimension === 'region') {
                    return a[dimension].localeCompare(b[dimension]);
                } else {
                    return b[dimension] - a[dimension];
                }
            });
            const topLikelihoods = sortedData.slice(0, limit);

            return topLikelihoods;
        }

        const topLikelihoods = getTopLikelihoods(jsonData, 10, dimension);

        // D3 code for creating the line chart
        const margin = { top: 20, right: 0, bottom: 83, left: 30 };
        const width = 480 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const scaleX = d3.scaleBand()
            .domain(topLikelihoods.map(({ [dimension]: dim }) => dim))
            .range([0, width])
            .padding(0.5);

        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(topLikelihoods, ({ intensity }) => intensity)])
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
            .style("text-anchor", "end");

        svg
            .select("g")
            .append("g")
            .call(d3.axisLeft(scaleY));

        const line = d3.line()
            .x((_, i) => scaleX(topLikelihoods[i][dimension]) + scaleX.bandwidth() / 2)
            .y(({ intensity }) => scaleY(intensity));

        svg
            .select("g")
            .append("path")
            .datum(topLikelihoods)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line);

    }, [data, dimension]);

    return (
        <div className='mt-5'>
            <h3>{`Top Likelihoods by ${dimension}`}</h3>
            <svg ref={svgRef}></svg>
        </div>
    );
}

export default Likelihood;
