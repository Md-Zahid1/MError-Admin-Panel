import { Field } from "formik";
import { TextField } from "@mui/material";
import { memo } from "react";

const TextInput = memo(({ name, ...props }) => (
    <Field name={name} >
        {({
            field, // { name, value, onChange, onBlur }
            form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta: { error, ...metaRest },
        }) => (
            <TextField error={error} helperText={error}  {...field}  {...props} {...metaRest} />
        )}
    </Field> 
))


export default TextInput;
