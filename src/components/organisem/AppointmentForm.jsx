import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'src/components/atom/TextInput';
import { Grid } from '@mui/material';
import SelectInput from '../atom/SelectInput';
import Dropzone from '../atom/Dropzone';


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


const AppointmentForm = ({ param }) => {
    console.log("p", param)

    const submitHandler = (value) => {
        console.log("vvvvvvvvv", value)
    }

    return (
        <Formik validationSchema={schema} onSubmit={submitHandler} initialValues={{
            name: "",
            email: "",
            mobile: "",
            country: "",
            state: "",
            address: "",
            city: "",
            zipCode: "",
            company: "",
            role: "",
            // chip: []
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
                                        <p>{param?.id ? "Update Appointment" : "New Appointment"}</p>
                                        <Dropzone />
                                    </Card>
                                </Grid>

                                <Grid item xs={8} md={8}>
                                    <Card sx={{ p: 5, width: 1, }}>

                                        <Stack spacing={3}>
                                            {/* <MultipleSelectInput options={[
                                                {
                                                    value: "done",
                                                    label: "done"
                                                },
                                                {
                                                    value: "cancel",
                                                    label: "cancel"
                                                },
                                                {
                                                    value: "proccess",
                                                    label: "proccess"
                                                }
                                            ]}  label="Chip" name="chip"/> */}
                                            <TextInput name="consultant" label="Consultant" />
                                            <TextInput name="user" label="User" />
                                            <TextInput name="slot" label="Slot" />
                                            <TextInput name="sessionMode" label="SessionMode" />
                                            <TextInput name="duration" label="Duration" />
                                            <TextInput name="packege" label="Packege" />
                                            <TextInput name="payment" label="Payment" />
                                            <TextInput name="feeAmount" label="FeeAmount" />
                                            <TextInput name="gstAmount" label="GstAmount" />
                                            <TextInput name="totalAmount" label="TotalAmount" />
                                            {/* <TextInput name="status" label="Status" /> */}
                                            <SelectInput label="status" options={[{
                                                value: "done",
                                                label: "done"
                                            },
                                            {
                                                value: "cancel",
                                                label: "cancel"
                                            },
                                            {
                                                value: "proccess",
                                                label: "proccess"
                                            }
                                            ]} name="status" />

                                            <SelectInput label="PaymentStatus" options={[{
                                                value: "success",
                                                label: "success"
                                            },
                                            {
                                                value: "faild",
                                                label: "faild"
                                            },
                                            {
                                                value: "proccess",
                                                label: "proccess"
                                            }
                                            ]} name="paymentStatus" />
                                        </Stack>
                                    </Card>

                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="inherit"
                                        sx={{ top: { md: 24 }, float: "right" }}
                                    >
                                        {param?.id ? "Update Appointment" : "Create Appointment"}
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

export default AppointmentForm
