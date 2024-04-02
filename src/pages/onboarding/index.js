import React, { useEffect, useState } from "react";
import MultiStepProgressBar from "../../components/step-progress";
import Navbar from "../../components/navbar";
import "./style.scss";
import OnboardingBankDetails from "./bankdetails";
import OnboardingAddress from "./address";
import OnboardingSupportPerson from "./supportperson";
import OnboardingKYC from "./kyc";
import OnboardingPlatform from "./platform";
import OnboardingBasicDetails from "./basicdetails";
import { useNavigate, useSearchParams } from "react-router-dom";
import { navigationPageNumber } from "../Payments/utills";

const Onboarding = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    let to = searchParams.get("to");
    if (to) setPage(navigationPageNumber[to]);
  }, []);

  const navigate = useNavigate();

  const navigatePage = (pagenumber) => {
    let pageMode = "basicDetails";
    if (pagenumber == 1) {
      pageMode = "basicDetails";
    } else if (pagenumber == 2) {
      pageMode = "platform";
    } else if (pagenumber == 3) {
      pageMode = "address";
    } else if (pagenumber == 4) {
      pageMode = "supportPerson";
    } else if (pagenumber == 5) {
      pageMode = "kyc";
    } else if (pagenumber == 6) {
      pageMode = "bankDetails";
    }
    setPage(pagenumber);

    navigate({
      pathname: "/onboarding",
      search: `?to=${pageMode}`,
    });
  };

  const handleNext = () => {
    navigatePage(page + 1);
  };

  const handlePage = (pagenumber) => {
    navigatePage(pagenumber);
    //setPage(pagenumber)
  };

  const [steps] = useState([
    {
      label: "Basic Details",
      value: navigationPageNumber["basicDetails"],
      component: <OnboardingBasicDetails handleNext={handlePage} />,
    },
    {
      label: "Platform",
      value: navigationPageNumber["platform"],
      component: <OnboardingPlatform handleNext={handlePage} />,
    },
    {
      label: "Address",
      value: navigationPageNumber["address"],
      component: <OnboardingAddress handleNext={handlePage} />,
    },
    {
      label: "Support Person",
      value: navigationPageNumber["supportPerson"],
      component: <OnboardingSupportPerson handleNext={handlePage} />,
    },
    {
      label: "KYC",
      value: navigationPageNumber["kyc"],
      component: <OnboardingKYC handleNext={handlePage} />,
    },
    {
      label: "Bank Details",
      value: navigationPageNumber["bankDetails"],
      component: <OnboardingBankDetails />,
    },
  ]);

  return (
    <div className="onboarding-conmtainer">
      <Navbar />

      <div className="details-container">
        <MultiStepProgressBar
          steps={steps}
          page={page}
          onPageNumberClick={handlePage}
        />
        {steps?.find((elem) => elem.value === page)?.component}
      </div>
    </div>
  );
};

export default Onboarding;
