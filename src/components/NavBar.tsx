import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import '../css/NavBar.css';
import profileAvatar from '../assets/img/profileAvatar.png';
import { Box, Menu } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';

const pages = ['Categories', 'Departments', 'Employees', 'ExternalEntities', 'Groups', 'Professions', 'Zones'];

const formatPageName = (page: string) => {
    return page.replace(/([A-Z])/g, ' $1').trim();
};

export const NavBar = () => {
    const navigate = useNavigate();
    const handleNavigation = (page: string) => {
        navigate(`/${page}`);
    };
    const [user, setUser] = useState({ name: '', email: '' });
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/');
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Error fetching user data: ${response.status}`);
            }

            const userData = await response.json();
            setUser(userData);
        };

        fetchData();
    }, []);

    const theme = useTheme();
    return (
        <AppBar position="static" style={{ width: '100vw', overflowX: 'auto' }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="./Dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'sans-serif',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            marginRight: theme.spacing(10),
                        }}
                    >
                        Nclock
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="menu"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button key={page} onClick={() => handleNavigation(page)}>
                                    {formatPageName(page)}
                                </Button>
                            ))}
                        </Menu>
                    </Box>

                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button key={page} onClick={() => handleNavigation(page)} sx={{ my: 2, color: 'white', display: 'block' }}>
                                {formatPageName(page)}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 1 }}>
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <img className="profile-avatar" src={profileAvatar} alt="Profile" />
                        </IconButton>
                        <Menu
                            id="user-appbar"
                            anchorEl={anchorElUser}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <Typography variant="subtitle1">{user.name}</Typography>
                            <Typography variant="subtitle2">{user.email}</Typography>
                            <Button onClick={handleLogout}>Logout</Button>
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
