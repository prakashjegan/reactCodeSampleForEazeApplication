import { Avatar, Card } from "@mui/material"
import profileImage from "../../../assets/images/navbar/profile.png"

const InfluencerCard = (props) => {
   const dummyAry = [1, 2, 3, 4, 5]
   return (
      <div className="InfluencerCard">
         <h3>Top 5 Best Performing Influencers</h3>
         <div className="InfluencerCard-avatars" style={{ cursor: "pointer" }}>
            {props.influencers &&
               props.influencers.map((e, index) => {
                  return <Avatar key={index} alt="Remy Sharp" src={e.logoLink || profileImage} sx={{ width: 37, height: 37 }} />
               })}
         </div>
      </div>
   )
}
export default InfluencerCard
