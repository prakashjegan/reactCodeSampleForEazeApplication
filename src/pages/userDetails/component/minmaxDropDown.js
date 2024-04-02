//import { Autocomplete, TextField } from '@mui/material';
import { Select, Space, InputNumber } from 'antd';
import React, { useState } from 'react';
import { useEffect } from 'react';
import "./../style.scss"

const MinMaxDropDown = (props) => {

    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(0);
    const [selectedValue, setSelectedValue] = useState('');
    useEffect(() => {
        setSelectedValue(`Min: ${formatNumber(props.minimum)}, Max: ${formatNumber(props.maximum)}`);
        setMinValue(props.minimum);
        setMaxValue(props.maximum);
    }, [props.minimum, props.maximum]);

    const handleSelectChange = (value) => {
        setSelectedValue(`Min: ${formatNumber(minValue)}, Max: ${formatNumber(maxValue)}`);
        props.onChange([minValue, maxValue])
    };

    const handleMinValueChange = (event) => {
        if (event > 1000000000) {
            return
        }
        //setMinValue(event.target.value);
        setMinValue(event);
        setSelectedValue(`Min: ${formatNumber(event)}, Max: ${formatNumber(maxValue)}`);
        props.onChange([event, maxValue])
    };

    const handleMaxValueChange = (event) => {
        if (event > 1000000000) {
            return
        }
        //setMaxValue(event.target.value);
        setMaxValue(event);
        setSelectedValue(`Min: ${formatNumber(minValue)}, Max: ${formatNumber(event)}`);
        props.onChange([minValue, event])

    };

    const formatNumber = (number) => {
        let formatted = '';
        if (number === 0) {
            formatted += "0";
            return formatted;
        }

        let remainingNumber = number
        if (remainingNumber >= 1000000) {
            const millions = Math.floor(remainingNumber / 1000000);
            remainingNumber = remainingNumber - (millions * 1000000);
            if (millions > 0) {
                formatted += `${millions}M `;
            }
        }
        if (remainingNumber >= 1000) {
            const thousands = Math.floor((remainingNumber) / 1000);
            remainingNumber = remainingNumber - (thousands * 1000);

            formatted += `${thousands}K `;
        }
        if (remainingNumber > 0) {
            formatted += `${remainingNumber}`;
        }
        return formatted;

    };
console.log(props)
    const renderDropdownMenu = () => {
        return (
            <>
                <Space direction="vertical" size="middle">
                    <Space.Compact>
                        <InputNumber
                            label='min'
                            defaultValue={props.minimum}
                            placeholder='min'
                            min={props.minimum}
                            max={props.maximum}
                            value={props.value[0]}
                            formatter={(minValue) => `${minValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(minValue) => `${minValue}`.replace(/\$\s?|(,*)/g, '')}
                            onChange={handleMinValueChange}
                            style={{
                                width: '50%',
                            }}
                        />
                        <InputNumber
                            label='max'
                            placeholder='max'
                            defaultValue={props.maximum}
                            value={props.value[1]}
                            min={props.min}
                            max={props.max}
                            formatter={(maxValue) => `${maxValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(maxValue) => `${maxValue}`.replace(/\$\s?|(,*)/g, '')}
                            onChange={handleMaxValueChange}
                            style={{
                                width: '50%',
                            }}
                        />
                    </Space.Compact>
                </Space>
            </>

        );
    };

    const handleDropdownClose = () => {
        setSelectedValue(`Min: ${formatNumber(minValue)}, Max: ${formatNumber(maxValue)}`);
    };
    return (
        <>
            <div className='min-max-select'>
                
                <Select
                    value={props.lable || selectedValue}
                    //defaultValue = 'ALL'
                    onChange={handleSelectChange}
                    dropdownRender={renderDropdownMenu}
                    onBlur={handleDropdownClose}
                    options={props.options}
                    // getOptionLabel={props.getOptionLabel}
                >
                </Select>
            </div>
        </>
    );
}

export default MinMaxDropDown