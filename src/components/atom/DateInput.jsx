import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import { DatePicker } from '@mui/x-date-pickers'
import React, { memo } from 'react'
import { Field } from 'formik';
import moment from 'moment';

const dateFormat = "YYYY/MM/DD"

const DateInput = memo(({ name, ...props }) => (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <Field name={name}>
            {
                ({
                    field: { name, value, onChange, onBlur },
                    form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta: { error, disabled, ...metaRest },
                }) => (
                    <DatePicker
                        format={dateFormat}
                        value={value ? moment(value, dateFormat) : moment()}
                        disabled={disabled}
                        slotProps={{
                            textField: {
                                disabled,
                                onBlur,
                                name,
                                error,
                                helperText: error
                            },
                        }}
                        onChange={(value, cts) => {
                            setFieldValue(name, value.format(dateFormat))
                        }}
                        {...props}
                    />
                )
            }
        </Field>
    </LocalizationProvider>
)
)

export default DateInput
