import * as React from 'react';
import {NavLink} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import {
    MenuItem,
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip
} from '@mui/material';
import {useTypedSelector} from "../../../app/hooks";

const pages = [
    {
        page: 'Главная',
        path: '/',
        isPrivate: false
    },
    {
        page: 'Создать программу',
        path: '/create-program',
        isPrivate: true,
    },
    {
        page: 'Моя программа',
        path: '/my-program',
        isPrivate: true,
    },
    {
        page: 'О нас',
        path: '/about',
        isPrivate: false
    },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Navbar: React.FC = () => {
    const {isAuth, user} = useTypedSelector(state => state.user)

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event: any) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: any) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="static" sx={{mb: 2}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <NavLink to="/" className="brand-logo">
                            <Typography
                                variant="h6"
                                noWrap
                                style={{color: 'black'}}
                                component="div"
                                sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                            >
                                PUMPING-UP
                            </Typography>
                        </NavLink>
                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map(({page, path, isPrivate}) => (
                                    isPrivate && isAuth && <NavLink key={page} to={path}>
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    </NavLink>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{flexGrow: 1, gap: 2, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map(({page, path, isPrivate}) => (
                                isAuth ? <NavLink
                                        to={path}
                                        key={page}
                                    >
                                        <Button
                                            size="small"
                                            onClick={handleCloseNavMenu}
                                            sx={{my: 2, color: 'white', display: 'block'}}
                                        >
                                            {page}
                                        </Button>
                                    </NavLink>
                                    : !isPrivate && <NavLink
                                    to={path}
                                    key={page}
                                >
                                    <Button
                                        size="small"
                                        onClick={handleCloseNavMenu}
                                        sx={{my: 2, color: 'white', display: 'block'}}
                                    >
                                        {page}
                                    </Button>
                                </NavLink>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src={isAuth ? user.url : "/static/images/avatar/2.jpg"}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map(setting => (
                                    <MenuItem key={setting} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};
export default Navbar;
