import React from "react"
import { Box, Grid, Stack, Typography } from "@mui/material"
import { Button, Space } from "antd"
import { center } from "@antv/g2plot/lib/plots/sankey/sankey"


const MasterContractJobDetail = ({ masterContract }) => {

    return (
        <>

            <Box sx={{ border: "1px solid grey", borderRadius: 1, padding: 2, margin: 2 }}>
                <Grid container spacing={1}>

                    <Grid xs={5}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <Space align="center" direction="vertical">
                                <Typography sx={{ fontWeight: "bold", fontSize: 12 }}>{masterContract.contractName}</Typography>
                                <Typography sx={{ fontSize: 12 }}>{masterContract.contractDescription}</Typography>
                            </Space>
                        </div>

                    </Grid>



                        <Grid xs={4}>
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <Space align="center" direction="vertical">
                                    <Typography sx={{ fontSize: 12 }}><b>Job type: </b>{masterContract.jobType}</Typography>
                                </Space>

                            </div>
                        </Grid>




                        <Grid xs={2}>
                            <Space direction="vertical">
                                <Typography sx={{ fontSize: 12 }}><b>Status:</b> Active</Typography>
                            </Space>
                        </Grid>



                        <Grid xs={1}>
                            <Space direction="vertical">
                                <Button>Clone</Button>
                            </Space>
                        </Grid>
                </Grid>



            </Box>

            {/* <Box sx={{ display: "flex", height: "36px" }}>
                <Box sx={{ border: "1px solid grey", borderRadius: 1, padding: 2, margin: 2 }}>

                    <Box sx={{ width: "25%" }}>
                        <Space align="center" direction="vertical">
                            <Typography sx={{ fontWeight: "bold", fontSize: 14 }}>{masterContract.contractName}</Typography>
                            <Typography sx={{ fontSize: 14 }}>{masterContract.contractDescription}</Typography>
                        </Space>

                    </Box>

                    <Box sx={{ width: "25%" }}>

                        <Space align="center" direction="vertical">
                            <Typography sx={{ fontSize: 14 }}><b>Job type: </b>{masterContract.jobType}</Typography>
                        </Space>

                    </Box>

                    <Box sx={{ width: "25%" }}>
                        <Space direction="vertical">
                            <Typography sx={{ fontSize: 14 }}><b>Status:</b> Active</Typography>
                        </Space>

                    </Box>

                    <Box sx={{ width: "25%" }}>
                        <Space direction="vertical">
                            <Button>Clone</Button>
                        </Space>

                    </Box>


                </Box>

            </Box> */}

        </>
    )
}


export default MasterContractJobDetail