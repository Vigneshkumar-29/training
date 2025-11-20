import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import './ClientsChart.css';

const ClientsChart = ({ data }) => {
    const chartRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        if (!data || data.length === 0 || !containerRef.current) return;

        const createPieChart = () => {
            const container = containerRef.current;
            const svg = d3.select(chartRef.current);
            const width = container.clientWidth;
            const height = container.clientHeight;
            const radius = Math.min(width, height) / 2 - 20;

            svg.selectAll('*').remove();
            const g = svg
                .append('g')
                .attr('transform', `translate(${width / 2},${height / 2})`);

            const pie = d3.pie().value(d => d.count);
            const arc = d3.arc().innerRadius(radius * 0.6).outerRadius(radius);
            const outerArc = d3.arc().innerRadius(radius * 0.9).outerRadius(radius * 0.9);

            // Create arc generator for animation
            const arcTween = function (d) {
                const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
                return function (t) {
                    return arc(interpolate(t));
                };
            };

            // Animate donut slices entrance
            g.selectAll('slices')
                .data(pie(data))
                .enter()
                .append('path')
                .attr('fill', d => d.data.color || 'var(--color-primary)')
                .attr('stroke', 'var(--color-white)')
                .style('stroke-width', '2px')
                .style('opacity', 0.9)
                .transition()
                .duration(1200)
                .ease(d3.easeCubicOut)
                .attrTween('d', arcTween);

            // Animate polylines (leader lines)
            g.selectAll('polyline')
                .data(pie(data))
                .enter()
                .append('polyline')
                .attr('stroke', 'var(--color-text-secondary)')
                .style('fill', 'none')
                .attr('stroke-width', 1)
                .style('opacity', 0)
                .attr('points', function (d) {
                    const posA = arc.centroid(d);
                    const posB = outerArc.centroid(d);
                    const posC = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    posC[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return [posA, posB, posC];
                })
                .transition()
                .duration(800)
                .delay(1000)
                .ease(d3.easeCubicOut)
                .style('opacity', 1);

            // Animate labels
            g.selectAll('slice-labels')
                .data(pie(data))
                .enter()
                .append('text')
                .attr('transform', function (d) {
                    const pos = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    pos[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                .style('text-anchor', function (d) {
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    return midangle < Math.PI ? 'start' : 'end';
                })
                .text(d => d.data.status)
                .style('font-size', 13)
                .style('font-weight', '600')
                .style('fill', 'var(--color-text-primary)')
                .style('opacity', 0)
                .transition()
                .duration(600)
                .delay(1200)
                .ease(d3.easeCubicOut)
                .style('opacity', 1);
        };

        createPieChart();

        const handleResize = () => {
            createPieChart();
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

export default ClientsChart;
