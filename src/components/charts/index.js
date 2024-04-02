import React, { useEffect, useRef } from 'react';
import { Column } from '@antv/g2plot';
import { DualAxes } from '@antv/g2plot';
import { Line } from '@antv/g2plot';


const RenderChart = ({ config, type }) => {
    const containerRef = useRef();
    const renderPlotRef = useRef();

    useEffect(() => {
        let createChart;

        if (type === 'column') createChart = Column;
        else if (type === 'mixed') createChart = DualAxes;
        else if (type === 'line') createChart = Line;

        if (containerRef.current) {
            renderPlotRef.current = new createChart(
                containerRef.current,
                config
            );
            renderPlotRef.current.render();
        } else {
            console.log('no container element');
        }

        return () => {
            if (renderPlotRef.current) {
                renderPlotRef.current.destroy();
            }
        };
    }, [config, type]);

    return (
        <div>
            <div id="container" ref={containerRef} />
        </div>
    );
};

export default RenderChart;