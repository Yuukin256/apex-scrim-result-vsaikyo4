import UpIcon from '@mui/icons-material/KeyboardArrowUp';
import Fab from '@mui/material/Fab';
import React from 'react';

const FabToTop: React.VFC = () => (
  <Fab className="bottom-5 right-5 fixed text-white" variant="extended" color="primary" href="#top">
    <UpIcon sx={{ color: 'white' }} />
    トップに戻る
  </Fab>
);

export default FabToTop;
