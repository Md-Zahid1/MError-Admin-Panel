import React from 'react'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { Link, Breadcrumbs } from '@mui/material';


const FormPageTitle = ({ title, links = [{ label: "home", value: "/home" }], }) => (

    <Box sx={{ marginBottom: "50px" }}>

        <Stack>
            <Box>
                <Typography variant="h4">{title}</Typography>
                <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                    {
                        links.map((lnk) => (
                            <Link underline="hover" color="inherit" href={lnk.value}>
                                <Typography color="text.primary">{lnk.label}</Typography>
                            </Link>
                        ))
                    }
                </Breadcrumbs>
            </Box>
        </Stack>
    </Box>
)


export default FormPageTitle
