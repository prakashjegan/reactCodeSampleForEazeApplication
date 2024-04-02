import { Card } from "@mui/material"
import { ThreeUsersIcon } from "../../../assets/icons/figmaIcons"
import { useState } from "react"
import { ExpandLess, ExpandMore } from "@mui/icons-material"

const UserInfoSubCard = () => {
   const [dummyAry, setdummyAry] = useState([1, 2, 3, 4])
   const [isShowMore, setisShowMore] = useState(false)
   return (
      <div className="userInfoSubCard">
         <div className="userInfoSubCard-list1">
            <p>Latest</p>
            <span>
               <ThreeUsersIcon /> list items
            </span>
            <span>
               <ThreeUsersIcon /> list items
            </span>
            <span>
               <ThreeUsersIcon /> list items
            </span>
            <span>
               <ThreeUsersIcon /> list items
            </span>
            <span>
               <ThreeUsersIcon /> list items
            </span>
            <span>
               <ThreeUsersIcon /> list items
            </span>
            <span>
               <ThreeUsersIcon /> list items
            </span>
         </div>
         <p>Group</p>
         <div className="userInfoSubCard-list2">
            {dummyAry.map((e, index) => {
               return (
                  <span key={index}>
                     <ThreeUsersIcon /> list items
                  </span>
               )
            })}
         </div>
         <div className="userInfoSubCard-showMore" onClick={() => setisShowMore(!isShowMore)}>
            {!isShowMore ? (
               <>
                  <span> Show More </span>
                  <ExpandMore />
               </>
            ) : (
               <>
                  <span> Show Less </span>
                  <ExpandLess />
               </>
            )}
         </div>
      </div>
   )
}
export default UserInfoSubCard
