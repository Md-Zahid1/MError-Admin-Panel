import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import TextInput from 'src/components/atom/TextInput';
import { Grid } from '@mui/material';
import { useState, useEffect } from 'react';
import { blogDetail, createBlog, updateBlog, getCategory } from 'src/http';
import { uploadFile } from 'src/utils/imageUpload';
import TextEditorQuill from '../atom/TextEditorQuill';
import MultipleSelectInput from '../atom/MultipleSelectInput';
import Dropzone from '../atom/Dropzone';



const schema = Yup.object().shape({
    title: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required'),
    contant: Yup.string()
        .required("Required")
});


const BlogForm = ({ param }) => {
    const [categoryData, setCategoryData] = useState([])
    const [blogData, setBlogData] = useState({})
    console.log("categoryData", categoryData)


    useEffect(() => {
        if (param.id) {
            const fetchData = async () => {
                const data = await blogDetail(param.id)
                console.log("dataaaa", data)
                setBlogData(data)
            }
            fetchData()
        }
    }, [param.id])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategory({ type: "Blog" })
            setCategoryData(data.result)
        }
        fetchData()
    }, [])

    const submitHandler = async (value) => {
        console.log("vvvvvvv", value)
        let fileUrl;
        if (value.bannerFile) {
            fileUrl = await uploadFile(value.bannerFile);
            delete value.bannerFile
        }

        const pay = { ...value, banner: fileUrl ?? value.banner }
        param.id ? updateBlog(param.id, pay) : createBlog(pay)
    }

    return (
        <Formik validationSchema={schema} enableReinitialize onSubmit={submitHandler} initialValues={{
            banner: blogData.banner ?? "",
            bannerFile: "",
            title: blogData.title ?? "",
            category: blogData.category ?? [],
            description: blogData.description ?? "",
            contant: blogData.contant ?? ""
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
                                        <p>{param?.id ? "Update Blog" : "New Blog"}</p>
                                        <Dropzone values={values.banner}
                                            onChange={(file) => {
                                                console.log("file", file)
                                                setFieldValue("bannerFile", file)
                                                setFieldValue("banner", URL.createObjectURL(file))
                                            }}
                                        />
                                    </Card>
                                </Grid>

                                <Grid item xs={8} md={8}>
                                    <Card sx={{ p: 5, width: 1 }}>
                                        <Stack spacing={3}>
                                            <Stack spacing={3}>
                                                <TextInput name="title" label="Title" />
                                                <TextInput name="description" label="Description" multiline />

                                                <MultipleSelectInput options={
                                                    categoryData?.map((cat, ind) => (
                                                        {
                                                            value: cat?._id,
                                                            label: cat?.title
                                                        }
                                                    ))
                                                } label="Category" name="category" />
                                                <TextEditorQuill name="contant" />
                                            </Stack>
                                        </Stack>
                                    </Card>
                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="inherit"
                                        sx={{ top: { md: 24 }, float: "right" }}
                                    >
                                        {param.id ? "Update Blog" : "Create Blog"}
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

export default BlogForm
