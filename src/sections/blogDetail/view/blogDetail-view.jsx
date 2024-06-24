import * as React from 'react';
import Typography from '@mui/material/Typography';
import { blogDetail } from 'src/http';
import { useParams } from 'react-router-dom';
import { Box, Card, Badge } from '@mui/material';


export default function BlogDetailView() {
  const [blogData, setBlogData] = React.useState({})

  const param = useParams()

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await blogDetail(param.id)
      console.log("data", data)
      setBlogData(data)
    }
    fetchData()
  }, [param.id])

  return (
    <Card sx={{ p: 5 }}>
      {/* <Box
        sx={{
          backgroundImage: `url(${blogData.banner})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "500px",
        }}
      >
        </Box > */}
        <img src={blogData.banner} alt='banner' />
        <Typography variant='h4' marginTop={4}>{blogData?.title}
          <Badge sx={{ marginLeft: 6 }} color="secondary"
            badgeContent={<Typography>{blogData?.category?.map((cat) => (cat.title))}</Typography>}
           />
        </Typography>

        <Typography variant='h6'>{blogData?.description}</Typography>
        <Box marginTop={10} >
          <div dangerouslySetInnerHTML={{ __html: blogData?.contant }} />
        </Box>
    </Card>
  );
}

