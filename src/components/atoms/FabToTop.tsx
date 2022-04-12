import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';
import useScrollTrigger from '@mui/material/useScrollTrigger';

interface Props {
  window?: () => Window;
}

const FabToTop: React.VFC<Props> = ({ window }) => {
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <Zoom in={trigger}>
      <Fab className='bottom-5 right-5 fixed' color='primary' onClick={handleClick}>
        <ArrowUpwardIcon htmlColor='white' />
      </Fab>
    </Zoom>
  );
};

export default FabToTop;
