import React, { useEffect, useState } from 'react';
import '../style.scss';
import MetricsFilter from '../filters';
import MultiLineChart from '../../../components/charts/multiline';
import { COST_PER_CONVERSION } from '../../../constants/text';
import metricsService from '../../../services/metricsService';
import { METRICS_CHART_TYPE } from '../../../constants/lovs';
import moment from 'moment';

const MetricsCostPerConversion = (props) => {
    const metric = COST_PER_CONVERSION;
    const { options } = props;
    const [filters, setFilters] = useState({ type: 'INFLUENCER', breakpoint: 'DAY', influencers: [], business: [], ads: [], jobs: [], platforms: [], startDate: null, endDate: null });
    const [chartData, setChartData] = useState([])

    useEffect(() => {
        fetchMetrics();
    }, [filters])

    const fetchMetrics = async () => {
        const { influencers, business, platforms, ads, jobs, startDate, endDate } = filters;
        const payload = {
            requestFilter: {
                ...(influencers?.length !== 0 && { influencers: influencers }),
                ...(business?.length !== 0 && { business: business }),
                ...(platforms?.length !== 0 && { platformTypes: platforms }),
                ...(ads?.length !== 0 && { ads: ads }),
                ...(jobs?.length !== 0 && { jobs: jobs }),
                ...(startDate && { startDate: startDate }),
                ...(endDate && { endDate: endDate }),
            },
            metricType: metric,
            metricSubType: filters.type,
            breakPoint: filters.breakpoint,
            overAllPerformanceNum: 3,
            performanceNum: 3
        }
        // metricsService.fetchMetrics(payload)
        //     .then(res => {
        //         const dataArray = [];
        //         const resData = res?.data?.message?.metricPointBOs || {};
        //         for (let key in resData) {
        //             const dummykey = key.includes("W") ?  moment(key, 'YYYY-MM-[W]W').format('YYYY-MMM-DD') : key
        //             if (resData?.hasOwnProperty(key)) dataArray.push({ time: dummykey, value: resData[key]?.pointYAxis, category: 'Maximum' })
        //             if (resData?.hasOwnProperty(key)) dataArray.push({ time: dummykey, value: resData[key]?.pointYAxisAverage, category: 'Average' })
        //         }

        //         const topData = res?.data?.message?.multiPointBOs || {};
        //         for (let topkey in topData) {
        //             if (topData?.hasOwnProperty(topkey) && Object.keys(topData[topkey])?.length !== 0) {
        //                 const innerObj = topData[topkey];
        //                 const matchKey = METRICS_CHART_TYPE?.find(elem => elem.value === filters['type'])?.id;
        //                 const matched = options[matchKey]?.find(elem => elem.value === topkey)?.label;
        //                 for (let innerkey in innerObj) {
        //                     const dummykey = innerkey.includes("W") ? moment(innerkey, 'YYYY-MM-DD').format('YYYY-MMM-DD') : innerkey
        //                     if (innerObj?.hasOwnProperty(innerkey)) dataArray.push({ time: dummykey, value: innerObj[innerkey]?.pointYAxis, category: matched })
        //                 }
        //             }
        //         }
        //         dataArray.sort((a, b) => new Date(a.time) - new Date(b.time))
        //         setChartData(dataArray)
        //     }).catch(err => console.log(err))
        metricsService.fetchMetrics(payload)
        .then(res => {
            const dataArray = [];
            const resData = res?.data?.message?.metricPointBOs || {};
            for (let key in resData) {
                if (resData?.hasOwnProperty(key)) dataArray.push({ time: key, xAxis: resData[key]?.pointXAxis || 0, value: resData[key]?.pointYAxis || 0, category: 'Maximum' })
                if (resData?.hasOwnProperty(key)) dataArray.push({ time: key, xAxis: resData[key]?.pointXAxis || 0, value: resData[key]?.pointYAxisAverage || 0, category: 'Average' })
            }

            const topData = res?.data?.message?.multiPointBOs || {};
            const influ = res?.data?.message?.fetchResponse?.allDataMap || {}
            for (let topkey in topData) {
                if (topData?.hasOwnProperty(topkey) && Object.keys(topData[topkey])?.length !== 0) {
                    const innerObj = topData[topkey];
                    // const matchKey = METRICS_CHART_TYPE?.find(elem => elem.value === filters['type'])?.id;
                    const matched = influ[topkey]?.userName || influ[topkey]?.partnerId;


                    for (let innerkey in innerObj) {
                        if (innerObj?.hasOwnProperty(innerkey)) dataArray.push({ time: innerkey, xAxis: innerObj[innerkey]?.pointXAxis || 0, value: innerObj[innerkey]?.pointYAxis || 0, category: matched })
                    }
                }
            }

            dataArray.sort((a, b) => new Date(a.xAxis) - new Date(b.xAxis))
            setChartData(dataArray)
        }).catch(err => console.warn(err))
    }

    return (
        <div className='metrics-card'>
            <MetricsFilter
                name="Cost Per Conversion"
                filters={filters}
                options={options}
                setFilters={setFilters} />
            <MultiLineChart data={chartData} />
        </div>
    )
}

export default MetricsCostPerConversion;