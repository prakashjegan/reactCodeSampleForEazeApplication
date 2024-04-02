import { Autocomplete, TextField } from '@mui/material';
import React from 'react'

const AutoCompleteMui = ({options, placeholder,sx, getOptionLabel}) => {
 //console.log(getOptionLabel,"getOptionLabel")
 //console.log(options,"options")
  return (
    <>
      <Autocomplete
        disablePortal
        id='combo-box-demo'
        options={options}
        getOptionLabel={getOptionLabel}
        
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            size='small'
            variant='standard'
            sx={{
              textAlign: 'center',
              ...sx,
             
            }}
          />
        )}
      />
    </>
  );
}

export default AutoCompleteMui