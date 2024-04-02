import { BorderLeft, InfoOutlined } from "@mui/icons-material"
import Tooltip from '@mui/material/Tooltip';
import { Card } from "@mui/material"

const UserInfoDataCard = (props) => {
   return (
      <div className="userInfoDataCard">
         <div className="userInfoDataCard-header">
            <h3>{props.mainTitle}</h3>
            <Tooltip title={props.description}>
            <InfoOutlined />
            </Tooltip>
           
         </div>
         <div className="userInfoDataCard-body" onClick = {props.onClick} >
            <div>
               <h4>{props.subTitle1}</h4>
               <span>{props.value1 || "0"}</span>
            </div>
            <div style={{ borderLeft: "2px solid gray", paddingLeft: "15px" }} onClick = {props.onClick}>
               <h4>{props.subTitle2 || "0"}</h4>
               <span>{props.value2 || "0"}</span>
            </div>
         </div>
      </div>
   )
}
export default UserInfoDataCard
