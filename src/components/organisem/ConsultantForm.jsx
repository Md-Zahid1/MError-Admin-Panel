import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import { Form, Formik, FieldArray, useFormikContext, } from 'formik';
import * as Yup from 'yup';

import TextInput from 'src/components/atom/TextInput';
import { Box, Grid, Typography } from '@mui/material';
import { consultantDetail, createConsultant, updateConsultant } from 'src/http';
import { useState, useEffect } from 'react';
import SelectInput from '../atom/SelectInput';
import Dropzone from '../atom/Dropzone';
import DateInput from '../atom/DateInput';
import TimeInput from '../atom/TimeInput';
import MultipleSelectInput from '../atom/MultipleSelectInput';
import UploadFile from '../../utils/uploadFile';


const schema = Yup.object().shape({
	name: Yup.string()
		.required('Required'),
	email: Yup.string()
		.required('Required'),
	mobile: Yup.number()
		.required('Required'),
	address: Yup.string()
		.required('Required'),
	designation: Yup.string()
		.required('Required'),
	dipartment: Yup.string()
		.required('Required'),
	experince: Yup.string()
		.required('Required'),
	password: Yup.string()
		.required('Required'),
	languages: Yup.array(
		Yup.string().required("Required"),
	).min(1),
	expertise: Yup.array(
		Yup.string().required("Required"),
	).min(1),
	cases: Yup.string()
		.required('Required'),
	about: Yup.string()
		.required('Required'),
	funFact: Yup.string()
		.required('Required'),
	// fee: Yup.object().shape({
	// 	chatting: Yup.number().positive()
	// 		.required('Required'),
	// 	voiceCall: Yup.number().positive()
	// 		.required('Required'),
	// 	videoCall: Yup.number().positive()
	// 		.required('Required'),
	// }),
	working: Yup.array().of(
		Yup.object().shape({
			startDate: Yup.string()
				.required('Required'),
			endDate: Yup.string()
				.required('Required'),
			startTime: Yup.string()
				.required('Required'),
			endTime: Yup.string()
				.required('Required'),
			duration: Yup.string()
				.required('Required'),
		})
	),

	// broken: Yup.array().of(
	// 	Yup.object().shape({
	// 		startDate: Yup.string()
	// 			.required('Required'),
	// 		endDate: Yup.string()
	// 			.required('Required'),
	// 		startTime: Yup.string()
	// 			.required('Required'),
	// 		endTime: Yup.string()
	// 			.required('Required'),
	// 		duration: Yup.string()
	// 			.required('Required'),
	// 	})
	// )
});

const sessionDefaultValue = (duration) => ({
	duration,
	sessions: [
		{
			session: "",
			price: ""
		},
		{
			session: "",
			price: ""
		},
		{
			session: "",
			price: ""
		}
	],
})

const options = [
	{
		value: "1x",
		label: "1x"
	},
	{
		value: "2x",
		label: "2x"
	},
	{
		value: "3x",
		label: "3x"
	},
]

const sessionData = [sessionDefaultValue(30), sessionDefaultValue(60), sessionDefaultValue(90)]

