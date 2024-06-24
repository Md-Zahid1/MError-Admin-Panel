import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { assignmentDetail } from 'src/http';
import { useParams } from 'react-router-dom';
import { Card, Grid, Stack, Divider } from '@mui/material';


export default function AssignmentDetailView() {
  const [assignmentData, setAssignmentData] = React.useState({})

  const param = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await assignmentDetail(param.id)
      console.log("dd", data)
      setAssignmentData(data)
    }
    fetchData()
  }, [param.id])

  return (
    <Card sx={{ p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img src={assignmentData.banner} alt='banner' />
        </Grid>
        <Grid item xs={6}>
          <Typography variant='h5'>{assignmentData.title}</Typography>
          <Typography>BasedOn:- {assignmentData.basedOn}</Typography>
          <Typography>Category:- {assignmentData?.category?.map((cat) => (cat.title))}</Typography>
          <Typography>{assignmentData.description}</Typography>
        </Grid>
      </Grid>

      <Divider>Questions</Divider>
      <Typography>{assignmentData?.questions?.map((data, ind) => (
        <Box sx={{ borderRadius: 2, border: '2px solid grey', p: 2, mt: 2 }}>
          <Stack direction="row" gap={1}>
            <Typography variant='h5'>Question .{ind + 1} -</Typography>
            <Typography variant='h6'>{data.question}</Typography>
          </Stack>
          {!data?.type ? < Typography variant='h6'>Answer - {data.answer}</Typography> : ""}
          {
            data?.type === "text"
              ?
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={5}>
                  <Typography>A:- {data?.options?.a?.option}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>B:- {data?.options?.b?.option}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>C:- {data?.options?.c?.option}</Typography>
                </Grid>
                <Grid item xs={5}>
                  <Typography>D:- {data?.options?.d?.option}</Typography>
                </Grid>
                <Grid item xs={5}>
                  {/* <Typography>D:- {data?.options?.d?.option}</Typography> */}
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='h6'>Answer - {data.answer}</Typography>
                </Grid>
              </Grid>
              : ""
          }

          {
            data?.type === "color"
              ?
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={5}>
                  <Typography>A:- {data?.options?.a?.option}</Typography>
                  <Box sx={{ bgcolor: data?.options?.a?.color, height: 0.1, width: 0.1 }} />
                </Grid>
                <Grid item xs={5}>
                  <Typography>B:- {data?.options?.b?.option}</Typography>
                  <Box sx={{ bgcolor: data?.options?.b?.color, height: 0.1, width: 0.1, borderRadius: 50 }} />
                </Grid>
                <Grid item xs={5}>
                  <Typography>C:- {data?.options?.c?.option}</Typography>
                  <Box sx={{ bgcolor: data?.options?.c?.color, height: 0.1, width: 0.1, borderRadius: 50 }} />
                </Grid>
                <Grid item xs={5}>
                  <Typography>D:- {data?.options?.d?.option}</Typography>
                  <Box sx={{ bgcolor: data?.options?.d?.color, height: 0.1, width: 0.1, borderRadius: 50 }} />
                </Grid>
                <Grid item xs={5}>
                  {/* <Typography>D:- {data?.options?.d?.option}</Typography> */}
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='h6'>Answer - {data.answer}</Typography>
                </Grid>
              </Grid>
              : ""
          }



          {
            data?.type === "image"
              ?
              <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} >
                <Grid item xs={5}>
                  <Typography>A:- {data?.options?.a?.option}</Typography>
                  <img src={data?.options?.a?.image} alt='banner' height={200} width={200} />
                </Grid>
                <Grid item xs={5}>
                  <Typography>B:- {data?.options?.b?.option}</Typography>
                  <img src={data?.options?.b?.image} alt='banner' height={200} width={200} />
                </Grid>
                <Grid item xs={5}>
                  <Typography>C:- {data?.options?.c?.option}</Typography>
                  <img src={data?.options?.c?.image} alt='banner' height={200} width={200} />
                </Grid>
                <Grid item xs={5}>
                  <Typography>D:- {data?.options?.d?.option}</Typography>
                  <img src={data?.options?.d?.image} alt='banner' height={200} width={200} />
                </Grid>
                <Grid item xs={5}>
                  {/* <Typography>D:- {data?.options?.d?.option}</Typography> */}
                </Grid>
                <Grid item xs={5}>
                  <Typography variant='h6'>Answer - {data.answer}</Typography>
                </Grid>
              </Grid>
              : ""
          }


        </Box>
      ))}</Typography>
    </Card >
  );
}
