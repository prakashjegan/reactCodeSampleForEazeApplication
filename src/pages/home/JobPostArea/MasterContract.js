import { Button } from "antd";
import React, { useState } from "react";
import { useEffect } from "react";
import jobsService from "../../../services/jobService";
import MasterContractobDetail from "../../home/JobPostArea/MasterContractJobDetails";
import "./style.scss";
import {
  Dialog,
  sDialogContent,
  DialogTitle,
  Pagination,
  DialogContent,
  Box,
  Stack,
} from "@mui/material";
import DataTable from "react-data-table-component";
import ic_info from "../../../assets/images/common/ic_info.png";
import { useNavigate } from "react-router-dom";

const MasterContract = ({
  setShowMasterContract,
  isMasterrContractSelected,
}) => {
  const navigate = useNavigate(); 

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [count, setCount] = useState(0);
  const [data, setdata] = useState([]);

  const [optionLoading, setOptionLoading] = useState(true);
  const [selectedMasterContract, setMasterContract] = useState(
    isMasterrContractSelected
  );

  useEffect(() => {
    getData();
    return () => {};
  }, [currentPage, selectedMasterContract]);

  const getData = () => {
    if (selectedMasterContract) {
      fetchMasterContract();
    } else {
      fetchPastPostedJobs();
    }
  };

  const fetchMasterContract = () => {
    
    setOptionLoading(true);
    jobsService
      .fetchMasterContract({
        page: currentPage,
        size: rowsPerPage,
        fetchLevels: "NONE",
      })
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setCount(parseInt(res?.data?.message?.count || 0));
          //   setCount(31);
          setdata(res.data.message.contractGroupBOs);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const fetchPastPostedJobs = () => {
    setOptionLoading(true);
    jobsService
      .fetchPastPostedJobs({
        page: currentPage,
        size: rowsPerPage,
        fetchLevels: "NONE",
      })
      .then((res) => {
        setOptionLoading(false);
        if (res.data.message) {
          setCount(5);
          //   setCount(parseInt(res?.data?.message?.count || 0));
          setdata(res.data.message.jobDefinitionTags);
        }
      })
      .catch(() => {
        setOptionLoading(false);
      });
  };

  const CustomPagination = (props) => {
    return (
      <div className="dataTable-footer">
        <Pagination
          count={Math.ceil(count / rowsPerPage)}
          onChange={(e, page) => {
            setCurrentPage(page);
          }}
          page={parseInt(currentPage)}
          siblingCount={0}
          variant="outlined"
          color="primary"
          shape="rounded"
        />
      </div>
    );
  };

  const columns = [
    {
      name: "",
      sortable: true,
      width: "40%",
      selector: (row) => {
        return (
          <Box>
            <div className="tag-list">
              <b style={{fontSize: 14}}>Name: </b>
              {row.contractName}
            </div>

            <div className="tag-list" style={{padding: 2}}>
                <b style={{fontSize: 14}}>Description: </b>
                {row.contractDescription}
              <img src={ic_info} alt="info icon" style={{ height: "15px" }} />
            </div>
          </Box>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "35%",

      selector: (row) => {
        return (
          <div className="tag-list" style={{ fontSize: "14px" }}>
            <b>Job type: </b>
            {row.jobType}
          </div>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "15%",

      selector: (row) => {
        return (
          <div className="tag-list" style={{ fontSize: "14px" }}>
            <b>Status: </b>Active
          </div>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "10%",

      selector: (row) => {
        return (
          <div className="tag-list">
            <Button type="primary" onClick={(e)=> {
              navigateData(e , row)
            } }>Clone</Button>
          </div>
        );
      },
    },
  ];
  const navigateData = (e, row) => {
    console.log('Navigate Data' , e, row)
    if (row.contractMakerType === "MASTER") {
      navigate(`/post-a-job/MASTER_CONTRACT/${row.contractGroupID}`);
    } else {
      navigate(`/post-a-job/PAST_DEFINITION/${row.jobDefinitionId}`);

    }
  }
  const pastPostedColumns = [
    {
      name: "",
      sortable: true,
      width: "30%",
      selector: (row) => {
        return (
          <Box>
            <div className="tag-list" style={{margin: 5}}>
              <b style={{fontSize: 14}}>Name: </b>
              {row.jobName}
            </div>

            <div className="tag-list" style={{margin: 5}}>
                <b style={{fontSize: 14}}>Description: </b>
                {row.jobDescription}
                <img src={ic_info} alt="info icon" style={{ height: "15px" }} />
            </div>
          </Box>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "30%",
      selector: (row) => {
        return (
          <Box className="tag-list" sx={{ display: "flex" }}>
            <Stack sx={{ fontSize: "14px" }}>
              <span style={{ padding: "5px" }}>
                <b>Last Updated: </b>
                {row.updatedAt}
              </span>
              <span style={{ padding: "5px" }}>
                <b>Job type: </b>
                {row.jobType}
              </span>
            </Stack>
          </Box>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "15%",
      selector: (row) => {
        return (
          <Box className="tag-list" sx={{ display: "flex" }}>
            <Stack sx={{ fontSize: "14px" }}>
              <span style={{ padding: "5px" }}>
                <b>Status: </b>Active
              </span>

              <div className="tag-item">
                <b>Tags: </b>
                {row.tags}
              </div>
            </Stack>
          </Box>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "10%",
      selector: (row) => {
        return (
          <Box className="tag-list" sx={{ display: "flex" }}>
            <Stack sx={{ fontSize: "14px" }}>
              <span style={{ padding: "5px" }}>
                <b>Amount: </b> {row.amount}
              </span>
            </Stack>
          </Box>
        );
      },
    },

    {
      name: "",
      sortable: true,
      width: "10%",

      selector: (row) => {
        return (
          <div className="tag-list">
            <Button type="primary"  onClick={(e)=> {
              navigateData(e , row)
            } }>Clone</Button>
          </div>
        );
      },
    },
  ];

  return (
    <Dialog
      fullWidth={true}
      maxWidth={true}
      open={true}
      onClose={() => {
        setShowMasterContract(false);
      }}
    >
      <DialogTitle id="scroll-dialog-title">
        <div>
          <Button
            type={selectedMasterContract ? "primary" : "dashed"}
            style={{ width: "180px", marginRight: 30 }}
            onClick={() => {
              setMasterContract(true);
              setCurrentPage(1);
            }}
          >
            Master Contract
          </Button>
          <Button
            type={selectedMasterContract ? "dashed" : "primary"}
            style={{ width: "180px" }}
            onClick={() => {
              setMasterContract(false);
              setCurrentPage(1);
            }}
          >
            Past Posted Jobs
          </Button>
        </div>
      </DialogTitle>

      <DialogContent dividers={scroll === "paper"}>
        <DataTable
          pagination
          columns={selectedMasterContract ? columns : pastPostedColumns}
          paginationPerPage={rowsPerPage}
          paginationComponent={CustomPagination}
          paginationDefaultPage={currentPage + 1}
          data={data}
        />
      </DialogContent>
    </Dialog>
  );
};

export default MasterContract;
