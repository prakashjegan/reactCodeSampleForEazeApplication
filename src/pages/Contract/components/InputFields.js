import {   Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import '../style.scss';
import { Box, MenuItem, Grid } from '@mui/material';
import SelectMui from '../../../components/ReusableMuiComponents/SelectMui';
import TextFieldMui from '../../../components/ReusableMuiComponents/TextFieldMui';
import AutoCompleteMui from '../../../components/ReusableMuiComponents/AutoCompleteMui';

const { Title } = Typography;
const InputFields = ({
  Form,
  allDetailsDropdown,
  vluNameStage,
  form,
}) => {
  const [csvData, setCSVData] = useState(null);
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [valueOfTypeFixed, setValueOfTypeFixed] = useState(
    form.getFieldValue(`rateCardRuleType,${vluNameStage?.stageId}`)
  );
  useEffect(() => {
    const fetchCSV = async () => {
      try {
        const response = await fetch('/Currency.csv');
        const text = await response.text();
        setCSVData(text);
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };
    fetchCSV();
  }, []);
  useEffect(() => {
    if (csvData) {
      
      const rows = csvData.split('\n');
      const keys = rows[0].split('\t');
      const currencyOptions = rows.slice(1).map((row) => {
        const values = row.split('\t');
        const obj = {};
        keys.forEach((key, index) => {
          obj[key] = values[index];
        });
        return obj;
      });

      setCurrencyOptions(currencyOptions);
    }
  }, [csvData]);

  return (
    <Grid container spacing={1}>
      {/* RateCard RuleType: "rateCardRuleType";  type(Fixed) */}
      <Grid item xs={8} md={4}>
        <Box>
          <Title style={{ color: '#767F8C' }} level={5}>
            TYPE({valueOfTypeFixed})
          </Title>
          <Form.Item
            name={`rateCardRuleType,${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <Box>
              <SelectMui
                onChange={(selectedValue) => {
                  setValueOfTypeFixed(selectedValue);
                }}
                placeholder='Select a option and change input text above'
                sx={{
                  fontSize: '12px',
                  maxWidth: 180,
                  border: '1px solid #D9D9D9',
                  borderRadius: '8px',
                }}
              >
                {Object.values(allDetailsDropdown?.rateCardTypeString).map(
                  (value, index) => (
                    <MenuItem key={index} value={value}>
                      {value}
                    </MenuItem>
                  )
                )}
              </SelectMui>
            </Box>
          </Form.Item>
        </Box>
      </Grid>

      {/* Amount */}
      {/* <Grid item xs={8}  md={4} > */}
      <Box>
        <Title style={{ color: '#767F8C' }} level={5}>
          Amount*
        </Title>
        <div
          style={{
            display: 'flex',
            border: '1px solid #D9D9D9',
            borderRadius: '4px',
            height: '23px',
            marginTop: '28px',
          }}
        >
          <Form.Item
            name={`fixedValue${vluNameStage?.stageId}`}
            rules={[
              {
                required: true,
                message: 'Amount is required',
              },
            ]}
          >
            <TextFieldMui
              sx={{ width: 80, fontSize: '14px' }}
              placeholder='Amount'
            />
          </Form.Item>
          <Form.Item
            name={`currency${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <AutoCompleteMui
              sx={{ fontSize: '14px', width: 80 }}
              placeholder='Currency'
              options={currencyOptions?.map((value, index) => {
                return {
                  value: `${value['Symbol']} ${value['Code ISO 4217']}`,
                  label: `${value['Symbol']} ${value['Code ISO 4217']}`,
                };
              })}
            />
          </Form.Item>
        </div>
      </Box>
      {/* </Grid> */}
      {/* Views/ Events */}
      <Grid item xs={8} md={4}>
        <Box>
          <Title style={{ color: '#767F8C' }} level={5}>
            Views/ Event Count
          </Title>
          <div
            style={{
              display: 'flex',
              border: '1px solid #D9D9D9',
              borderRadius: '4px',
              height: '23px',
              marginTop: '12px',
            }}
          >
            <Form.Item
              name={`viewsevents${vluNameStage?.stageId}`}
              disabled={valueOfTypeFixed === 'FIXED'}
              rules={[
                {
                  required: true,
                  message: 'VIEWS/ EVENTS Count is required',
                },
              ]}
              style={{ borderRadius: '20px' }}
            >
              <TextFieldMui
                type='number'
                sx={{ width: 180, fontSize: '14px' }}
                placeholder='Views/ Event Count'
              />
            </Form.Item>
          </div>
        </Box>
      </Grid>
      {/* Repeat_payment_times textfield */}

      <div>
        <Title style={{ color: '#767F8C' }} level={5}>
          Repeat Payment Times
        </Title>
        <div style={{ display: 'flex' }}>
          <Form.Item
            name={`repeatPaymentDurationTimes${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
            style={{ borderRadius: '20px' }}
          >
            <TextFieldMui
              type='number'
              placeholder='Repeat Payment Times'
              sx={{ width: 180, fontSize: '14px' }}
            />
          </Form.Item>
        </div>
      </div>

      {/* Repeat_Payment_Type  dropdown*/}

      <div>
        <Title style={{ color: '#767F8C' }} level={5}>
          Repeat Payment Type
        </Title>
        <div style={{ display: 'flex' }}>
          <Form.Item
            name={`repeatPaymentDurationType${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
            style={{ borderRadius: '20px' }}
          >
            <Box sx={{ width: 120 }}>
              <SelectMui
                sx={{
                  fontSize: '12px',
                  width: 180,
                  border: '1px solid #D9D9D9',
                  borderRadius: '8px',
                }}
              >
                <MenuItem value='WEEKLY'>Weekly</MenuItem>
                <MenuItem value='MONTHLY'>Monthly</MenuItem>
              </SelectMui>
            </Box>
          </Form.Item>
        </div>
      </div>
    </Grid>
  );
};

export default InputFields;
