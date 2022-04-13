import { useWindowScroll } from '@mantine/hooks';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Fab from '@mui/material/Fab';
import Zoom from '@mui/material/Zoom';

interface Props {
  window?: () => Window;
}

const FabToTop: React.VFC<Props> = () => {
  const [scroll, scrollTo] = useWindowScroll();

  const handleClick = () => {
    scrollTo({ y: 0 });
  };

  return (
    <Zoom in={scroll.y > 100}>
      <Fab onClick={handleClick} sx={{ position: 'fixed', bottom: 10, right: 10 }} color='primary' size='small'>
        <ArrowUpwardIcon htmlColor='white' />
      </Fab>
    </Zoom>
  );
};

export default FabToTop;
