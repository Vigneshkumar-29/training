import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './ProjectsChart.css';

const ProjectsChart = ({ data }) => {
    const chartRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0 || !containerRef.current) return;

        const createBarChart = () => {
            const container = containerRef.current;
            const svg = d3.select(chartRef.current);
            const margin = { top: 20, right: 30, bottom: 40, left: 50 };
            const width = container.clientWidth - margin.left - margin.right;
            const height = container.clientHeight - margin.top - margin.bottom;

            svg.selectAll('*').remove();
            const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

            const x = d3
                .scaleBand()
                .range([0, width])
                .padding(0.1)
                .domain(data.map(d => d.status));

            const y = d3
                .scaleLinear()
                .range([height, 0])
                .domain([0, d3.max(data, d => d.count) + 10]);

            g.append('g')
                .attr('transform', `translate(0,${height})`)
                .call(d3.axisBottom(x))
                .selectAll('text')
                .style('font-size', '12px')
                .style('fill', 'var(--color-text-secondary)');

            g.append('g')
                .call(d3.axisLeft(y))
                .selectAll('text')
                .style('font-size', '12px')
                .style('fill', 'var(--color-text-secondary)');

            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.status))
                .attr('y', d => y(d.count))
                .attr('width', x.bandwidth())
                .attr('height', d => height - y(d.count))
                .attr('fill', d => d.color || 'var(--color-primary)')
                .on('mouseover', function (event, d) {
                    d3.select(this).attr('opacity', 0.8);
                    const tooltip = d3
                        .select('body')
                        .append('div')
                        .attr('class', 'chart-tooltip')
                        .style('position', 'absolute')
                        .style('background', 'var(--color-white)')
                        .style('border', '1px solid var(--color-border)')
                        .style('padding', '8px 12px')
                        .style('border-radius', '4px')
                        .style('box-shadow', 'var(--card-shadow)')
                        .style('font-size', '13px')
                        .style('pointer-events', 'none')
                        .style('z-index', '9999')
                        .html(`<strong>${d.status}</strong>: ${d.count}`);
                    tooltip
                        .style('left', event.pageX + 10 + 'px')
                        .style('top', event.pageY - 20 + 'px');
                })
                .on('mouseout', function () {
                    d3.select(this).attr('opacity', 1);
                    d3.select('.chart-tooltip').remove();
                });

            g.selectAll('.bar-label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'bar-label')
                .attr('x', d => x(d.status) + x.bandwidth() / 2)
                .attr('y', d => y(d.count) - 5)
                .attr('text-anchor', 'middle')
                .text(d => d.count)
                .style('fill', 'var(--color-text-primary)')
                .style('font-size', '12px')
                .style('font-weight', '500');
        };

        createBarChart();

        const handleResize = () => {
            createBarChart();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [data]);

    return (
        <div ref={containerRef} className="chart-container">
            <svg ref={chartRef} width="100%" height="100%"></svg>
        </div>
    );
};

export default ProjectsChart;
