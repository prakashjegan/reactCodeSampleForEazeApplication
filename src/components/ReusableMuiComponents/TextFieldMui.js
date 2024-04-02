import { TextField } from '@mui/material'
import React from 'react'

const TextFieldMui = ({ placeholder, sx, disabled=false , type="text",others}) => {
  return (
    <TextField
      disabled={disabled}
      type={type}
      placeholder={placeholder}
      variant='standard'
      InputProps={{
        disableUnderline: true,
        sx: {
          textAlign: 'center',
          fontSize:"12px",
          ...sx,
        },
      }}
      size='small'
      sx={{
        textAlign: 'center',
        fontSize:"12px",
        ...sx,
      }}
    />
  );
};

export default TextFieldMui