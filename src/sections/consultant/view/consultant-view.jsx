import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useNavigate, useSearchParams } from 'react-router-dom';
import DeleteDialogeBox from 'src/components/DialogeBox/DeleteDialogeBox';
import { getConsultant, deleteConsultant } from 'src/http';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
// import { applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function ConsultantPage() {
  const [searchParam, setSearchParam] = useSearchParams()
  const qpage = searchParam.get("page")
  const search = searchParam.get("search")
  const limit = searchParam.get("limit")
  const [consultantData, setConsultantData] = useState([])
  const [id, setId] = useState()
  const [page, setPages] = useState(qpage ?? 1);

  const [open, setOpen] = useState(false)


  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(limit ?? 10);


  const navigate = useNavigate()

  const handleSort = (event, sortId) => {
    const isAsc = orderBy === sortId && order === 'asc';
    if (sortId !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(sortId);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = users.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPages(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPages(1);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPages(1);
    setSearchParam({ search: event.target.value })
    setFilterName(event.target.value);
  };

  // const dataFiltered = applyFilter({
  //   inputData: users,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  const addConsultant = () => {
    navigate('/add-consultant')
  }

  const deleteClickHandler = (deletId) => {
    console.log("deletId", deletId)
    setId(deletId)
    setOpen(true)
  }

  const deleteCancelClick = () => {
    setOpen(false)
  }

  const deleteOkClick = async () => {
    await deleteConsultant(id)
    setOpen(false)
    fetchData()
  }

  const fetchData = async () => {
    const data = await getConsultant({ search, page, limit: rowsPerPage })
    setConsultantData(data)
  }
  useEffect(() => {
    fetchData()
  }, [search, page, rowsPerPage])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Consultant</Typography>

        <Button onClick={addConsultant} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Consultant
        </Button>
      </Stack>

      <Card>
        <DeleteDialogeBox open={open} deleteCancelClick={deleteCancelClick} deleteOkClick={deleteOkClick} />
        <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'avatar', label: 'Avatar' },
                  { id: 'name', label: 'Name' },
                  { id: 'email', label: 'Email' },
                  { id: 'designation', label: 'Profession' },

                  { id: 'cases', label: 'Cases' },
                  { id: 'expertise', label: 'Expertise' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {
                  consultantData?.result?.length ?
                    consultantData?.result?.map((row) => (
                      <UserTableRow
                        key={row.id}
                        avatar={row.avatar}
                        name={row.name}
                        email={row.email}
                        designation={row.designation}
                        expertise={row.expertise}
                        cases={row.cases}
                        handleClick={(event) => handleClick(event, row.name)}
                        deleteClickHandler={deleteClickHandler}
                        id={row._id}
                      />
                    ))
                    :

                    <TableNoData query={search} />
                }

                {rowsPerPage > consultantData?.result?.length ? <TableEmptyRows
                  height={77}
                  emptyRows={consultantData?.result?.length > 2 ? 1 : 2}
                /> : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page - 1}
          count={consultantData?.count}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />

      </Card>
    </Container>
  );
}
