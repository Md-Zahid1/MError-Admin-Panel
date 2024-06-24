import * as React from 'react';
import Typography from '@mui/material/Typography';
import { appointmentDetail } from 'src/http';
import { useParams } from 'react-router-dom';
import { Card } from '@mui/material';
import moment from 'moment';


export default function AppointmentDetailView() {
  const [appointmentData, setAppointmentData] = React.useState({})

  const param = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await appointmentDetail(param.id)
      console.log("data", data)
      setAppointmentData(data)
    }
    fetchData()
  }, [param.id])

  return (
    <Card sx={{ p: 5 }}>
      <Typography>Consultant:- {appointmentData?.consultant?.name}</Typography>
      <Typography>User:- {appointmentData?.user?.name}</Typography>
      <Typography>Slot:- {moment(appointmentData.slot).format("DD-MM-YYYY")}</Typography>
      <Typography>SessionMode:- {appointmentData.sessionMode}</Typography>
      <Typography>Duration:- {appointmentData.duration}</Typography>
      <Typography>Packege:- {appointmentData.packege}</Typography>
      <Typography>Payment:- {appointmentData.payment}</Typography>
      <Typography>FeeAmount:- {appointmentData.feeAmount}</Typography>
      <Typography>GstAmount:- {appointmentData.gstAmount}</Typography>
      <Typography>TotalAmount:- {appointmentData.totalAmount}</Typography>
      <Typography>Status:- {appointmentData.status}</Typography>
      <Typography>PaymentStatus:- {appointmentData.paymentStatus}</Typography>
    </Card>
  );
}