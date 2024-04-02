import {
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import YoutubeIcon from "../../../assets/images/platformIcons/youtubeIcon.png";
import FacebookIcon from "../../../assets/images/platformIcons/Facebook.png";
import TwitterIcon from "../../../assets/images/platformIcons/Twitter.png";
import ClubhouseIcon from "../../../assets/images/platformIcons/Clubhouse.png";

import AppleIcon from "../../../assets/images/platformIcons/Apple.png";
import DiscordIcon from "../../../assets/images/platformIcons/Discord.png";
import DribbbleIcon from "../../../assets/images/platformIcons/Dribbble.png";
import FigmaIcon from "../../../assets/images/platformIcons/Figma.png";
import GithubIcon from "../../../assets/images/platformIcons/Github.png";
import GoogleIcon from "../../../assets/images/platformIcons/Google.png";
import InstagramIcon from "../../../assets/images/platformIcons/Instagram.png";
import LinkedInIcon from "../../../assets/images/platformIcons/LinkedIn.png";
import MediumIcon from "../../../assets/images/platformIcons/Medium.png";
import PinterestIcon from "../../../assets/images/platformIcons/Pinterest.png";
import RedditIcon from "../../../assets/images/platformIcons/Reddit.png";
import SignalIcon from "../../../assets/images/platformIcons/Signal.png";
import SnapchatIcon from "../../../assets/images/platformIcons/Snapchat.png";
import SpotifyIcon from "../../../assets/images/platformIcons/Spotify.png";
import TelegramIcon from "../../../assets/images/platformIcons/Telegram.png";
import TikTokIcon from "../../../assets/images/platformIcons/TikTok.png";
import TumblrIcon from "../../../assets/images/platformIcons/Tumblr.png";
import TwitchIcon from "../../../assets/images/platformIcons/Twitch.png";
import VKIcon from "../../../assets/images/platformIcons/VK.png";
import DummyIcon from "../../../assets/images/platformIcons/icon_dummy.png";
import varifidImg from '../../../assets/images/common/verified1.png'


import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { useState } from "react";
import { Modal } from "antd";
import onboardService from "../../../services/onboardService";
import socialImages from "../../../assets/images/socialImages/index"


const PlatformCard = ({ platformDetails }) => {
  let imageHash = {
    YouTube: YoutubeIcon,
    Snapchat: SnapchatIcon,
    Twitch: TwitchIcon,
    Pinterest: PinterestIcon,
    Reddit: RedditIcon,
    VK: VKIcon,
    facebook: FacebookIcon,
    LinkedIn: LinkedInIcon,
    TikTok: TikTokIcon,
    Twitter: TwitterIcon,
    Clubhouse: ClubhouseIcon,
    Discord: DiscordIcon,
    DummyIcon: DummyIcon,
  };

  const [modal,setModal] = useState(false)
  const [messageVerification, setMessageVerification] = useState("")

  const verifyPlatform = ( platformId) => {
    //SetOptionLoading(true);
    console.log('Into verifyPlatform Platform Ids :::' , platformId)
    onboardService.toverifyPlatformDetails(platformId)
        .then((res) => {
            //SetOptionLoading(false);
            if (res?.data?.message?.VerificationString != undefined) {
              console.log('Into verifyPlatform Platform Ids VerificationString :::' , res?.data?.message?.VerificationString)

            if (res.data.message) {
              setMessageVerification(res?.data?.message?.VerificationString)
            }
            setModal(true)
          }
        })
        .catch(() => { })

  }

  const handleModalOpen = () => {
    setModal(true);
  };

  const handleModalClose = () => {
    setModal(false);
  };


  return (
    <>
      <Box m={1} sx={{ boxShadow: 3 }}>
        <Card variant="outlined" sx={{ width: "100%", height: 180 }}>
          <CardContent>
            {(platformDetails.platformType != undefined && socialImages[platformDetails.platformType.toLowerCase()])  ? (
              <div style={{ textAlign: "center" }}>
                {" "}
                <img
                  src={socialImages[platformDetails.platformType.toLowerCase()]}
                  alt="platform img"
                />{" "}
              </div>
            ) : (
              <div style={{ textAlign: "center" }}>
                {" "}
                <img src={imageHash["DummyIcon"]} alt="platform img" />{" "}
              </div>
            )}

            <div style={{ textAlign: "center", fontSize: "20px" }}>
              {platformDetails.platformType}
            </div>

            <Stack mt={2} sx= {{display: "flex", textAlign: "center"}}>
              <div style={{ float: "left", fontSize: 15, cursor: "pointer", margin: 1 }}>
                <a
                  href={platformDetails.publicLink}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  {platformDetails.platformName}
                </a>
              </div>
              <div style={{ float: "right", fontSize: 15 }}>
                {platformDetails.language}
              </div>
              { ( platformDetails.isVerified != undefined &&  platformDetails.isVerified) ? (
              <div>
              
              <img src={varifidImg} />Platform Verified
              </div>
              ) : (
                <div>
                  <Button style={{textDecoration: 'underline'}} onClick={(e) => verifyPlatform(platformDetails.platformId)}><img src={varifidImg} /><ul>Verify Platform</ul></Button>
                </div>
              )
              }
              {/* <div><div style={{ float: 'left', fontSize: 15, cursor: "pointer" }}><a href={platformDetails.publicLink} style={{ textDecoration: "none", color: "black" }}>{platformDetails.platformName}</a></div>
                                <div style={{ float: 'right', fontSize: 15 }}>{platformDetails.language}</div></div> */}
            </Stack>
          </CardContent>
        </Card>
      </Box>
      <Modal
      title="Account Verification"
      visible={modal}
      onCancel={handleModalClose}
      footer={null}
      centered
      maskClosable={true}
      destroyOnClose={true}
    >
      {/* <Typography.Paragraph> */}
      <div>
      {/* <h2>Account Verification</h2> */}

        {console.log('Message Verification', messageVerification)}
        <div dangerouslySetInnerHTML={{ __html: messageVerification }} />
      </div>
      {/* </Typography.Paragraph> */}
    </Modal>
    </>
  );
};

export default PlatformCard;
