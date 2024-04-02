import { Avatar, Card } from "@mui/material"
import profileImage from "../../../assets/images/navbar/profile.png"
import RecentPaymentCardItem from "../components/RecentPaymentCardItem"

const RecentPaymentCard = () => {
   const dummyAry = [1, 2, 3, 4, 5]
   return (
      <div className="recentPaymentCard">
         <h3>Recent Payments</h3>
         <>
            {dummyAry.map((e, index) => {
               return <RecentPaymentCardItem key={index} />
            })}
         </>
      </div>
   )
}
export default RecentPaymentCard
