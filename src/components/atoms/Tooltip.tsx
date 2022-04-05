import MuiTooltip, { TooltipProps } from '@mui/material/Tooltip';
import { VFC } from 'react';

const Tooltip: VFC<TooltipProps> = ({ children, ...props }) => {
  return (
    <MuiTooltip {...props} enterTouchDelay={0}>
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;
