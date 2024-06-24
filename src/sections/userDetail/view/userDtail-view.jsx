import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Card, Grid } from '@mui/material';
// import Table from 'src/components/Table/view/tableData-view';
import { userDetail } from 'src/http';
import { useParams } from 'react-router-dom';
import BlogTableData from 'src/components/BlogTable/view/blogTableData-view';
// import ExpertTableData from 'src/components/ExpertTable/view/expertTableData-view';
import AssignmentTableData from 'src/components/AssignmentTable/view/assignmentTableData-view';
import AppointmentTableData from 'src/components/AppointmentTable/view/appointmentTableData-view';


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

export default function UserDetailView() {
  const [value, setValue] = React.useState(0);
  const [userData, setUserData] = React.useState({})

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const param = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await userDetail(param.id)
      setUserData(data)
    }
    fetchData()
  }, [param.id])

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Basic Detail" {...a11yProps(0)} />
          <Tab label="Blogs" {...a11yProps(1)} />
          <Tab label="Result" {...a11yProps(2)} />
          <Tab label="Appointment" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Card sx={{ p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <img src={userData.avatar} alt='avatar' />
            </Grid>
            <Grid item xs={6}>
              <Typography>Name:- {userData.name}</Typography>
              <Typography>Email:- {userData.email}</Typography>
              <Typography>Mobile:- {userData.mobile}</Typography>
              <Typography>Gender:- {userData.gender}</Typography>
            </Grid>
          </Grid>

        </Card>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <BlogTableData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <AssignmentTableData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <AppointmentTableData />
      </CustomTabPanel>
    </Box >
  );
}