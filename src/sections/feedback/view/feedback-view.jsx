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
import { getFeedback, deleteFeedback } from 'src/http';
import TableNoData from '../table-no-data';
import UserTableRow from '../user-table-row';
import UserTableHead from '../user-table-head';
import TableEmptyRows from '../table-empty-rows';
import UserTableToolbar from '../user-table-toolbar';
// import { applyFilter, getComparator } from '../utils';

// ----------------------------------------------------------------------

export default function FeedbackPage() {
    const [searchParam, setSearchParam] = useSearchParams()
    const qpage = searchParam.get("page")
    const search = searchParam.get("search")
    const limit = searchParam.get("limit")

    const [feedbackData, setFeedbackData] = useState([])
    const [id, setId] = useState()
    const [page, setPage] = useState(qpage ?? 1);

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
        setPage(newPage + 1);
    };

    const handleChangeRowsPerPage = (event) => {
        setPage(1);
        setRowsPerPage(parseInt(event.target.value, 10));
    };

    const handleFilterByName = (event) => {
        setPage(1);
        setSearchParam({ search: event.target.value })
        setFilterName(event.target.value);
    };

    // const dataFiltered = applyFilter({
    //     inputData: users,
    //     comparator: getComparator(order, orderBy),
    //     filterName,
    // });

    // const notFound = !dataFiltered.length && !!filterName;

    const addConsultant = () => {
        navigate('')
    }

    const deleteClickHandler = (deleteId) => {
        setId(deleteId)
        setOpen(true)
    }

    const deleteCancelClick = () => {
        setOpen(false)
    }

    const deleteOkClick = async () => {
         await deleteFeedback(id)
        setOpen(false)
        fetchData()
    }


    const fetchData = async () => {
        const data = await getFeedback({ search, page, limit: rowsPerPage })
        setFeedbackData(data)
    }

    useEffect(() => {
        fetchData()
    }, [search, page, rowsPerPage])

    return (
        <Container>
            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                <Typography variant="h4">Feedback</Typography>

                <Button onClick={addConsultant} variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
                    New Feedback
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
                                    { id: 'user', label: 'User' },
                                    { id: 'rate', label: 'Rate' },
                                    { id: 'ratingsExperience', label: 'Ratings Experience' },
                                    { id: '' },
                                ]}
                            />

                            <TableBody>
                                {feedbackData?.result?.length ?
                                    feedbackData?.result?.map((row) => (
                                        <UserTableRow
                                            key={row._id}
                                            user={row.user}
                                            rate={row.rate}
                                            ratingsExperience={row.ratingsExperience}
                                            handleClick={(event) => handleClick(event, row.name)}
                                            deleteClickHandler={deleteClickHandler}
                                            id={row._id}
                                        />
                                    ))
                                    :

                                    <TableNoData query={search} />
                                }

                                {rowsPerPage > feedbackData?.result?.length ? <TableEmptyRows
                                    height={77}
                                    emptyRows={feedbackData?.result?.length > 2 ? 1 : 2}
                                /> : null}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Scrollbar>

                <TablePagination
                    page={page - 1}
                    count={feedbackData?.count}
                    rowsPerPage={rowsPerPage}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Card>
        </Container>
    );
}
