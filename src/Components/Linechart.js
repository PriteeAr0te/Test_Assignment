import React, { useContext, useEffect, useRef } from 'react';
import * as d3 from 'd3';
import dataContext from '../Context/Data/dataContext';

const LineChart = () => {
    const { data } = useContext(dataContext);
    const svgRef = useRef();

    useEffect(() => {
        // JSON data
        const jsonData = data;

        function getTopSectors(data, limit) {
            const sectorIntensities = {};
            data.forEach((item) => {
                const sector = item.sector;
                const intensity = item.intensity;
                if (sector && intensity !== undefined) {
                    if (!sectorIntensities[sector] || intensity > sectorIntensities[sector]) {
                        sectorIntensities[sector] = intensity;
                    }
                }
            });

            const sectorArray = Object.entries(sectorIntensities).map(([sector, intensity]) => ({
                sector,
                intensity,
            }));

            sectorArray.sort((a, b) => b.intensity - a.intensity);

            return sectorArray.slice(0, limit);
        }
        const topSectors = getTopSectors(jsonData, 10);

        // D3 code for creating the line chart
        const margin = { top: 20, right: 0, bottom: 83, left: 30 };
        const width = 480 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const scaleX = d3.scaleBand()
            .domain(topSectors.map(({ sector }) => sector))
            .range([0, width])
            .padding(0.5);

        const scaleY = d3.scaleLinear()
            .domain([0, d3.max(topSectors, ({ intensity }) => intensity)])
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
            .attr("transform", `translate(0, ${height})`)
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");

        svg
            .select("g")
            .append("g")
            .call(d3.axisLeft(scaleY));


        const line = d3.line()
            .x((_, i) => scaleX(topSectors[i].sector) + scaleX.bandwidth() / 2)
            .y(({ intensity }) => scaleY(intensity));

        svg
            .select("g")
            .append("path")
            .datum(topSectors)
            .attr("fill", "none")
            .attr("stroke", "blue")
            .attr("stroke-width", 2)
            .attr("d", line);

    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    );
}

export default LineChart;
