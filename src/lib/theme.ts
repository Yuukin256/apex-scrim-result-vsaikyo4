import { PaletteMode } from '@mui/material';
import { orange } from '@mui/material/colors';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const modeTheme = (mode: PaletteMode) =>
  responsiveFontSizes(
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
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 700,
        h1: { fontWeight: 700 },
        h2: { fontWeight: 400 },
        h3: { fontWeight: 400 },
        h4: { fontWeight: 400 },
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
    })
  );
