import moment from 'moment';
import RenderChart from './index';

const MixedChart = ({ data }) => {
    const dualAxes = {
        data,
        xField: 'time',
        yField: ['value', 'Events'],
        xAxis: {
            type: 'time',
            tickCount: 10,
            label: {
                formatter: (v) => moment(v).format('DD MMM YYYY'),
            },
        },
        yAxis: {
            label: {
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
        geometryOptions: [
            {
                geometry: 'column',
                isStack: true,
                seriesField: 'type',
            },
            {
                geometry: 'line',
            },
        ],
    }

    return (
        <div>
            <RenderChart config={dualAxes} type="mixed" />
        </div>
    )
}

export default MixedChart