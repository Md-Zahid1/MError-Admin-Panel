import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
// import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

// import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function UserTableRow({
  avatar,
  name,
  email,
  mobile,
  gender,
  handleClick,
  deleteClickHandler,
  id
}) {
  const [open, setOpen] = useState(null);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox"
      // selected={selected}
      >
        <TableCell><img src={avatar} height={60} width={60} alt='avatar'/></TableCell>

        <TableCell component="th" scope="row">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>{email}</TableCell>
        <TableCell>{mobile}</TableCell>
        <TableCell>{gender}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: { width: 140 },
        }}
      >

        <MenuItem
          component={RouterLink}
          href={`/userDetail/${id}`}
        >
          <Iconify icon="f7:arrow-up-doc-fill" sx={{ mr: 2 }} />
          Detail
        </MenuItem>

        <MenuItem
          component={RouterLink}
          href={`/edit-users/${id}`}
        >
          <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
          Edit
        </MenuItem>


        <MenuItem onClick={() => {
          setOpen(false)
          deleteClickHandler(id)
        }} sx={{ color: 'error.main' }}>
          <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
          Delete
        </MenuItem>
      </Popover>
    </>
  );
}

UserTableRow.propTypes = {
  // avatarUrl: PropTypes.any,
  // company: PropTypes.any,
  handleClick: PropTypes.func,
  name: PropTypes.any,
  // role: PropTypes.any,
  // selected: PropTypes.any,
  // status: PropTypes.string,
};
