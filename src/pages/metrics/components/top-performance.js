import React, { useEffect, useState } from 'react';
import '../style.scss';
import { OVERALL_PERF_VIEW } from '../../../constants/text';
import metricsService from '../../../services/metricsService';
import { Avatar, Rate, Table } from 'antd';

const MetricsTopPerformance = (props) => {
    const metric = OVERALL_PERF_VIEW;
    const { options } = props;
    const [listData, setListData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMetrics();
    }, [])

    const fetchMetrics = () => {
        const payload = {
            requestFilter: { startDate: "2023-04-13T16:52:35.278Z" },
            metricType: metric,
            metricSubType: 'INFLUENCER',
            breakPoint: 'DAY',
            overAllPerformanceNum: 5,
            performanceNum: 5
        }
        setLoading(true);
        metricsService.fetchMetrics(payload)
            .then(res => {
                const dataArray = [];
                const influ = res?.data?.message?.fetchResponse?.allDataMap || {}
                const resData = res?.data?.message?.topOverAllPerfInfluIds || {};
                for (let key in resData) {
                    const matched = influ[key];
                    matched && dataArray.push({...matched, pastTask: matched.totalJobs - matched.currentJobs, rate: Math.ceil(matched.averageReview / 20)})
                }
                setListData(dataArray);
                setLoading(false)
            }).catch(() => setLoading(false))
    }

    const columns = [
        {
            title: '',
            dataIndex: 'logoLink',
            key: 'logoLink',
            render: (link) => (
                <Avatar src={link} />
            )
        },
        {
            title: 'Ref',
            dataIndex: 'organizationName',
            key: 'organizationName',
            render: (name, record) => (
                <div>
                    <div className='user-name'>{name}</div>
                    <div className='user-amount'>{record?.totalBudgetAmountSpent}</div>
                </div>
            )
        },
        {
            title: 'Current Tasks',
            dataIndex: 'currentJobs',
            key: 'currentJobs',
        },
        {
            title: 'Past Tasks',
            dataIndex: 'pastTask',
            key: 'totalEmployees',
        },
        {
            title: 'Total Tasks',
            dataIndex: 'totalJobs',
            key: 'totalJobs',
            render: (name) => (
                <div>
                    {name} Tasks done
                </div>
            )
        },
        {
            title: 'Rate',
            dataIndex: 'rate',
            key: 'rate',
            render: (name, item) => {
                return <div style={{display:"flex", alignItems:"center", gap:"0.3rem"}}>
                <Rate allowHalf disabled defaultValue={name || 0} style={{ fontSize:16, margin:"0.2px" }} /> of {item.totalReviews}
            </div>
            }
        },
    ];
    return (
        <div className='metrics-card'>
            <div className='table-name'>Top Performance</div>
            <Table dataSource={listData} loading={loading} columns={columns} pagination={false}/>

            {/* <MetricsFilter
                name="Overall Performance(Views)"
                filters={filters}
                options={options}
                setFilters={setFilters} />
            <MultiLineChart data={chartData} /> */}
        </div>
    )
}

export default MetricsTopPerformance;