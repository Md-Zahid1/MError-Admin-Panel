import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'src/components/atom/TextInput';
import { Grid } from '@mui/material';
import { categoryDetail, createCategory, updateCategory } from 'src/http';
import { useState, useEffect } from 'react';
import { uploadFile } from 'src/utils/imageUpload';
import Dropzone from '../atom/Dropzone';
import SelectInput from '../atom/SelectInput';


const schema = Yup.object().shape({
    title: Yup.string()
        .required('Required'),
    type: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required')
});


const CategoryForm = ({ param }) => {
    const [categoryData, setCategoryData] = useState({})
    console.log("p", param)


    useEffect(() => {
        if (param.id) {
            const fetchData = async () => {
                const data = await categoryDetail(param.id)
                console.log("data", data)
                setCategoryData(data)
            }
            fetchData()
        }
    }, [param.id])


    const submitHandler = async (value) => {
        console.log("vvvvvvvvv", value)
        let fileUrl;
        if (value.bannerFile) {
            fileUrl = await uploadFile(value.bannerFile);
            delete value.bannerFile
        }
        const pay = { ...value, banner: fileUrl ?? value.banner }

        await param.id ? updateCategory(param.id, pay) : createCategory(pay)
        // const data = await axios.post("http://localhost:5000/api/create-category", {
        //     title: value.title,
        //     description: value.description
        // })
    }

    return (
        <Formik validationSchema={schema} enableReinitialize onSubmit={submitHandler} initialValues={{
            banner: categoryData.banner ?? "",
            title: categoryData.title ?? "",
            type: categoryData.type ?? "",
            description: categoryData.description ?? ""
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
                                        <p>{param?.id ? "Update Category" : "New Category"}</p>
                                        <Dropzone
                                            values={values.banner}
                                            onChange={(file) => {
                                                console.log("file", file)
                                                setFieldValue("bannerFile", file)
                                                setFieldValue("banner", URL.createObjectURL(file))
                                            }}
                                        />
                                    </Card>

                                </Grid>

                                <Grid item xs={8} md={8}>
                                    <Card sx={{ p: 5, width: 1, }}>

                                        <Stack spacing={3}>
                                            <TextInput name="title" label="Title" />
                                            <SelectInput label="Type" options={[
                                                {
                                                    value: "Fun Personality",
                                                    label: "Fun Personality"
                                                },
                                                {
                                                    value: "Swaip Based",
                                                    label: "Swaip Based"
                                                },
                                                {
                                                    value: "Blog",
                                                    label: "Blog"
                                                },

                                            ]} name="type" />
                                            <TextInput name="description" label="Description" multiline />
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

export default CategoryForm
