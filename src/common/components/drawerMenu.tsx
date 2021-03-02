import { Drawer, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import * as React from 'react';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PeopleIcon from '@material-ui/icons/People';
import { Link } from 'react-router-dom';

export default function DrawerMenu(props) {

    let menuObj = [
        {
            name: "Dashboard",
            icon: <DashboardIcon color="primary" />
        },
        {
            name: "Items",
            icon: <PeopleIcon color="primary" />
        },
    ]
    return (
        <Drawer open={props.isOpen} className="DrawerMenu" onClose={props.toggleDrawer} >
            <Grid justify="flex-end" container>
                <IconButton className="mr-1 mt-1" onClick={props.toggleDrawer}><KeyboardBackspaceIcon fontSize="small" /></IconButton>
            </Grid>
            <div className="drawerMenu">
                <List>
                    {menuObj.map((item, index) => (
                        <ListItem button key={"tst"}>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <Link to="/dashboard">
                                <ListItemText primary={item.name} />
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </div>
        </Drawer>
    )
}

