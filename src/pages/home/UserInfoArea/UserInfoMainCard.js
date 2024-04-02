import { Avatar, Card, Chip } from "@mui/material"
import { Tag } from "antd"
import profileImage from "../../../assets/images/navbar/profile.png"
import UserInfoDataCard from "../components/UserInfoDataCard"
import UserInfoStatusCard from "../components/UserInfoStatusCard"
import { currencyList } from "../../../config/variables"
import { useNavigate } from "react-router-dom";
import { toHumanReadableDate } from "../../../utils/common/commonutils";

let user = JSON.parse(localStorage.getItem("user"))
let userName = localStorage.getItem("emailId")
let signUpStatus = localStorage.getItem("userSignUpStatus")

const UserInfoMainCard = (props) => {
   const navigate = useNavigate();
   const data1 = props.data
   console.log('UserInfoMainCard1', data1, currencyList())
   const handleNavChange = (key, open, id) => {
      switch (key) {
         case 'onboarding':
            navigate(`/onboarding`)
            break;
         case 'invoices':
            navigate(`/invoices`)
            break;
         case 'jobs':
            navigate(`/jobs?openTab=${open}&id=${id}`)
            break;
      }
   }

   const extractCurrency = (data1) =>  {
      let curList = currencyList()
      return ( (curList === undefined || curList === null || curList.length <= 0 )? (data1.currency || "INR") : curList.find((e) => e.currency_code === (data1.currency || "INR") === undefined) ? "INR" : curList.find((e) => e.currency_code === (data1.currency || "INR")).currency_symbol) || "₹"
   }

   const formatNumber = (number) => {
      let formatted = '';
      if (number === 0) {
          formatted+= "0";
          return formatted;
      }
      
      let remainingNumber = number
      if (remainingNumber >= 1000000) {
        const millions = Math.floor(remainingNumber / 1000000);
        remainingNumber = remainingNumber - (millions*1000000);
        if (millions > 0) {
          formatted += `${millions}M `;
        }
      }
      if (remainingNumber >= 1000) {
          const thousands = Math.floor((remainingNumber) / 1000);
          remainingNumber = remainingNumber - (thousands*1000);
  
          formatted += `${thousands}K `;
          return formatted;
      }
      if (remainingNumber > 0) {
          formatted += `${remainingNumber}`;
      }
        return formatted;
      
    };

   return (
      <div className="userInfoMainCard">
         <div className="userInfoMainCard-details">
            <div>
               <Avatar
                  alt="Remy Sharp"
                  src={(data1.logoLink != undefined) ? data1.logoLink : ((user?.userPictureLink != undefined) ? user?.userPictureLink : profileImage)}
                  sx={{ width: 80, height: 80 }}
               />
               <i>
                  <Chip
                     label={`${(data1 && Math.round(data1.completionStatus.split(",").filter((e) => e.length > 0).length * 12.5)) ||
                        Math.round(signUpStatus.split(",").filter((e) => e.length > 0).length * 12.5)
                        } % Completed`}
                     style={{ color: "#3263E3", background: "#E8EAED" }}
                     size="small"
                     onClick={(e) => {
                        handleNavChange('onboarding', 'onboarding', "000000000000000000")
                     }
                     }
                  />
               </i>
            </div>
            <h1>{data1 ? data1.partnerName : userName}</h1>
            <div className="userInfoMainCard-tags">
               {data1 &&
                  data1.tags.slice(0, 3).map((e, index) => {
                     return <span key={index}>{`${e} ${index !== 2 && ","}`}</span>
                  })}
            </div>
         </div>
         {console.log('Issues in Currency symbols ::: ' , currencyList().find((e) => e.currency_code === (data1.currency || "INR")))}
         <UserInfoDataCard
            mainTitle="Earning"
            subTitle1="Total"
            subTitle2="This Month"
            description="Earnings comprise both pending and completed payments."
            value1={
               data1 &&
               `${data1.totalEarning || 0} ${extractCurrency(data1)}`
            }
            value2={
               data1 &&
               `${data1.totalEarningThisMonth || 0} ${extractCurrency(data1)}`
            }
            onClick={(e) => {
               handleNavChange('invoices', 'invoices', "000000000000000000")
            }
            }
         />
         <UserInfoDataCard
            mainTitle="Job Created"
            subTitle1="Total"
            subTitle2="This Month"
            description="Promotions, Collaborations, and a variety of job types established within our platform."
            value1={data1 && `${data1.totalJobs || 0} >`}
            value2={data1 && `${data1.totalJobsThisMonth || 0} >`}
            onClick={(e) => {
               handleNavChange('jobs', 'current-jobs', "000000000000000000")
            }
            }
         />
         <hr />
         <div className="userInfoMainCard-requestList">
            <div>
               <p>Pending Requests From You</p>
               <span  onClick={(e) => {
               handleNavChange('jobs', 'current-job-requests', "000000000000000000")
            }
            }>{(data1 && data1.pendingRequestFromYou) || 0}</span>
            </div>
            <div>
               <p>Pending Requests By Others</p>
               <span onClick={(e) => {
               handleNavChange('jobs', 'current-job-requests', "000000000000000000")
            }
            }>{(data1 && data1.pendingRequestByOther) || 0}</span>
            </div>
            <div>
               <p>Current Job</p>
               <span onClick={(e) => {
               handleNavChange('jobs', 'current-jobs', "000000000000000000")
            }
            }>{(data1 && data1.currentJobs) || 0}</span>
            </div>
            <div>
               <p>Pending Payment</p>
               <span onClick={(e) => {
               handleNavChange('invoices', 'invoices', "000000000000000000")
            }
            }>{(data1 && data1.pendingPayments) || 0}</span>
            </div>
         </div>
         <UserInfoDataCard mainTitle="Profile Perfomance" subTitle1="Total Subscription " 
         description="The Profile Performance is determined by the performance of the jobs undertaken." subTitle2="Total Subscription" value1="" value2="" />
         <br />
         {console.log("into Pending Payments" , data1)}
         <UserInfoStatusCard
            headerColor="#B91212"
            headerTitle="Pending Payment"
            headerPayment={(data1 && data1.pendingPaymentsAmount != undefined) ? `${formatNumber(data1.pendingPaymentsAmount / 100)}` +""+ ((data1.currency === undefined ) ? ' INR' : `${data1.currency}`) : 0 + 'INR'}
            description="Find invoices in the Invoices segment pay before 7 days of invoice generated "
            lastUpdated={toHumanReadableDate(new Date(), "DD-MMM-YY HH:MM")}
            onClick={(e) => {
               handleNavChange('invoices', 'invoices', "000000000000000000")
            }
         }
         />
         <UserInfoStatusCard
            headerColor="#5D5FEF"
            headerTitle="Pending For Approval"
            headerPayment={(data1 && data1.pendingRequestFromYou) || 0}
            description="Kindly approve all pending for approval jobs to proceed to next step"
            lastUpdated={toHumanReadableDate(new Date(), "DD-MMM-YY HH:MM")}
            onClick={(e) => {
               handleNavChange('jobs', 'current-job-requests', "000000000000000000")
            }
         }
         />
         <UserInfoStatusCard
            //headerColor="#BDBDBD"
            headerColor="orange"
            headerTitle="Current Job Postings"
            headerPayment={(data1 && data1.currentJobs) || 0}
            description="Kindly Take action for all pending job updates"
            lastUpdated={toHumanReadableDate(new Date(), "DD-MMM-YY HH:MM")}
            onClick={(e) => {
               handleNavChange('jobs', 'your-postings', "000000000000000000")
            }
         }
         />
      </div>
   )
}
export default UserInfoMainCard

