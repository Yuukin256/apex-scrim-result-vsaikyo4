import { ClickAwayListener } from '@mui/material';
import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import { useState, VFC } from 'react';

const Tooltip: VFC<TooltipProps> = ({ children, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <MuiTooltip open={open} onOpen={handleOpen} onClose={handleClose} onTouchEndCapture={handleOpen} {...props}>
        {children}
      </MuiTooltip>
    </ClickAwayListener>
  );
};

export default Tooltip;
