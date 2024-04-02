import moment from "moment/moment";



export const isStringValueTruthy = (value) => 
    !!value && value != undefined && value !== 'null'


export const toHumanReadableDate = (value, format)  => {
   try {
        return moment(value).utc().format(format)
   } catch (error) {
        console.log(`Error parsing timestamp:  ${value}`);
        return value
   }
}