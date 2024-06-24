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
import { getAssignment, deleteAssignment } from 'src/http';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
// import { applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function AssignmentPage() {
  const [searchParam, setSearchParam] = useSearchParams()
  const qpage = searchParam.get("page")
  const search = searchParam.get("search")
  const limit = searchParam.get("limit")

  const [assignmentData, setAssignmentData] = useState({})
  console.log("assignmentData", assignmentData)

  const [id, setId] = useState()

  const [page, setPages] = useState(qpage ?? 1);
  console.log("pagesss", page)

  const [open, setOpen] = useState(false)

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(limit ?? 10);

  console.log("searchParam", searchParam)


  const navigate = useNavigate()


  console.log("search", search)
  console.log("pagettttt", page)

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
    console.log("pageChange", newPage)
    // setSearchParam({ page: newPage })
    setPages(newPage + 1);
  };

  const handleChangeRowsPerPage = (event) => {
    setPages(1);

    console.log("event", event)
    // setSearchParam({ limit: parseInt(event.target.value, 10) })
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



  const addUser = () => {
    navigate("/add-assignment")
  }


  const deleteClickHandler = (deleteId) => {
    setId(deleteId)
    setOpen(true)
  }

  const deleteCancelClick = () => {
    setOpen(false)
  }

  const deleteOkClick = async () => {
    await deleteAssignment(id)
    setOpen(false)
    fetchData()
  }

  // const id = 1
  const fetchData = async () => {
    const data = await getAssignment({ search, page, limit: rowsPerPage })
    console.log("data", data)
    setAssignmentData(data)
  }
  useEffect(() => {
    fetchData()
  }, [search, page, rowsPerPage])

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Assignment</Typography>

        <Button onClick={addUser} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New Assignment
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
                  { id: 'banner', label: 'Banner' },
                  { id: 'title', label: 'Title' },
                  { id: 'category', label: 'Category' },
                  { id: 'basedOn', label: 'BasedOn' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {
                  assignmentData?.result?.length ?

                    assignmentData?.result
                      ?.map((row) => (
                        <UserTableRow
                          key={row._id}
                          banner={row.banner}
                          title={row.title}
                          category={row.category}
                          basedOn={row.basedOn}
                          handleClick={(event) => handleClick(event, row.name)}
                          deleteClickHandler={deleteClickHandler}
                          id={row._id}
                        />
                      ))
                    :
                    <TableNoData query={search} />
                }

                {rowsPerPage > assignmentData?.result?.length ? <TableEmptyRows
                  height={77}
                  emptyRows={assignmentData?.result?.length > 2 ? 1 : 2}
                /> : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page - 1}
          count={assignmentData?.count}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>
    </Container>
  );
}
