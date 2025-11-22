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

            // Animate bars entrance with staggered delay
            g.selectAll('.bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .attr('x', d => x(d.status))
                .attr('y', height)
                .attr('width', x.bandwidth())
                .attr('height', 0)
                .attr('fill', d => d.color || 'var(--color-primary)')
                .attr('rx', 4) // Rounded corners for modern look
                .attr('ry', 4)
                .style('cursor', 'pointer')
                .transition()
                .duration(800)
                .delay((d, i) => i * 150) // Staggered animation
                .ease(d3.easeBackOut.overshoot(0.5))
                .attr('y', d => y(d.count))
                .attr('height', d => height - y(d.count));

            // Add hover effect
            g.selectAll('.bar')
                .on('mouseenter', function () {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 0.8);
                })
                .on('mouseleave', function () {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr('opacity', 1);
                });

            // Add labels with animation
            g.selectAll('.bar-label')
                .data(data)
                .enter()
                .append('text')
                .attr('class', 'bar-label')
                .attr('x', d => x(d.status) + x.bandwidth() / 2)
                .attr('y', height)
                .attr('text-anchor', 'middle')
                .text(d => d.count)
                .style('fill', 'var(--color-text-primary)')
                .style('font-size', '14px')
                .style('font-weight', '700')
                .style('opacity', 0)
                .transition()
                .duration(600)
                .delay((d, i) => 800 + i * 150) // Sync with bar animation
                .ease(d3.easeBackOut)
                .attr('y', d => y(d.count) - 8)
                .style('opacity', 1);
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
