import moment from 'moment';
import RenderChart from './index';

const MultiLineChart = ({ data }) => {

    const config = {
        data,   
        // label : () => "iiiiiiiiiiiiiii",
        xField: 'xAxis',
        yField: 'value',
        seriesField: 'category',
        legend: {
            position: 'top', // You can change the legend position: 'top', 'bottom', 'left', 'right'
            layout: 'horizontal', // 'horizontal' or 'vertical'
            // marker: {
            //     symbol: 'circle', // You can use different marker symbols: 'circle', 'square', 'diamond', 'triangle', etc.
            // },
            textStyle: {
                fill: 'red', // You can set the font color of the legend text.
            },
        },
        // label: {
        //     formatter: (v) => v.value,
        // },
        xAxis: {
            label: {
              formatter: (v) => {
                return data.find((item) => `${item.xAxis}` === `${v}`)?.time ?? 'nan'
              }, // Use the 'time' value as the x-axis label
            },
          },
        yAxis: {
            label: {
                formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
            },
        },
    }

    return (
        <div>
            <RenderChart config={config} type="line" />
        </div>
    )
}

export default MultiLineChart
