import { createTheme } from '@mui/material/styles';

const palette = {
  primary: {
    light: '#ffbd43',
    main: '#db8d00',
    dark: '#a46000',
    contrastText: '#fff',
  },
  secondary: {
    light: '#64b1ff',
    main: '#0082ed',
    dark: '#0056ba',
  },
};

const theme = createTheme({
  palette: palette,
  typography: {
    fontSize: 15,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 700,
    h1: { fontSize: 48, fontWeight: 'bolder' },
    h2: { fontSize: 32, fontWeight: 'regular' },
    h3: { fontSize: 24, fontWeight: 'regular' },
    h4: { fontSize: 20, fontWeight: 'regular' },
    h5: { fontSize: 18 },
    h6: { fontSize: 16 },
    subtitle1: { fontSize: 16 },
    body1: { fontSize: 15 },
    body2: { fontSize: 15 },
    button: { textTransform: 'none' },
  },
  components: {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.MuiTableRow-hover:hover': {
            backgroundColor: 'rgba(219,141,0,0.1)',
          },
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        focusHighlight: {
          backgroundColor: palette.primary.main,
        },
      },
    },
  },
});

export default theme;