const ConsultantForm = ({ param }) => {
	const [consultantData, setConsultantData] = useState({})

	console.log("p", param)

	useEffect(() => {
		if (param.id) {
			const fetchData = async () => {
				const data = await consultantDetail(param.id)
				setConsultantData(data)
			}
			fetchData()
		}
	}, [param.id])



	const submitHandler = async (value) => {
		console.log("vvvvvvvvv", value)
		let fileUrl;
		if (value.avatarFile) {
			fileUrl = await UploadFile(value.avatarFile);
			delete value.avatarFile
		}
		const pay = { ...value, avatar: fileUrl ?? value.avatar }
		await param.id ? updateConsultant(param.id, pay) : createConsultant(pay)
	}

	return (
		<Formik validationSchema={schema} enableReinitialize onSubmit={submitHandler} initialValues={{
			avatar: consultantData?.avatar ?? "",
			avatarFile: "",
			name: consultantData?.name ?? "",
			email: consultantData?.email ?? "",
			mobile: consultantData?.mobile ?? "",
			address: consultantData?.address ?? "",
			designation: consultantData?.designation ?? "",
			dipartment: consultantData?.dipartment ?? "",
			experince: consultantData?.experince ?? "",
			languages: consultantData?.languages ?? [],
			expertise: consultantData?.expertise ?? [],
			cases: consultantData?.cases ?? "",
			about: consultantData?.about ?? "",
			funFact: consultantData?.funFact ?? "",
			password: "",
			// fee: consultantData?.fee ?? {
			// 	chatting: '',
			// 	voiceCall: '',
			// 	videoCall: '',
			// },
			working: consultantData?.working ?? [{
				startDate: "",
				endDate: "",
				startTime: "",
				endTime: "",
				duration: "",
			}],
			packege: {
				chatLink: "",
				voiceLink: "",
				videoLink: "",
				chat: sessionData,
				voice: sessionData,
				video: sessionData
			}
			// broken: [{
			// 	startDate: '',
			// 	endDate: "",
			// 	startTime: "",
			// 	endTime: "",
			// 	duration: "",
			// }]
		}}>
			{
				({ values, setFieldValue, errors, isValidating }) => {
					console.log("values", values)
					console.log("error", errors)
					return (
						<Form>
							<Grid spacing={3} container >
								<Grid item xs={12} md={4}>
									<Card sx={{ p: 5, width: 1, }}>
										<p>{param?.id ? "Update Consultant" : "New Consultant"}</p>
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
											<TextInput name="email" label="Email" />
											<TextInput name="mobile" label="Mobile" />
											{param.id ? "" : <TextInput name="password" label="Password" />}
											<TextInput name="address" label="Address" multiline />

											<SelectInput label="Profession" options={[
												{
													value: "Buddy",
													label: "Buddy"
												},
												{
													value: "Professional",
													label: "Professional"
												},
											]} name="designation" />
											<TextInput name="dipartment" label="Dipartment" />
											<TextInput name="experince" label="Experince" />

											<MultipleSelectInput options={[
												{
													value: "Hindi",
													label: "Hindi"
												},
												{
													value: "English",
													label: "English"
												},
												{
													value: "Urdu",
													label: "Urdu"
												},
												{
													value: "Punjabi",
													label: "Punjabi"
												},
												{
													value: "Marathi",
													label: "Marathi"
												},
												{
													value: "Gujrati",
													label: "Gujrati"
												},
												{
													value: "Tamil",
													label: "Tamil"
												}
											]} label="Languages" name="languages" />

											<MultipleSelectInput options={[
												{
													value: "Relationship",
													label: "Relationship"
												},
												{
													value: "Overthinking",
													label: "Overthinking"
												},
												{
													value: "Anxiety",
													label: "Anxiety"
												},
												{
													value: "Loneliness",
													label: "Loneliness"
												},
												{
													value: "Stress",
													label: "Stress"
												},
												{
													value: "Depression",
													label: "Depression"
												},
												{
													value: "Mental Health",
													label: "Mental Health"
												}
											]} label="Expertise" name="expertise" />
											<TextInput name="cases" label="Cases" />
											{/* <Stack direction="row" gap={1}>
												<TextInput name="fee.chatting" label="Chatting Fee" />
												<TextInput name="fee.voiceCall" label="Voice-Call Fee" />
												<TextInput name="fee.videoCall" label="Video-Call Fee" />
											</Stack> */}

											<TextInput name="about" label="About" multiline />
											<TextInput name="funFact" label="Fun-Fact" multiline />



											<FieldArray
												name="working"
												render={arrayHelpers => (
													<Box>
														<Stack spacing={2}>
															{values?.working?.map((que, index) => (
																<Box key={index}>
																	<Typography variant="h4">Working</Typography>
																	<DateInput name={`working[${index}].startDate`} sx={{ mt: 2 }} fullWidth label="Start Date" />
																	<DateInput name={`working[${index}].endDate`} sx={{ ml: 20, mt: 2 }} fullWidth label="End Date" />
																	<TimeInput name={`working[${index}].startTime`} sx={{ mt: 4 }} label="StartTime" />
																	<TimeInput name={`working[${index}].endTime`} sx={{ ml: 20, mt: 4 }} label="End Time" />
																	<Stack sx={{ mt: 4 }}>
																		<SelectInput label="Duration" options={[{
																			value: 15,
																			label: "15 minute"
																		},
																		{
																			value: 30,
																			label: "30 minute"
																		},
																		{
																			value: 60,
																			label: "1 hour"
																		},
																		{
																			value: 120,
																			label: "2 hour"
																		}
																		]} name={`working[${index}].duration`} />
																	</Stack>
																	<LoadingButton
																		type="button"
																		size="large"
																		variant="contained"
																		color="inherit"
																		disabled={values?.working?.length === 1}
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
											{/* <TextInput name="broken" label="Broken" /> */}
											{/* <FieldArray
												name="broken"
												render={arrayHelpers => (
													<Box>
														<Stack spacing={2} sx={{ mt: 4 }}>
															{values?.broken?.map((que, index) => (
																<Box key={index}>
																	<Typography variant="h4">Broken</Typography>
																	<DateInput name={`broken[${index}].startDate`} sx={{ mt: 2 }} fullWidth label={"Start Date"} />
																	<DateInput name={`broken[${index}].endDate`} sx={{ ml: 20, mt: 2 }} fullWidth label={"End Date"} />
																	<TimeInput name={`broken[${index}].startTime`} sx={{ mt: 4 }} label="StartTime" />
																	<TimeInput name={`broken[${index}].endTime`} sx={{ ml: 20, mt: 4 }} label={"End Time"} />
																	<Stack sx={{ mt: 4 }}>
																		<SelectInput label="Duration" options={[{
																			value: 15,
																			label: "15 minute"
																		},
																		{
																			value: 30,
																			label: "30 minute"
																		},
																		{
																			value: 60,
																			label: "1 hour"
																		},
																		{
																			value: 120,
																			label: "2 hour"
																		}
																		]} name={`broken[${index}].duration`} />
																	</Stack>
																	<LoadingButton
																		type="button"
																		size="large"
																		variant="contained"
																		color="inherit"
																		disabled={values?.broken?.length === 1}
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
											/> */}


											<Box sx={{ borderRadius: 2, border: '2px solid grey', p: 2 }}>
												<FieldArray
													name="packege.chat"
													render={arrayHelpers => (
														<Box>
															<Typography variant="h4">Chat</Typography>
															<TextInput name="chatLink" fullWidth label="Chat Link" placeholder="https://chatLink.com" />
															<Stack spacing={2}>
																{values?.packege.chat?.map((que, index) => (
																	<Packeges
																		key={index}
																		values={que}
																		duration={que.duration}
																		isValidating={isValidating}
																		onSubmit={(v) => {
																			console.log("v1", v)
																			setFieldValue(`packege.chat[${index}]`, v);
																		}}
																	/>
																))}
															</Stack>
														</Box>
													)}
												/>
											</Box>

											<Box sx={{ borderRadius: 2, border: '2px solid grey', p: 2 }}>
												<FieldArray
													name="packege.voice"
													render={arrayHelpers => (
														<Box>
															<Typography variant="h4">voice</Typography>
															<TextInput name="voiceLink" fullWidth label="Voice Link" placeholder="https://voiceLink.com" />
															<Stack spacing={2}>
																{values?.packege.voice?.map((que, index) => (
																	<Packeges
																		key={index}
																		values={que}
																		duration={que.duration}
																		isValidating={isValidating}
																		onSubmit={(v) => {
																			console.log("v1", v)
																			setFieldValue(`packege.voice[${index}]`, v);
																		}}
																	/>
																))}
															</Stack>
														</Box>
													)}
												/>
											</Box>



											<Box sx={{ borderRadius: 2, border: '2px solid grey', p: 2 }}>
												<FieldArray
													name="packege.video"
													render={arrayHelpers => (
														<Box>
															<Typography variant="h4">Video</Typography>
															<TextInput name="videoLink" fullWidth label="Video Link" placeholder="https://videoLink.com" />
															<Stack spacing={2}>
																{values?.packege.video?.map((que, index) => (
																	<Packeges
																		key={index}
																		values={que}
																		duration={que.duration}
																		isValidating={isValidating}
																		onSubmit={(v) => {
																			console.log("v1", v)
																			setFieldValue(`packege.video[${index}]`, v);
																		}}
																	/>
																))}
															</Stack>
														</Box>
													)}
												/>
											</Box>
										</Stack>
									</Card>

									<LoadingButton
										size="large"
										type="submit"
										variant="contained"
										color="inherit"
										sx={{
											top: { md: 24 },
											float: "right"
										}}
									>
										{param?.id ? "Update Consultant" : "Create Consultant"}
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

export default ConsultantForm


const schemaP = Yup.object().shape({

	sessions: Yup.array().of(
		Yup.object().shape({
			session: Yup.string()
				.required('Required'),
			price: Yup.string()
				.required('Required'),
		})
	),
})



const Packeges = ({ onSubmit, duration, isValidating }) => (
	<Formik
		validateOnMount={false}
		validationSchema={schemaP}
		enableReinitialize onSubmit={onSubmit} initialValues={
			sessionDefaultValue(duration)
		}>
		<PackegesChild />
	</Formik>
)

const PackegesChild = () => {
	const { values, isValid, submitForm, initialTouched } = useFormikContext();
	useEffect(() => {
		if (Object.keys(initialTouched).length && isValid) {
			submitForm()
		}
	}, [isValid])

	return (
		< Box >
			<Stack spacing={2}>
				<Box>
					<Typography variant="h5">{values?.duration} Minute</Typography>
					<FieldArray
						name="sessions"
						render={arrayHelpers => (
							<Box>
								{
									values.sessions?.map((ses, ind) => (
										<Stack key={ind} direction="row" gap={2} marginY={2}>
											<SelectInput name={`sessions[${ind}].session`} label="Sessions" options={options} />
											<TextInput name={`sessions[${ind}].price`} label="Price" fullWidth />
										</Stack>
									))
								}
							</Box>
						)}
					/>
				</Box>
			</Stack>
		</Box >
	)
}