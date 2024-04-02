import { Card } from "@mui/material"
import UserInfoMainCard from "./UserInfoMainCard"
import UserInfoSubCard from "./UserInfoSubCard"
import { useEffect, useState } from "react"
import userService from "../../../services/userService"
import { myPartnerId , currencyList } from "../../../config/variables"

const UserInfoArea = () => {
   const [data, setdata] = useState()
   const [dataInfo, setDataInfo] = useState()

   const getData = async () => {
      try {
         let payload = {
            from: 0,
            size: 100,
            searchCriteria: [
               {
                  field: "documentType",
                  value: "PARTNER_TAG",
                  operator: "==",
                  logical: "AND"
               },
               {
                  field: "partnerId",
                  value: myPartnerId(),

                  // value: "110401520613261824",

                  operator: "==",
                  logical: "AND"
               }
            ]
         }
         console.log('UserInfoArea Payload:::', payload)
         const j = await userService.fetchUserData(payload)
         j.data.message.partnerTags && setdata(j.data.message.partnerTags)
         console.log('UserInfoArea:::', j.data.message.partnerTags[0])
         let dataj = j.data.message.partnerTags[0]
         dataj.is
         setDataInfo(j.data.message.partnerTags[0])
         localStorage.setItem('userDetails', JSON.stringify(j.data.message.partnerTags[0]))
         // console.log(j)
      } catch (error) {
         console.log('Into UserInfoArea Error' , error)
      }
   }
   // console.log(data)
   useEffect(() => {
      getData()
      return () => { }
   }, [])

   return (
      <div key={dataInfo?.id}>
         {console.log('UserInfo Area :::' , data , currencyList())}
         {data != undefined  &&(
            <>
                     {console.log('UserInfo Area 5:::' , data )}
               <UserInfoMainCard data={dataInfo} />
               {/* <UserInfoSubCard /> */}
            </>
         )
         }
      </div>
   )
}
export default UserInfoArea
