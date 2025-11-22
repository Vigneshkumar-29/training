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
            const slices = g.selectAll('slices')
                .data(pie(data))
                .enter()
                .append('path')
                .attr('fill', d => d.data.color || 'var(--color-primary)')
                .attr('stroke', 'var(--color-white)')
                .style('stroke-width', '3px')
                .style('opacity', 0.9)
                .style('cursor', 'pointer')
                .transition()
                .duration(1000)
                .delay((d, i) => i * 200) // Staggered animation
                .ease(d3.easeBackOut.overshoot(0.3))
                .attrTween('d', arcTween);

            // Add interactive hover effects
            g.selectAll('path')
                .on('mouseenter', function (event, d) {
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .ease(d3.easeElastic)
                        .attr('d', d3.arc()
                            .innerRadius(radius * 0.6)
                            .outerRadius(radius * 1.05)(d))
                        .style('opacity', 1);
                })
                .on('mouseleave', function (event, d) {
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .ease(d3.easeElastic)
                        .attr('d', arc(d))
                        .style('opacity', 0.9);
                });

            // Animate polylines (leader lines)
            g.selectAll('polyline')
                .data(pie(data))
                .enter()
                .append('polyline')
                .attr('stroke', 'var(--color-text-secondary)')
                .style('fill', 'none')
                .attr('stroke-width', 1.5)
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
                .duration(600)
                .delay((d, i) => 1000 + i * 100)
                .ease(d3.easeQuadOut)
                .style('opacity', 0.7);

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
                .text(d => `${d.data.status} (${d.data.count})`)
                .style('font-size', 13)
                .style('font-weight', '600')
                .style('fill', 'var(--color-text-primary)')
                .style('opacity', 0)
                .transition()
                .duration(500)
                .delay((d, i) => 1200 + i * 100)
                .ease(d3.easeBackOut)
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
