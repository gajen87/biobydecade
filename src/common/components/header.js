import React, { Fragment } from 'react';
import { makeStyles, AppBar, Toolbar, IconButton, Badge, MenuItem, MenuList, Grow, Popper, Paper, ClickAwayListener } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import HeaderLogo from '../../assets/logo.svg';
import UserPic from '../../assets/userpic.png';
import BellIcon from '../../assets/bell-icon.svg';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
}));

export default function Header(props) {
    const locationHref = new URL(window.location.href);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);
    const history = useHistory();

    const handleToggle = () => {
        setOpen((prevOpened) => !prevOpened);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };
    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    function showHeader() {
        if (locationHref.pathname === '/' || locationHref.pathname === '/forgot-password') {
            return false;
        }
        return true;
    }

    function logout() {
        props.logoutAction().then(res => {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            history.push('/')
        }).catch(err => {
        })

    }
    const prevOpen = React.useRef(open);
    const renderMenu = (
        <Fragment>
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'right top' : 'right bottom' }}
                    >
                        <Paper className="paperDroplist">
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                                    <MenuItem onClick={handleClose}>My account</MenuItem>
                                    <MenuItem onClick={logout}>Logout</MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </Fragment>
    );
    return (
        <div className={classes.grow}>

            <AppBar position="static" className="topHeader">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className="menuButton"
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <span className="headerLogo" noWrap>
                        <img src={HeaderLogo} alt="brand logo" />
                    </span>
                    <div className={classes.grow} />
                    <div className="headerRightActions">
                        <IconButton aria-label="search" color="inherit">
                            <SearchIcon />
                        </IconButton>
                        <IconButton aria-label="show new notifications" color="inherit" className="notifyIcon">
                            <Badge badgeContent={9} color="secondary">
                                <img src={BellIcon} alt="notification" />
                            </Badge>
                        </IconButton>
                        <IconButton
                            ref={anchorRef}
                            aria-controls={open ? 'menu-list-grow' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            className="loginButton"
                        >
                            <img src={UserPic} alt="user" />
                            {/* <AccountCircle /> */}
                        </IconButton>
                        {renderMenu}
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}
