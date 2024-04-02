import { FormControl } from '@mui/material';
import { Select } from 'antd';
import React from 'react';

const SelectMui = ({ onChange, placeholder,sx, children,  }) => {

  return (
    <>
    <FormControl
      sx={{
        textAlign: 'center',
        fontSize:"12px",
        ...sx,
      }}
 
    >
      <Select
        variant='standard'
        disableUnderline
        size='small'
        onChange={onChange}
        placeholder={placeholder}
      >
        {children}
      </Select>
    </FormControl>
    </>
  );
};

export default SelectMui;
