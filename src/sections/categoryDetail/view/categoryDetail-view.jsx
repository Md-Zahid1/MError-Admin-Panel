import * as React from 'react';
import Typography from '@mui/material/Typography';
import { categoryDetail } from 'src/http';
import { useParams } from 'react-router-dom';
import { Card, Grid } from '@mui/material';



export default function CategoryDetailView() {
  const [categoryData, setCategoryData] = React.useState({})


  const param = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await categoryDetail(param.id)
      setCategoryData(data)
    }
    fetchData()
  }, [param.id])

  return (
    <Card sx={{ p: 5 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <img src={categoryData.banner} alt='banner' />
        </Grid>
        <Grid item xs={6}>
          <Typography>Title:- {categoryData.title}</Typography>
          <Typography>Type:- {categoryData.type}</Typography>
          <Typography>Description:- {categoryData.description}</Typography>
        </Grid>
      </Grid>
    </Card>
  );
}