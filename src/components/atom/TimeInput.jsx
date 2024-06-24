import * as React from 'react';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Field } from 'formik';

export default function TimeInput({ name, label, ...props }) {
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>

            <Field name={name} >
                {({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta: { error, ...metaRest },
                }) => (
                    <TimePicker
                        ampm={false}
                        label={label}
                        viewRenderers={{
                            hours: renderTimeViewClock,
                            minutes: renderTimeViewClock,
                            seconds: renderTimeViewClock,
                        }}

                        onChange={(value, cts) => {
                            setFieldValue(name, value.format("HH:mm"))
                        }}
                        error={error}
                        {...props}
                    />
                )}
            </Field>

            {/* <TimePicker
          label="With Time Clock"
          viewRenderers={{
            hours: renderTimeViewClock,
            minutes: renderTimeViewClock,
            seconds: renderTimeViewClock,
          }}
        /> */}
        </LocalizationProvider>
    );
}