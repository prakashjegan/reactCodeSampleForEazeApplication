import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import TextFieldMui from '../../../components/ReusableMuiComponents/TextFieldMui';

const WorkFlowStage = ({ Form, vluNameStage }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={8} md={4}>
        <Box>
          <Typography style={{ color: '#767F8C' }}>Link</Typography>
          <Form.Item
            name={`link,${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextFieldMui
              sx={{ width: 80, fontSize: '14px' }}
              placeholder='Link'
            />
          </Form.Item>
        </Box>
      </Grid>

      <Grid item xs={8} md={4}>
        <Box>
          <Typography style={{ color: '#767F8C' }}>Display Content</Typography>
          <Form.Item
            name={`displaycontent,${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextFieldMui
              sx={{ width: 160, fontSize: '14px' }}
              placeholder='Display Content'
            />
          </Form.Item>
        </Box>
      </Grid>

      <Grid item xs={8} md={4}>
        <Box>
          <Typography style={{ color: '#767F8C' }}>
            Tentative Start Date
          </Typography>
          <Form.Item
            name={`startdate,${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextFieldMui type='date' />
          </Form.Item>
        </Box>
      </Grid>

      <Grid item xs={8} md={4}>
        <Box>
          <Typography style={{ color: '#767F8C' }}>
            Tentative End Date
          </Typography>
          <Form.Item
            name={`enddate,${vluNameStage?.stageId}`}
            rules={[
              {
                required: false,
              },
            ]}
          >
            <TextFieldMui type='date' />
          </Form.Item>
        </Box>
      </Grid>
    </Grid>
  );
};

export default WorkFlowStage;
