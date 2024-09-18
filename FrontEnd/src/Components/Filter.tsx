import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function DenseAppBar() {
  return (
    <Box sx={{ flexGrow: 1, marginLeft: '240px' }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', color: 'black', boxShadow: 'none'  }}>  
        <Toolbar sx={{ justifyContent: 'space-between', flexDirection: { xs: 'column', sm: 'row' } }}>
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1, maxWidth: '140px' }}>
            <b>Item Sales</b>
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            <Button  href="#contained-buttons" sx={{ my: 1, mx: 1, backgroundColor: 'lightgrey', color: '#000' }}>All day</Button>
            <Button  href="#contained-buttons" sx={{ my: 1, mx: 1, backgroundColor: 'lightgrey', color: '#000' }}>Location</Button>
            <Button  href="#contained-buttons" sx={{ my: 1, mx: 1, backgroundColor: 'lightgrey', color: '#000' }}>Display by</Button>
            <Button  href="#contained-buttons" sx={{ my: 1, mx: 1, backgroundColor: 'lightgrey', color: '#000' }}>Summary</Button>
            <Button  href="#contained-buttons" sx={{ my: 1, mx: 1,backgroundColor: 'lightgrey', color: '#000' }}>Filter</Button>
            <Button  href="#contained-buttons" sx={{ my: 1, mx: 1, ml: 12,backgroundColor: 'red', color: '#fff' }}>Export</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
