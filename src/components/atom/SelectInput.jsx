import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Field } from "formik";
import { FormHelperText } from '@mui/material';
import { memo } from "react";



export default memo(({ name, label, options = [{
    label: "",
    value: ""
}], ...props }) => (
        <Field name={name} >
            {
                ({
                    field, // { name, value, onChange, onBlur }
                    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                    meta: { error, ...metaRest },
                }) => (
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth error={error} {...metaRest}>
                            <InputLabel id={`${name}label`} >{label}</InputLabel>
                            <Select
                                labelId={`${name}label`}
                                id={name}
                                label={label}
                                {...field}  {...props}
                            >
                                {
                                    options.map(({ label, value }) => (
                                        <MenuItem key={value} value={value}>{label}</MenuItem>
                                    ))
                                }
                            </Select>
                            <FormHelperText>{error}</FormHelperText>
                        </FormControl>
                    </Box>
                )
            }
        </Field>
    ))