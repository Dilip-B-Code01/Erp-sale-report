import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none', borderBottom: '1px solid lightgrey' }}>
        <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, maxWidth: '100px' }}>
            origin<b>scale</b>
          </Typography>
          <Box>
            <Button className='new-btn' href="#contained-buttons" sx={{ ml: 90, backgroundColor: '#00bfa5', color: '#fff', padding: '5px 20px' }}>+ New</Button>
          </Box>
          <Tooltip title="Notifications" arrow>
            <IconButton sx={{ ml: 10 }}>
              <NotificationsNoneIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Help" arrow>
            <IconButton sx={{ ml: 5 }}>
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="User Options" arrow>
            <IconButton sx={{ p: 0, ml: 5 }}>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
            </IconButton>
          </Tooltip>
          <MoreVertIcon sx={{ ml: 2 }} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
