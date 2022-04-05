import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#dc8f00',
    },
  },
  typography: {
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    h1: { fontSize: 48 },
    h2: { fontSize: 32 },
    h3: { fontSize: 24 },
    h4: { fontSize: 20 },
    h5: { fontSize: 18 },
    h6: { fontSize: 16 },
    subtitle1: { fontSize: 16 },
    body1: { fontSize: 15 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiTableCell: {
      defaultProps: {
        sx: { fontSize: '0.875rem' },
      },
    },
  },
});

export default theme;
