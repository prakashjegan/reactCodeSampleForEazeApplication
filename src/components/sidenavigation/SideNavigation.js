import { Link } from "react-router-dom"
// import { AppLogoIcon, AppTitleIcon } from "../../assets/icons/figmaIcons"
import { AppLogoIcon } from "../../assets/icons/figmaIcons"
import "./style.scss"
const SideNavigation = () => {
   return (
      <div className="sideNavigation">
         <div className="sideNavigation-body">
            <Link>General Information</Link>
            <Link>About Us</Link>
            <Link>Help center</Link>
            <Link>Terms & Condition</Link>
            <Link>Advertising Preferences</Link>
            <Link>Advertising</Link>
            <Link>Business Services</Link>
         </div>
         <div className="sideNavigation-footer">
            <i>
               {/* <AppLogoIcon /> */}
               {/* <AppTitleIcon /> */}
            </i>
            {/* <span>Copyright &copy; All rights Reserved</span> */}
         </div>
      </div>
   )
}
export default SideNavigation
