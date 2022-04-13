// import BrightnessHighIcon from '@mui/icons-material/BrightnessHigh';
// import DarkModeIcon from '@mui/icons-material/DarkMode';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
// import { useTheme } from '@mui/material/styles';
import { MouseEventHandler, /* useContext, */ VFC } from 'react';
// import Tooltip from 'components/atoms/Tooltip';
// import ColorModeContext from 'context/ColorModeContext';

interface Props {
  handleMenuOpen: MouseEventHandler<HTMLButtonElement>;
}

const Header: VFC<Props> = ({ handleMenuOpen }) => {
  // const theme = useTheme();
  // const isDarkMode = theme.palette.mode === 'dark';

  // const colorMode = useContext(ColorModeContext);

  return (
    <>
      <AppBar position='sticky' enableColorOnDark>
        <Toolbar variant='dense'>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
            onClick={handleMenuOpen}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant='h6' component='h1' sx={{ flexGrow: 1 }}>
            V最協S4 練習カスタム結果
          </Typography>

          {/* <Tooltip title={(isDarkMode ? 'ライトテーマ' : 'ダークテーマ') + 'に切り替える'}>
            <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
              {isDarkMode ? <BrightnessHighIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip> */}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
