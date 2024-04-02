import { Card } from "@mui/material"
import RecentPaymentCard from "./RecentPaymentCard"
import UpcomingPaymentCard from "./UpcomingPaymentCard"
import SideNavigation from "../../../components/sidenavigation/SideNavigation"

const UserPaymentDetails = () => {
   return (
      <div className="userPaymentDetails">
         <RecentPaymentCard />
         <UpcomingPaymentCard />
         <SideNavigation />
      </div>
   )
}

export default UserPaymentDetails
