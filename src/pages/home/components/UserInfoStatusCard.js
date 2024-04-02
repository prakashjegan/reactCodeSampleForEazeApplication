import { Card } from "@mui/material"

const UserInfoStatusCard = (props) => {
   return (
      <div className="userInfoStatusCard" onClick ={props.onClick}>
         <div style={{ background: `${props.headerColor}` }} className="userInfoStatusCard-header">
            <span>{props.headerTitle}</span>
            <span>{props.headerPayment}</span>
         </div>
         <div className="userInfoStatusCard-body">
            <p>{props.description}</p>
            <div className="userInfoStatusCard-footer">
               <span>Last Updated</span>
               <span>{props.lastUpdated}</span>
            </div>
         </div>
      </div>
   )
}
export default UserInfoStatusCard
