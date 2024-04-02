const bigInt = require('big-integer');
import { BigNumber } from 'bignumber.js';

const parseBigNumbersReviver = (_, value) => {
    // Check if the value is a string and represents a big number
    if (/^\d{18,}$/.test(value)) {
        return bigInt(value).toString(); // Parse the string as a BigInt
    }
    return value; // Return the value as is for other types
};

export const responseParser = (response) => {
    return JSON.parse(response, parseBigNumbersReviver);
}

// Function to transform specific string values to BigNumber
export const transformStringToBigNumber = (data) => {
    // Iterate over the properties of the data object
    for (const key in data) {
      if (typeof data[key] === 'string' && data[key].length === 18 &&  /^\d+$/.test(data[key])) {
        // Convert the string value to BigNumber
        data[key] = new BigNumber(data[key]);
      } else if (typeof data[key] === 'object') {
        // Recursively call the transformStringToBigNumber function for nested objects
        transformStringToBigNumber(data[key]);
      }
    }
    return data
  }
  

export default responseParser
