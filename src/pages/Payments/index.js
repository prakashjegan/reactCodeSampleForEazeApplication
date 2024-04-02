import Layout from "../../components/layout"
import { Card, Grid } from "@mui/material"
import PaymentCharts from "./PaymentCharts/PaymentCharts"
import "./style.scss"
import UserPaymentDetails from "./UserPaymentsDetails/UserPaymentDetails"
import PaymentTables from "./PaymentTables/PaymentTables"
const Payments = () => {
   return (
      <div className="payment-container" style={{ minWidth: "1400px", overflow: "auto" }}>
         {/* <SearchHeader /> */}
         {/* Home */}
         <Grid container spacing={5}>
            <Grid item xs={9}>
               <PaymentCharts />
               <PaymentTables />
               {/* <UserInfoArea /> */}
            </Grid>
            <Grid item xs={3}>
               {/* <UserPaymentDetails /> */}
            </Grid>
         </Grid>
      </div>
   )
}

export default Layout(Payments)
