import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const drawerWidth = 250;

export default function PermanentDrawerLeft() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            marginTop: '4.3rem',
            backgroundColor: '#303030',
            color: 'white'
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List>
        <Typography variant="body2">POINT OF SALE</Typography>
          <ListItem disablePadding>
            <ListItemText>
              <Typography variant="caption"><b>Reports</b></Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding >
            <List dense disablePadding>
              {['Sales Summary', 'Paymrnt Methods', 'Item Sales', 'Category Sales', 'Team Sales', 'Labor vd Cost', 'Discount', 'Comps'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} primaryTypographyProps={{ variant: 'caption' }}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
        <List>
          <ListItem disablePadding>
            <ListItemText>
              <Typography variant="caption"><b>Inventory</b></Typography>
            </ListItemText>
          </ListItem>
          <ListItem disablePadding>
            <List dense disablePadding> 
              {['Cost of goods sold', 'Inventory Sale Through', 'Projected Profit', 'Vendor Sales', 'Inventory: Category'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={text} primaryTypographyProps={{ variant: 'caption' }}/>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
