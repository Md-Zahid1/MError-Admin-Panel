import * as React from 'react';
import Typography from '@mui/material/Typography';
import { consultantDetail } from 'src/http';
import { useParams } from 'react-router-dom';
import { Box, Card, Grid } from '@mui/material';
import Table from 'src/components/Table/view/tableData-view';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import BlogPage from 'src/pages/blog';
// import AssignmentPage from 'src/pages/assignment';



function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function ConsultantDetailView() {
  const [consultantData, setConsultantData] = React.useState({})
  console.log("consultantData", consultantData)
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const param = useParams()

  React.useState(() => {
    const fetchData = async () => {
      const data = await consultantDetail(param.id)
      setConsultantData(data)
    }
    fetchData()
  }, [])

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Basic Details" {...a11yProps(0)} />
          <Tab label="Rating" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Card sx={{ p: 5, }}>
          <Grid container spacing={2} >
            <Grid item xs={6}>
              <img src={consultantData.avatar} alt='avatar' />
            </Grid>
            <Grid item xs={6}>
              <Typography>Name:- {consultantData.name}</Typography>
              <Typography>Email:- {consultantData.email}</Typography>
              <Typography>Mobile:- {consultantData.mobile}</Typography>
              <Typography>Address:- {consultantData.address}</Typography>
              <Typography>Profession:- {consultantData.designation}</Typography>
              <Typography>Dipartment:- {consultantData.dipartment}</Typography>
              <Typography>Language:- {consultantData?.languages?.join(", ")}</Typography>
              <Typography>Expertise:- {consultantData?.expertise?.join(", ")}</Typography>
            </Grid>
          </Grid>
        </Card>
        <Grid container spacing={2} marginTop={4}>
          <Grid item xs={4}>
            <Card sx={{ p: 2, }}>
              <Typography marginLeft={18}>{consultantData.cases} +</Typography>
              <Typography marginLeft={15} variant='h5'>Cases</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ p: 2, }}>
              <Typography marginLeft={18}>{consultantData.experince} +</Typography>
              <Typography marginLeft={15} variant='h5'>Experince</Typography>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card sx={{ p: 2, }}>
              <Typography marginLeft={20}>{consultantData.rating} +</Typography>
              <Typography marginLeft={18} variant='h5'>Rating</Typography>
            </Card>
          </Grid>
        </Grid>

        <Card sx={{ p: 5, mt: 4 }}>
          <Typography variant='h6' marginTop={2}>About</Typography>
          <Typography>{consultantData.about}</Typography>
          <Typography variant='h6' marginTop={2}> Fun Fact</Typography>
          <Typography>{consultantData.funFact}</Typography>
          <Typography>ChattingFee:- {consultantData?.fee?.chatting}</Typography>
          <Typography>VoiceCallFee:- {consultantData?.fee?.voiceCall}</Typography>
          <Typography>VideoCallFee:- {consultantData?.fee?.videoCall}</Typography>
        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Table />
      </CustomTabPanel>
    </Box>
  );
}