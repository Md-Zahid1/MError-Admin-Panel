import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'src/components/atom/TextInput';
import { Grid } from '@mui/material';
import SelectInput from '../atom/SelectInput';
import Dropzone from '../atom/Dropzone';
import UploadFile from '../../utils/uploadFile';


const schema = Yup.object().shape({
    name: Yup.string()
        .required('Required'),
    email: Yup.string()
        .required('Required'),
    mobile: Yup.string()
        .required('Required'),
    country: Yup.string()
        .required('Required'),
    state: Yup.string()
        .required('Required'),
    city: Yup.string()
        .required('Required'),
    address: Yup.string()
        .required('Required'),
    zipCode: Yup.string()
        .required('Required'),
    company: Yup.string()
        .required('Required'),
    role: Yup.string()
        .required('Required'),
});


const UserForm = ({ param }) => {
    console.log("p", param)

    const submitHandler = async (value) => {
        console.log("vvvvvvvvv", value)
        let fileUrl;
        if (value.avatarFile) {
            fileUrl = await UploadFile(value.avatarFile);
            delete value.avatarFile
        }
    const pay = { ...value, avatar: fileUrl ?? value.avatar }
    }


    return (
        <Formik validationSchema={schema} onSubmit={submitHandler} initialValues={{
            avatar: "",
            avatarFile: "",
            name: "",
            email: "",
            mobile: "",
            country: "",
            state: "",
            city: "",
            address: "",
            zipCode: "",
            company: "",
            role: ""
        }}>
            {
                ({ values, setFieldValue, errors }) => {
                    console.log("values", values)
                    console.log("error", errors)
                    return (
                        <Form>
                            <Grid spacing={3} container >
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ p: 5, width: 1, }}>
                                        <p>{param?.id ? "Update User" : "New User"}</p>
                                        <Dropzone
                                            values={values.avatar}
                                            onChange={(file) => {
                                                console.log("file", file)
                                                setFieldValue("avatarFile", file)
                                                setFieldValue("avatar", URL.createObjectURL(file))
                                            }}
                                        />
                                    </Card>
                                </Grid>

                                <Grid item xs={8} md={8}>
                                    <Card sx={{ p: 5, width: 1, }}>
                                        <Stack spacing={3}>
                                            <TextInput name="name" label="Full Name" />
                                            <TextInput name="email" label="Email address" />
                                            <TextInput name="mobile" label="Mobile Number" />
                                            <TextInput name="country" label="Country" />
                                            <TextInput name="state" label="State" />
                                            <TextInput name="city" label="City" />
                                            <TextInput name="address" label="Address" />
                                            <TextInput name="zipCode" label="Zip" />
                                            <TextInput name="company" label="Company" />
                                            <SelectInput label="Role"
                                                options={
                                                    [
                                                        {
                                                            value: "user",
                                                            label: "User"
                                                        },
                                                        {
                                                            value: "profetional-practicenor",
                                                            label: "Profetional Practicenor"
                                                        },
                                                        {
                                                            value: "buddy-practicenor",
                                                            label: "Buddy Practicenor"
                                                        }
                                                    ]
                                                } name="role" />
                                        </Stack>
                                    </Card>

                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="inherit"
                                        sx={{ top: { md: 24 }, float: "right" }}
                                    >
                                        {param?.id ? "Update User" : "Create User"}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }
            }
        </Formik>
    )
}

export default UserForm
