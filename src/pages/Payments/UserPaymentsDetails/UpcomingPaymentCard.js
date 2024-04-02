import { Avatar, Card } from "@mui/material"
import profileImage from "../../../assets/images/navbar/profile.png"
import UpcomingPaymentCardItem from "../components/UpcomingPaymentCardItem"

const UpcomingPaymentCard = () => {
   const dummyAry = [1, 2, 3, 4, 5]
   return (
      <div className="upcomingPaymentCard">
         <h3>Upcoming Payments</h3>
         <>
            {dummyAry.map((e, index) => {
               return <UpcomingPaymentCardItem key={index} />
            })}
         </>
      </div>
   )
}
export default UpcomingPaymentCard
