import React , {useState , useEffect} from 'react';
import { Select } from 'antd';
import userService from '../../../services/userService';
//import 'antd/dist/antd.css'; // Import Ant Design styles

const { Option } = Select;

const MultiSelUserWithLimiFetchComp = (props) => {
    //const [isDisabled , setIsDisabled] = useState(false)
    let isDisabled = false

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOptions = async (searchValue) => {
        // Call your API with the debounced search value
        // Replace YOUR_API_ENDPOINT with the actual API endpoint
        //console.log('Options FetchOptions Completed fetchOptions', searchValue)
        console.log('Fetch Options of Users::::' , searchValue)
        setLoading(true);
        try {
        let res = await userService.fetchSearchOptionAllSearch(searchValue)
        const userData = res?.data?.message?.partners;
        let allData = []
        if (Array.isArray(userData) && userData != undefined && userData != null) {
            for (let i = 0; i < userData.length; i++) {
                userData[i].value = userData[i].partnerID
                userData[i].label = userData[i].partnerName != undefined ? userData[i].partnerName : userData[i].userName
                userData[i].searchString = userData[i].label
                //userData[i].redirectLink = popupUserDetails
                userData[i].type = "USER"
                let pic = (userData[i].logoLink != undefined) ? userData[i].logoLink : ((userData[i]?.userPictureLink != undefined) ? userData[i]?.userPictureLink : ProfileImage)
                userData[i].image = pic

                userData[i].platforms =  userData[i].stakeHolderType,
                userData[i].category =  userData[i].preferredLanguage


                allData.push(userData[i])
            }
        }
        setOptions(userData)
        console.log('Options FetchOptions Completed Into fetch Search Details2 ', userData)
    }catch (error) {
            console.error('Error fetching options:', error);
          } finally {
            setLoading(false);
          }
    };


    useEffect(() => {
        // Fetch initial options (optional)
        console.log('MultiSelUserWithLimiFetchComp Into UserEffect ', props)

        fetchOptions('');
      }, []);

    console.log('MultiSelUserWithLimiFetchComp disabled', props)
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
    console.log('MultiSelUserWithLimiFetchComp disabled1 ', isDisabled)

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
mode="multiple"
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
      mode="multiple"
      style={{ width: '100%' }}
      onChange={handleChange}
      placeholder="Select options..."
      optionLabelProp="label"
      isSearchable={true}
      disabled={isDisabled}
      filterOption={customFilterOption}
      onSearch={fetchOptions} // Triggered while typing in the input field
      loading={loading}
    >
      {(options !== undefined) && options.map(({ value, label, image, platforms, categories }) => (
        
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

export default MultiSelUserWithLimiFetchComp;
