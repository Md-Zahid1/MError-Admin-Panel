import Stack from '@mui/material/Stack';
import { Box, TextField, Typography } from '@mui/material';


const Dropzone = ({ onChange, values }) => (
    <Stack gap="24px" p="24px" spacing="3">

        <Box p="40px" borderRadius="8" border="1px dashed grey">
            <Stack gap="24px" alignItems='center' justifyContent='center'>
                <TextField type='file' onChange={(e) => onChange(e.target.files[0])}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="6em" height="6em" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
                    </svg>
                </TextField>
                {values
                    ? <img src={values} alt='banner'/>
                    : <Typography fontSize='1.125rem'>Drop or Select file</Typography>
                    // <Typography>Drop files here or click browse thorough your machine</Typography>
                }
            </Stack>
        </Box>

    </Stack>
)

export default Dropzone
