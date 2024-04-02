import { Avatar, Card } from "@mui/material"
import profileImage from "../../../assets/images/navbar/profile.png"
import { DescriptionOutlined } from "@mui/icons-material"

const RecentPaymentCardItem = () => {
   return (
      <div className="paymentCardItem">
         <div className="paymentCardItem-avatar">
            <Avatar alt="Remy Sharp" src={profileImage} sx={{ width: 37, height: 37 }} />
            <div>
               <h3>Mathilida bell</h3>
               <p>#565346</p>
            </div>
         </div>
         <div className="paymentCardItem-data">
            <span>$ 520</span>
            <DescriptionOutlined style={{ color: "#3263E3" }} />
         </div>
      </div>
   )
}

export default RecentPaymentCardItem
