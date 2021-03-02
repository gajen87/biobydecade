import React, { Component } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import BellIcon from '../../assets/bell-icon.svg';
import { AppBar, Toolbar, IconButton, Badge, Grow, Typography, Avatar, Menu, MenuItem, Popper, Paper, ClickAwayListener, MenuList } from '@material-ui/core';
import DrawerMenu from '../../common/components/drawerMenu'
import { clearLocalStorage } from '../../services/StorageService';

class HeaderComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null
        }
    }

    componentDidMount() {

    }

    handleToggle = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    }

    toggleDrawer = () => {
        this.setState({ isOpen: !this.state.isOpen });
    }

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleLogout = () => {
        clearLocalStorage();
        window.location.assign("/");
        window.location.reload()
    }

    render() {
        return (
            <div className="grow">
                <AppBar position="static" className="topHeader">
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className="menuButton"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.toggleDrawer}>
                            <MenuIcon />
                        </IconButton>
                        <span className="headerLogo" noWrap>
                            <Typography className="c-theme">BIO BY DECADE</Typography>
                        </span>

                        <DrawerMenu isOpen={this.state.isOpen} toggleDrawer={this.toggleDrawer} />

                        <div style={{ flexGrow: 1 }}></div>

                        <div className="headerRightActions">
                            <IconButton aria-label="search" color="inherit">
                                <SearchIcon />
                            </IconButton>
                            <IconButton aria-label="show new notifications" color="inherit" className="notifyIcon">
                                <Badge badgeContent={1} color="secondary">
                                    <img src={BellIcon} alt="notification" />
                                </Badge>
                            </IconButton>
                            <IconButton
                                // ref={anchorRef}
                                aria-controls={this.state.open ? 'menu-list-grow' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleToggle}
                                className="loginButton"
                            >
                                <Avatar>GP</Avatar>
                            </IconButton>
                            <Popper className="headerUserMenu" open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} role={undefined} transition disablePortal>
                                {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
                                    >
                                        <Paper className="paperDroplist">
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <MenuList autoFocusItem={Boolean(this.state.anchorEl)} id="menu-list-grow">
                                                    <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                                                    <MenuItem onClick={this.handleClose}>My account</MenuItem>
                                                    <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                                                </MenuList>
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                )}
                            </Popper>
                        </div>
                    </Toolbar>
                </AppBar>
            </div >
        );
    }
}

export default HeaderComponent;