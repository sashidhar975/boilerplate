
import React, { useState, useEffect } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MdOutlineLightMode } from 'react-icons/md';
import Payments from '../Dashboards/Payments';
import Subscriptions from '../Dashboards/Subscriptions';
import OpenAi from '../Dashboards/OpenAi';
import ContentItems from '../Dashboards/ContentItems';
import Documents from '../Dashboards/Documents';
import Crud from '../Dashboards/Crud';
import Pandp from '../Dashboards/Pandp';
import Tc from '../Dashboards/Tc';
import Dashboards from '../Dashboards/Dashboards';
import Button from '@mui/material/Button';
import Notifications from './Notifications'; 
import UserProfile from './UserProfile';
import { useNavigate } from 'react-router-dom';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, isDarkMode }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const NotificationContainer = styled('div')({
    position: 'absolute',
    top: '48px',
    right: '72px',
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px',
  });
  
  const ProfileContainer = styled('div')({
    position: 'absolute',
    top: '48px',
    right: '72px',
    backgroundColor: '#fff',
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px',
  });

  
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');
    const [isDarkMode, setIsDarkMode] = useState(false); 
    const [showNotifications, setShowNotifications] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();




    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (text) => {
        setSelectedItem(text);
    };
    

    const toggleDarkMode = () => {
      setIsDarkMode(!isDarkMode);
      if (!isDarkMode) {
        document.documentElement.classList.add('dark-mode');
      } else {
        document.documentElement.classList.remove('dark-mode');
      }
    };

    const handleNotificationClick = () => {
        setShowNotifications(!showNotifications);
      };
    
    const handleProfileClick = () => {
        setShowProfile(!showProfile);
      };

      const handleLogout = async () => {
        try {
          
          await fetch('http://localhost:3000/api/auth/logout', {
            method: 'POST',
            credentials: 'include', 
          });
          alert('Are you sure you want to log out?');
          navigate('/');
          console.log('Logout successful');
        } catch (error) {
          console.error('Logout failed', error);
        }
      };
    

    return (
    
        <Box sx={{ display: 'flex' }}>
        <AppBar open={open} sx={{ backgroundColor: isDarkMode ? '#333' : 'white', color: isDarkMode ? 'white' : 'black' }}>
    <Toolbar>
        <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
        >
            <MenuIcon />
        </IconButton>
        <div style={{ flexGrow: 1 }}></div>
          <Button
            className="dark-mode-toggle"
            onClick={toggleDarkMode}
            style={{
              backgroundColor: 'transparent',
              border: 'none',
               color: isDarkMode ? 'white' : 'black',
               fontSize: '20px',
            }}
          >
            {isDarkMode ? <MdOutlineLightMode /> : <MdOutlineLightMode />}
          </Button>
        
        <IconButton color="inherit" onClick={handleNotificationClick}>
        <Notifications  />
          </IconButton>
          <IconButton color="inherit" onClick={handleProfileClick}>
            <AccountCircleIcon  />
          </IconButton>
          {showProfile && <UserProfile />}
          <IconButton 
    color="inherit" 
    onClick={handleLogout} 
    onMouseEnter={() => setShowLogout(true)} 
    onMouseLeave={() => setShowLogout(false)}
    style={{ position: 'relative' }}
>
    <ExitToAppIcon />
    <span 
        className="logout-text" 
        style={{ 
            display: showLogout ? 'inline' : 'none',
            position: 'absolute',
            left: '30px',
            padding: '2px',
            backgroundColor: 'white',
        }}
    >
        log out
    </span>
</IconButton>

        
    </Toolbar>
</AppBar>


            <Drawer
    sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: isDarkMode ? '#333' : 'white', // Adjust background color based on dark mode
            color: isDarkMode ? 'white' : 'black', // Adjust text color based on dark mode
        },
    }}
    variant="persistent"
    anchor="left"
    open={open}
>
    <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
        {['Dashboard', 'Payments', 'Subscriptions', 'OpenAI Integration', 'Content items', 'Documents', 'CRUD', <span>Static Pages</span>, 'Privacy policy', 'Terms and conditions'].map((text, index) => (
            <ListItem key={text} disablePadding>
                <ListItemButton onClick={() => handleListItemClick(text)} selected={selectedItem === text}>
                    <ListItemText primary={text} />
                </ListItemButton>
            </ListItem>
        ))}
    </List>
    <Divider sx={{ backgroundColor: isDarkMode ? 'white' : 'black' }} /> {/* Adjust Divider color based on dark mode */}
</Drawer>

            <Main open={open}>
                <DrawerHeader />
                {selectedItem === 'Dashboard' && <Dashboards />}
                {selectedItem === 'Payments' && <Payments />}
                {selectedItem === 'Subscriptions' && <Subscriptions />}
                {selectedItem === 'OpenAI Integration' && <OpenAi />}
                {selectedItem === 'Content items' && <ContentItems />}
                {selectedItem === 'Documents' && <Documents />}
                {selectedItem === 'CRUD' && <Crud />}
                {selectedItem === 'Privacy policy' && <Pandp />}
                {selectedItem === 'Terms and conditions' && <Tc />}
            </Main>
        </Box>
    );
}
