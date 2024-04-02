import React, { useEffect, useState } from "react";
import './style.scss';
import { Box, Card, Typography, CardActions, Grid, Stack } from "@mui/material";
import CardContent from '@mui/material/CardContent';
import uploadIcon from '../../../assets/images/common/uploadIcon.png';
import Divider from '@mui/material/Divider';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Upload } from 'antd';
import onboardService from "../../../services/onboardService";
import axios from "axios";
import UploadFile from "./uploadFile";
import { center } from "@antv/g2plot/lib/plots/sankey/sankey";
import { navigationPageNumber } from "../../Payments/utills";





const OnboardingKYC = ({ handleNext }) => {

    const [optionLoading, setOptionLoading] = useState(true);
    const [kycList, setKycList] = useState([{}]);
    const [aadharUrl, setAadharUrl] = useState("");
    const [panUrl, setPanUrl] = useState("");
    const [imageHash, setImageHash] = useState();
    const [urlHash, setUrlHash] = useState();


    let documentTypes = ["PASSPORT", "AADHAR", "PAN_CARD", "DRIVER_LICENCE"]
    let nameHash = { PASSPORT: "Passport", AADHAR: "Aadhar or National Id card(SSN)", PAN_CARD: "PAN or TIN", DRIVER_LICENCE: "Driving Licence" }



    const fetchKyc = () => {
        setOptionLoading(true);
        onboardService.fetchKyc()
            .then((res) => {
                setOptionLoading(false);
                if (res.data.message) {
                    let imageHash = {}
                    let urlHash = {}
                    res.data.message.map((a) => {
                        let url = a.documentLink;
                        urlHash[a.documentName] = a.documentLink;
                        if(url && url.includes("?")){
                            let values = url.split("?")[0].split("/");
                            imageHash[a.documentName] = values[values.length - 1]
                        }
                        
                    })
                    setImageHash(imageHash)
                    setUrlHash(urlHash)
                    console.log(kycList);
                    
                }
            })
            .catch(() => { 

                setImageHash({})
                setUrlHash({})
                setOptionLoading(false) 
            })
    }

    useEffect(() => {
        fetchKyc()
    }, [])

    const handleSkip = () => {
        handleNext(navigationPageNumber['bankDetails'])
    }



    return (
        <>
            <div className="onboarding-kyc-container">

                <div style={{ textAlign: "center", fontWeight: "bold" }}>KYC</div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Grid container>
                        {imageHash && documentTypes.map((type) => (
                            <Grid lg={3} key={type}>
                                <UploadFile name={nameHash[type]} url={imageHash[type]} downloadUrl={ urlHash[type]} documentName={type} fetchKyc={fetchKyc} />
                            </Grid>
                        ))}
                    </Grid>
                </div>
                <div style={{ textAlign: "center", paddingTop: "20px" }}>
                    <Button type="primary" style={{ width: "150px" }} onClick={handleSkip}>Next</Button>
                </div>

            </div>
        </>
    )
}

export default OnboardingKYC