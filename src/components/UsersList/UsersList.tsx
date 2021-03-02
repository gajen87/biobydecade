import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import { Fab, TableHead, Tooltip, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

const useStyles2 = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function UsersList(props) {
    const classes = useStyles2();
    const { userdata } = props;
    const TableColumn = [
        { name: "First Name" },
        { name: "Last Name" },
        { name: "Preferred Name" },
        { name: "Birth Date" },
        { name: "Birth City" },
        { name: "Action" }
    ];

    return (
        <div className="mt-1 container">
            <Typography className="mb-1">Users List</Typography>
            <div className="container-inside usersList">
                <TableContainer>
                    <Table className={classes.table} aria-label="custom pagination table">
                        <TableHead>
                            {TableColumn.map((columns, index) => (
                                <TableCell
                                    key={index}
                                >
                                    {columns.name}
                                </TableCell>
                            ))}
                        </TableHead>
                        <TableBody>
                            {userdata && userdata.map((item, index) => (
                                <TableRow key={item.id}>
                                    <TableCell component="th" scope="row">
                                        {item.first_name}
                                    </TableCell>
                                    <TableCell>
                                        {item.last_name}
                                    </TableCell>
                                    <TableCell>
                                        {item.preferred_name}
                                    </TableCell>
                                    <TableCell>
                                        {item.birth_date}
                                    </TableCell>
                                    <TableCell>
                                        {item.city_of_birth}
                                    </TableCell>
                                    <TableCell>
                                        <Tooltip arrow placement="top" title="Edit">
                                            <EditIcon
                                                onClick={() => props.handleEditClick(item.bio_id)}
                                                className="cursor"
                                                fontSize="small" />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Fab className="addUserBtn" aria-label="add" onClick={props.addNewUser}>
                    <Tooltip arrow placement="top" title="Add New User">
                        <AddIcon />
                    </Tooltip>
                </Fab>
            </div>
        </div>

    );
}