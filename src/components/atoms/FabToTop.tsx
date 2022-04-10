import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import React from 'react';

const FabToTop: React.VFC = () => (
  <Fab className='bottom-5 right-5 fixed' color='primary' href='#top'>
    <ArrowUpwardIcon htmlColor='white' />
  </Fab>
);

export default FabToTop;
