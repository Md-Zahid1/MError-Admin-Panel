import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, FieldArray, useFormikContext } from 'formik';
import * as Yup from 'yup';

import TextInput from 'src/components/atom/TextInput';
import { Box, Grid, Button, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import { getCategory, assignmentDetail, createAssignment, updateAssignment } from 'src/http';
import SelectInput from '../atom/SelectInput';
import MultipleSelectInput from '../atom/MultipleSelectInput';
import Dropzone from '../atom/Dropzone';
import { UploadFile } from 'src/utils/uploadFile';

const schemaQ = (basedOn = "Swaip Based") => {
    console.log("baseon", basedOn)
    return (
        Yup.object().shape(basedOn === "Fun Personality" ? {
            question: Yup.string()
                .required('Required'),
            answer: Yup.string()
                .required('Required'),
            type: Yup.string()
                .required("Required"),
            options: Yup.object().shape({
                a: Yup.object().shape({
                    option: Yup.string()
                        .required("Required"),
                }),
                b: Yup.object().shape({
                    option: Yup.string()
                        .required("Required"),
                }),
                c: Yup.object().shape({
                    option: Yup.string()
                        .required("Required"),
                }),
                d: Yup.object().shape({
                    option: Yup.string()
                        .required("Required"),
                })
            })
        } : {
            question: Yup.string()
                .required('Required'),
            answer: Yup.string()
                .required('Required'),

        }))
}

const schema = Yup.object().shape({
    title: Yup.string()
        .required('Required'),
    description: Yup.string()
        .required('Required'),
    basedOn: Yup.string()
        .required('Required'),
    category: Yup
        .array().of(Yup.string())
        .required("Required")
        .min(1),
    questions: Yup.array().of(
        schemaQ()
    )
});


const AssignmentForm = ({ param }) => {
    const [categoryData, setCategoryData] = useState([])
    const [assignmentData, setAssignmentData] = useState({})
    const [basedOn, setBasedOn] = useState()
    console.log("basedOn", basedOn)
    console.log("categoryData", categoryData)


    useEffect(() => {
        if (param.id) {
            const fetchData = async () => {
                const data = await assignmentDetail(param.id)
                console.log("ass", data)
                setAssignmentData(data)
            }
            fetchData()
        }
    }, [param.id])


    useEffect(() => {
        const fetchData = async () => {
            const data = await getCategory({ type: basedOn })
            setCategoryData(data.result)
        }
        fetchData()
    }, [basedOn])

    const submitHandler = async (value, { setSubmitting }) => {
        setSubmitting(true)
        // setSubmitting(false)
        console.log("vvvvvvvvv", value)

        let fileUrl;
        if (value.bannerFile) {
            fileUrl = await UploadFile(value.bannerFile);
            delete value.bannerFile
        }


        if (value.questions.find((q) => (q.type === "image"))) {
            for (const op of value.questions) {
                const [a, b, c, d] = await Promise.all(
                    Object.values(op.options).map(
                        (i) => (UploadFile(i.imageFile))
                    )
                )

                console.log("a", a)
                console.log("b", b)
                console.log("c", c)
                console.log("d", d)

                op.options.a.image = a;
                delete op.options.a.imageFile
                op.options.b.image = b;
                delete op.options.b.imageFile
                op.options.c.image = c;
                delete op.options.c.imageFile
                op.options.d.image = d;
                delete op.options.d.imageFile
                console.log("options", op.options)
            }
        }

        const pay = { ...value, banner: fileUrl ?? value.banner, }
        param.id ? updateAssignment(param.id, pay) : createAssignment(pay)
    }

    return (
        <Formik validationSchema={schema} enableReinitialize onSubmit={submitHandler} initialValues={{
            banner: assignmentData.banner ?? "",
            bannerFile: "",
            title: assignmentData.title ?? "",
            description: assignmentData.description ?? "",
            basedOn: assignmentData.basedOn ?? "",
            category: assignmentData.category?.map((cat) => (cat._id)) ?? [],
            result: [{
                scoreRange: "",
                conclusion: "",
                description: "",
            }],
            questions: assignmentData.questions ?? [{
                question: "",
                answer: "",
                type: "",
                options: {
                    a: {
                        option: "",
                        imageFile: "",
                        image: "",
                        color: "",
                    },
                    b: {
                        option: "",
                        image: "",
                        color: "",
                    },
                    c: {
                        option: "",
                        image: "",
                        color: "",
                    },
                    d: {
                        option: "",
                        image: "",
                        color: "",
                    }
                }
            }]
        }}>
            {
                ({ values, setFieldValue, errors, isSubmitting }) => {
                    console.log("values", values)
                    console.log("error", errors)
                    return (
                        <Form>
                            <Grid spacing={2} container >
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ p: 5, width: 1, }}>
                                        <p>{param?.id ? "Update Assignment" : "New Assignment"}</p>
                                        {/* <img src='https://merror-files.s3.amazonaws.com/destination%204.png' /> */}
                                        <Dropzone name="banner"
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
                                    <Card sx={{ p: 5, width: 1 }}>

                                        <Stack spacing={3}>
                                            <TextInput name="title" label="Title" />
                                            <TextInput name="description" label="Description" multiline />

                                            <SelectInput label="Based On" options={[{
                                                value: "Fun Personality",
                                                label: "Fun Personality"
                                            },
                                            {
                                                value: "Swaip Based",
                                                label: "Swaip Based"
                                            },
                                            ]} name="basedOn" onChange={(e) => {
                                                setFieldValue("basedOn", e.target.value)
                                                setBasedOn(e.target.value)
                                            }} />

                                            <MultipleSelectInput options={
                                                categoryData?.map((cat, ind) => (
                                                    {
                                                        value: cat?._id,
                                                        label: cat?.title
                                                    }
                                                ))

                                            } label="Category" name="category" />

                                            <FieldArray
                                                name="questions"
                                                render={arrayHelpers => (
                                                    <Box>
                                                        <Stack spacing={2}>
                                                            {values?.questions?.map((que, index) => (
                                                                <QuestionForm
                                                                    key={index}
                                                                    optionValues={que}
                                                                    basedOn={values.basedOn}
                                                                    index={index}
                                                                    isSubmitting={isSubmitting}
                                                                    onAdd={(v) => {
                                                                        arrayHelpers.push({ question: "", answer: "" })
                                                                    }}
                                                                    onSubmit={(v) => {
                                                                        console.log("v", v)
                                                                        setFieldValue(`questions[${index}]`, v);
                                                                    }}
                                                                    onRemove={() => arrayHelpers.remove(index)}
                                                                    showAddButton={values?.questions.length === (index + 1)} />
                                                            ))}
                                                        </Stack>
                                                    </Box>

                                                )}
                                            />


                                            <FieldArray
                                                name="result"
                                                render={arrayHelpers => (
                                                    <Box>
                                                        <Stack spacing={2}>
                                                            {values?.result?.map((res, index) => (
                                                                <Box key={index} sx={{ borderRadius: 2, border: '2px solid grey', p: 2, }}>
                                                                    <Typography variant='h5'>Results</Typography>

                                                                    <SelectInput label="Range" options={[
                                                                        {
                                                                            value: "0-15",
                                                                            label: "0-15"
                                                                        },
                                                                        {
                                                                            value: "15-25",
                                                                            label: "15-25"
                                                                        },
                                                                        {
                                                                            value: "25-50",
                                                                            label: "25-50"
                                                                        },
                                                                        {
                                                                            value: "50-75",
                                                                            label: "50-75"
                                                                        },
                                                                        {
                                                                            value: "75-100",
                                                                            label: "75-100"
                                                                        }
                                                                    ]} name={`result[${index}].scoreRange`} />

                                                                    <TextInput fullWidth name={`result[${index}].conclusion`} label="Conclusion" sx={{ mt: 2 }} />
                                                                    <TextInput fullWidth name={`result[${index}].description`} label="Description" multiline sx={{ mt: 2 }} />
                                                                    <LoadingButton
                                                                        type="button"
                                                                        size="large"
                                                                        variant="contained"
                                                                        color="inherit"
                                                                        disabled={values?.result?.length === 1}
                                                                        onClick={() => arrayHelpers.remove(index)}
                                                                    >
                                                                        -
                                                                    </LoadingButton>
                                                                </Box>
                                                            ))}
                                                        </Stack>
                                                        <LoadingButton
                                                            type="button"
                                                            size="large"
                                                            variant="contained"
                                                            color="inherit"
                                                            sx={{ top: { md: 15 } }}
                                                            onClick={() => arrayHelpers.push()}
                                                        >
                                                            +
                                                        </LoadingButton>
                                                    </Box>
                                                )}
                                            />
                                        </Stack>
                                    </Card>
                                    <LoadingButton
                                        size="large"
                                        type="submit"
                                        variant="contained"
                                        color="inherit"
                                        sx={{ top: { md: 24 }, float: "right" }}
                                    >
                                        {param?.id ? "Update Assignment" : "Create Assignment"}
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

export default AssignmentForm



const QuestionForm = ({ optionValues, onRemove, index, onSubmit, basedOn, showAddButton, onAdd }) => (
    <Formik validationSchema={schemaQ(basedOn)} enableReinitialize onSubmit={onSubmit} initialValues={{
        question: optionValues.question ?? "",
        answer: optionValues.answer ?? "",
        type: optionValues.type ?? "",
        options: optionValues.options ?? {

        }
    }}>
        <>
            <QuestionFormChild index={index} basedOn={basedOn} onRemove={onRemove} />

            {showAddButton
                ? <LoadingButton
                    size="large"
                    variant="contained"
                    color="inherit"
                    sx={{ top: { md: 15 } }}
                    onClick={() => { onAdd() }}
                >
                    +
                </LoadingButton>
                : null
            }
        </>

    </Formik>
)


const QuestionFormChild = ({ index, basedOn, onRemove }) => {
    const { values, isValid, submitForm, setFieldValue } = useFormikContext();
    console.log("childvalue", values)


    useEffect(() => {
        if (isValid) {
            submitForm()
        }
    }, [isValid])
    return (

        <Box key={index} sx={{ borderRadius: 2, border: '2px solid grey', p: 2, }}>
            <Typography variant='h5'>Questions</Typography>
            <TextInput rows={2} multiline fullWidth label={`Your Question No. ${index + 1}`}
                sx={{ mb: 2 }}
                name="question" />
            {basedOn === "Fun Personality" ?
                <SelectInput label="Question Type" options={[
                    {
                        value: "text",
                        label: "Text"
                    },
                    {
                        value: "color",
                        label: "Color"
                    },
                    {
                        value: "image",
                        label: "Image"
                    },

                ]} name="type"
                // sx={{ mt: 2 }}
                />
                : null
            }
            {basedOn === "Fun Personality"
                ? <Stack spacing={2}>
                    <Stack direction="row">
                        <TextInput sx={{ width: 700, mt: 2 }} name="options.a.option" label="Option A" />
                        {values.type === "color"
                            ? <TextInput type="color" sx={{ width: 100, mt: 2, ml: 2 }} name="options.a.color" label="Option A" />

                            // : values.type == "image" ? <input type="file" onChange={(e) => {
                            //     setFieldValue(`options.a.imageFile`, e.target.files[0])
                            //     setFieldValue(`options.a.image`, URL.createObjectURL(e.target.files[0]))
                            // }} sx={{ width: 100 }} label="Option A" />
                            //     : null

                            : values.type === "image" ? <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    ml: 2,
                                    mt: 2,
                                    height: 60,
                                }}

                            >
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        setFieldValue(`options.a.imageFile`, e.target.files[0])
                                        setFieldValue(`options.a.image`, URL.createObjectURL(e.target.files[0]))
                                    }} label="Option A"
                                />
                                {values?.options?.a?.image ? <img src={values?.options?.a?.image} alt='banner' height={50} width={70} /> : ""}
                            </Button>
                                : null
                        }
                    </Stack>
                    <Stack direction="row">
                        <TextInput sx={{ width: 700 }} name="options.b.option" label="Option B" />
                        {values.type === "color"
                            ? <TextInput type="color" sx={{ width: 100, ml: 2 }} name="options.b.color" label="Option A" />

                            // : values.type == "image" ? <Card> <input type="file" onChange={(e) => {
                            //     setFieldValue(`options.b.imageFile`, e.target.files[0])
                            //     setFieldValue(`options.b.image`, URL.createObjectURL(e.target.files[0]))
                            // }} sx={{ width: 100 }} label="Option A" /> </Card>
                            //     : null
                            : values.type === "image" ? <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    ml: 2,
                                    height: 60,
                                }}

                            > Upload
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        setFieldValue(`options.b.imageFile`, e.target.files[0])
                                        setFieldValue(`options.b.image`, URL.createObjectURL(e.target.files[0]))
                                    }} label="Option A"
                                />
                                {values?.options?.b?.image ? <img src={values?.options?.b?.image} alt='banner' height={50} width={80} /> : ""}
                            </Button>
                                : null
                        }
                    </Stack>
                    <Stack direction="row">
                        <TextInput fullWidth name="options.c.option" label="Option C" />
                        {values.type === "color"
                            ? <TextInput type="color" sx={{ width: 100, ml: 2 }} name="options.c.color" label="Option A" />

                            // : values.type == "image" ? <input type="file" onChange={(e) => {
                            //     setFieldValue(`options.c.imageFile`, e.target.files[0])
                            //     setFieldValue(`options.c.image`, URL.createObjectURL(e.target.files[0]))
                            // }} sx={{ width: 100 }} label="Option A" />
                            //     : null

                            : values.type === "image" ? <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    ml: 2,
                                    height: 60,
                                }}

                            >
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        setFieldValue(`options.c.imageFile`, e.target.files[0])
                                        setFieldValue(`options.c.image`, URL.createObjectURL(e.target.files[0]))
                                    }} label="Option A"
                                />
                                {values?.options?.c?.image ? <img src={values?.options?.c?.image} alt='banner' height={50} width={80} /> : ""}
                            </Button>
                                : null
                        }
                    </Stack>
                    <Stack direction="row">
                        <TextInput fullWidth name="options.d.option" label="Option D" />
                        {values?.type === "color"
                            ? <TextInput type="color" sx={{ width: 100, ml: 3 }} name="options.d.color" label="Option A" />

                            // : values.type == "image" ? <input type="file" onChange={(e) => {
                            //     setFieldValue(`options.d.imageFile`, e.target.files[0])
                            //     setFieldValue(`options.d.image`, URL.createObjectURL(e.target.files[0]))
                            // }} sx={{ width: 100 }} label="Option A" />
                            //     : null

                            : values.type === "image" ? <Button
                                variant="contained"
                                component="label"
                                sx={{
                                    ml: 2,
                                    height: 60,
                                }}

                            >
                                Upload
                                <input
                                    type="file"
                                    hidden
                                    onChange={(e) => {
                                        setFieldValue(`options.d.imageFile`, e.target.files[0])
                                        setFieldValue(`options.d.image`, URL.createObjectURL(e.target.files[0]))
                                    }} label="Option A"
                                />
                                {values?.options?.d?.image ? <img src={values?.options?.d?.image} alt='banner' height={50} width={80} /> : ""}
                            </Button>
                                : null
                        }
                    </Stack>
                </Stack>
                : null}

            <Stack spacing={1} direction="row" justifyContent="space-between" alignItems="center">

                <Box sx={{ py: 2 }}>
                    <SelectInput label="Answer" options={
                        basedOn === "Fun Personality"
                            ? [
                                { value: "a", label: "A" },
                                { value: "b", label: "B" },
                                { value: "c", label: "C" },
                                { value: "d", label: "D" }
                            ]
                            : [
                                { value: "yes", label: "Yes" },
                                { value: "no", label: "No" },
                                { value: "maybe", label: "Maybe" }
                            ]}
                        name="answer" />
                </Box>

                <LoadingButton
                    type="button"
                    size="large"
                    variant="contained"
                    color="inherit"
                    disabled={index === 0}
                    onClick={onRemove}
                >
                    -
                </LoadingButton>

            </Stack>
        </Box>
    )
}