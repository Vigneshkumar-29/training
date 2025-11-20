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

            g.selectAll('slices')
                .data(pie(data))
                .enter()
                .append('path')
                .attr('d', arc)
                .attr('fill', d => d.data.color || 'var(--color-primary)')
                .attr('stroke', 'var(--color-white)')
                .style('stroke-width', '2px')
                .style('opacity', 0.7)
                .on('mouseover', function (event, d) {
                    d3.select(this).style('opacity', 1).attr('stroke-width', '3px');
                    const total = d3.sum(data, d => d.count);
                    const percent = ((d.data.count / total) * 100).toFixed(1);
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
                        .html(`<strong>${d.data.status}</strong>: ${d.data.count} (${percent}%)`);
                    tooltip
                        .style('left', event.pageX + 10 + 'px')
                        .style('top', event.pageY - 20 + 'px');
                })
                .on('mouseout', function () {
                    d3.select(this).style('opacity', 0.7).attr('stroke-width', '2px');
                    d3.select('.chart-tooltip').remove();
                });

            g.selectAll('polyline')
                .data(pie(data))
                .enter()
                .append('polyline')
                .attr('stroke', 'var(--color-text-secondary)')
                .style('fill', 'none')
                .attr('stroke-width', 1)
                .attr('points', function (d) {
                    const posA = arc.centroid(d);
                    const posB = outerArc.centroid(d);
                    const posC = outerArc.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2;
                    posC[0] = radius * 0.99 * (midangle < Math.PI ? 1 : -1);
                    return [posA, posB, posC];
                });

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
                .style('fill', 'var(--color-text-primary)');
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
