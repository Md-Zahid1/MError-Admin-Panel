import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
// import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

import { users } from 'src/_mock/user';

// import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import DeleteDialogeBox from 'src/components/DialogeBox/DeleteDialogeBox';
import { userDetail, getConsultant, deleteConsultant } from 'src/http';
import { Box } from '@mui/material';
import { usePathname } from 'src/routes/hooks';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function BlogTableData() {
  const [searchParam, setSearchParam] = useSearchParams()
  const qpage = searchParam.get("page")
  const search = searchParam.get("search")
  const limit = searchParam.get("limit")
  const [userData, setUserData] = useState({})
  console.log("userData", userData)
  console.log("wwww", userData?.savedBlog?.length)
  const [id, setId] = useState()
  const [page, setPages] = useState(qpage ?? 1);

  const [open, setOpen] = useState(false)


  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(limit ?? 10);


  const navigate = useNavigate()

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
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

  const dataFiltered = applyFilter({
    inputData: users,
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  const addConsultant = () => {
    navigate('/add-consultant')
  }

  const deleteClickHandler = (deleteId) => {
    console.log("deleteId", deleteId)
    setId(deleteId)
    setOpen(true)
  }


  const deleteCancelClick = () => {
    setOpen(false)
  }


  const deleteOkClick = async () => {
    // const data = await deleteConsultant(id)
    setOpen(false)
    fetchData()
  }

  const param = useParams()

  const fetchData = async () => {
    // const data = await getBlog({ search, page, limit: rowsPerPage })
    const data = await userDetail(param.id, { search, page, limit: rowsPerPage })
    console.log("da", data)
    setUserData(data)
  }
  useEffect(() => {
    fetchData()
  }, [search, page, rowsPerPage])

  return (
    <Box>
      <Card>
        <DeleteDialogeBox open={open} deleteCancelClick={deleteCancelClick} deleteOkClick={deleteOkClick} />
        {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

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
                  { id: 'description', label: 'Description' },
                  { id: 'category', label: 'Category' },
                  { id: '' },
                ]}
              />

              <TableBody>
                {
                  userData?.savedBlog?.length ?
                    userData?.savedBlog?.map((row) => (
                      <UserTableRow
                        key={row.id}
                        banner={row.banner}
                        title={row.title}
                        description={row.description}
                        category={row.category}
                        handleClick={(event) => handleClick(event, row.name)}
                        deleteClickHandler={deleteClickHandler}
                        // id={row._id}
                      />
                    ))
                    : <TableNoData query={search} />
                }

                {rowsPerPage > userData?.savedBlog?.length ? <TableEmptyRows
                  height={77}
                  emptyRows={userData?.savedBlog?.length > 2 ? 1 : 2}
                /> : null}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        {/* <TablePagination
          page={page - 1}
          count={userData?.sevedBlog?.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
      </Card>
    </Box>
  );
}
