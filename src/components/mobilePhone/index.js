import React from 'react';
// import MuiPhoneNumber from 'material-ui-phone-number'

import PhoneInput from 'react-phone-input-2'
import './style.scss'

const MoInput = (props) => {
  
    const onHandlechange = (e , value , data , event) => {
        console.log('Into Mobile number change ::', e ,  value , data , event)
        props.setMobileNumber(event)
        props.onmobileUpdate(event , value, data , event )
    }
    return (
    //   <Box className={classes.BoxInline} pr={1} pl={1} >
    //     <Box className={classes.BoxText} pr={1}>
    //       {props.label || props.labels} : {props.req && <span>*</span>}
    //     </Box>
    //     <Box>
    <div>
        {console.log('Into Mobile number' , props.mobileNumber)}
            <PhoneInput
            onChange={(e , value , data , event)=> onHandlechange(e, value , data , event)}
            specialLabel={''}
            country={'in'}
            value={props.mobileNumber}
            inputStyle={{
              borderColor: (props.touched && props.error) && "red"
            }}
            {...props}
            />
            {(props.touched && props.error) && <p style={{color:'red'}} className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-filled MuiFormHelperText-marginDense">{props.error}</p> }
            </div>
    //     </Box>
    //   </Box>
    );
  };
  
const MoIndex = (props) => {
    return (
        <MoInput
            label={"Mobile Phone"}
            req={true}
            helperText={""}
            error={true}
            setMobileNumber={props.setMobileNumber}
            onmobileUpdate={props.onmobileUpdate}
            mobileNumber={props.mobileNumber}
            isSelect={false}
            {...props.input}
            {...props.meta}
            {...props.custom}
        />
    )
} 

export default MoIndex