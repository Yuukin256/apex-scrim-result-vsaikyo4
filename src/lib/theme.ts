import { PaletteMode } from '@mui/material';
import { orange } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const modeTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode: mode,
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
        contrastText: '#fff',
      },
      action: {
        hover: 'rgba(219,141,0,0.1)',
      },
    },
    typography: {
      fontSize: 15,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 700,
      h1: { fontSize: 48, fontWeight: 700 },
      h2: { fontSize: 32, fontWeight: 400 },
      h3: { fontSize: 24, fontWeight: 400 },
      h4: { fontSize: 20, fontWeight: 400 },
      h5: { fontSize: 18 },
      h6: { fontSize: 16 },
      subtitle1: { fontSize: 16 },
      body1: { fontSize: 15 },
      body2: { fontSize: 15 },
      button: { textTransform: 'none' },
    },
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderBottom: '1px solid inherit',
            padding: '0.4rem 0.7rem',
            fontSize: '0.875rem',
          },
        },
      },
      MuiCardActionArea: {
        styleOverrides: {
          focusHighlight: {
            backgroundColor: '#db8d00',
          },
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: orange[100],
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: orange[50],
          },
        },
      },
    },
  });
