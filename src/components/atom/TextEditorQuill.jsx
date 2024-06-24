import { TextEditor } from 'mui-tiptap-editor';
// import { useState } from "react";


import { Field } from "formik";
// import { TextField } from "@mui/material";
import { memo } from "react";

const TextEditorQuill = memo(({ name, ...props }) => (
    <Field name={name} >
        {({
            field, // { name, value, onChange, onBlur }
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta: { error, ...metaRest },
        }) => (
            <TextEditor
                onChange={(value, cts) => {
                    setFieldValue(name, value)
                }}
                error={error}
                {...props}
            />
        )}
    </Field>
))


export default TextEditorQuill;


// export default function TextEditorQuill() {
//     const [value, setValue] = useState("");

//     const handleChange = (newValue) => setValue(newValue);

//     return (
//         <div>
//             <TextEditor value={value} onChange={handleChange} />
//         </div>
//     );
// }

