import { PaletteMode } from '@mui/material';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const primaryColorRgb = (opacity = 1) => `rgb(219,141,0,${opacity})`;

export const getTheme = (mode: PaletteMode) => {
  const modeAssignedTheme = createTheme({
    palette: {
      mode: mode,
      primary: {
        main: primaryColorRgb(),
        contrastText: '#fff',
      },
      secondary: {
        main: '#0082ed',
        contrastText: '#fff',
      },
      action: {
        hover: primaryColorRgb(0.1),
      },
    },
    typography: {
      htmlFontSize: 15,
    },
    components: {
      MuiList: {
        defaultProps: {
          dense: true,
        },
      },
      MuiMenuItem: {
        defaultProps: {
          dense: true,
        },
      },
      MuiTable: {
        defaultProps: {
          size: 'small',
        },
      },
      MuiAlert: {
        defaultProps: {
          variant: mode === 'dark' ? 'outlined' : 'standard',
        },
      },
      MuiAccordionSummary: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColorRgb(0.2),
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            backgroundColor: primaryColorRgb(0.1),
          },
        },
      },
    },
  });

  const modifiedTheme = createTheme(modeAssignedTheme, {
    components: {
      MuiTableCell: {
        styleOverrides: {
          root: {
            borderWidth: 0,
            borderStyle: 'solid',
            borderColor: modeAssignedTheme.palette.divider,
            borderBottomWidth: '1px',
            borderTopWidth: '1px',
            padding: '0.4rem 0.7rem',
            fontSize: '0.875rem',
          },
          head: {
            fontWeight: 'bold',
            backgroundColor:
              mode === 'dark' ? modeAssignedTheme.palette.common.black : modeAssignedTheme.palette.grey[100],
          },
        },
      },
    },
  });

  return responsiveFontSizes(modifiedTheme);
};
