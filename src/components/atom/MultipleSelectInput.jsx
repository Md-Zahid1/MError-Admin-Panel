import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { FormHelperText } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Field } from 'formik';


export default function MultipleSelectInput({ options, label, name, ...restProp }) {

  return (
    <div>
      <Field name={name}>
        {
          ({
            field: { onChange, ...restFields },
            form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
            meta: { error, ...metaRest },
          }) => (
            <FormControl sx={{ m: 0, width: 700 }}>
              <InputLabel id={`${name}-multiple-label`} sx={{ color: error ? "red" : "initial" }} >{label}</InputLabel>
              <Select
                labelId={`${name}-multiple-label`}
                id={`${name}-multiple`}
                multiple
                {...restFields}
                error={error}
                {...restProp}
                onChange={(event) => {
                  const {
                    target: { value },
                  } = event;

                  // On autofill we get a stringified value.

                  setFieldValue(name, typeof value === 'string' ? value.split(',') : value)

                }}

                input={<OutlinedInput id="select-multiple-chip" label={label} />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected?.map((value) => (
                      <Chip key={value} label={options?.find(op => op.value === value)?.label} sx={{ height: "initial", fontSize: "1rem" }} />
                    ))}
                  </Box>
                )}
              >
                {options?.map((op) => (
                  <MenuItem
                    key={op?.label}
                    value={op?.value}
                  >
                    {op?.label}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText sx={{ color: "red" }}>{error}</FormHelperText>
            </FormControl>
          )
        }
      </Field>
    </div>
  );
}