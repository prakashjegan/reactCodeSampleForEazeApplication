import React , {useState} from 'react';
import { Select } from 'antd';
//import 'antd/dist/antd.css'; // Import Ant Design styles

const { Option } = Select;

const MultiUserSelectDropDown = (props) => {
    //const [isDisabled , setIsDisabled] = useState(false)
    let isDisabled = false
    console.log('MultiUserSelectDropDown disabled', props)
    if (props === undefined){
        props = {}
        props.options = {
            value : "ALL", 
            label : "ALL", 
            image : "ALL", 
            platforms : "ALL", 
            categories : "ALL"
        }
    }
    if (props != undefined && props.isDisabled != undefined ) {
        isDisabled = props.isDisabled
    }
    console.log('MultiUserSelectDropDown disabled1 ', isDisabled)

    if (isDisabled === undefined) {
        isDisabled = false
    }
  const handleChange = (selectedOptions) => {
    console.log('SearchOption , ' , selectedOptions)
    if (props != undefined && props.onSelect != undefined) {
        props.onSelect(selectedOptions);
    }
  };

  const formatOptionLabel = ({ value, label, image, platforms, categories }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img src={image} alt={label} style={{ width: '32px', height: '32px', borderRadius: '50%', marginRight: '8px' }} />
      <div>
        <div style={{ fontWeight: 'bold' }}>{label}</div>
        {( platforms !== undefined || categories !== undefined ) && (
        <div style={{ color: '#666' }}>
          {( platforms !== undefined ) && (<span>{platforms}</span>)}
          {( categories !== undefined ) && (<span style={{ marginLeft: '8px' }}>{categories}</span>)}
        </div>
       )}
      </div>
    </div>
  );
  const customFilterOption = (inputValue, option) => {
    // Customize the filtering logic here
    return option.label.toLowerCase().includes(inputValue.toLowerCase());
  };

  return (
    <>
    {isDisabled && (

<Select
mode= {(props.isSingle === undefined || !props.isSingle ) ? "multiple" : undefined}
style={{ width: '100%' }}
onChange={handleChange}
placeholder="Select options..."
optionLabelProp="label"
disabled={isDisabled}
>
</Select>
    )
    }
    {!isDisabled && (
    <Select
      //mode="multiple"
      mode= {(props.isSingle === undefined || !props.isSingle ) ? "multiple" : undefined}
      style={{ width: '100%' }}
      onChange={handleChange}
      placeholder="Select options..."
      optionLabelProp="label"
      isSearchable={true}
      disabled={isDisabled}
      filterOption={customFilterOption}

    >
      {props.options.map(({ value, label, image, platforms, categories }) => (
        
       <Option key={value} label={label} value={value}>
            {console.log('Option User Label' , label)}
          {formatOptionLabel({ value, label, image, platforms, categories })}
        </Option>
      
      ))}
    </Select>
    )}
    </>
  );
};

export default MultiUserSelectDropDown;