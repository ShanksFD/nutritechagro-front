import { alpha } from '@mui/material';
import { createTheme } from '@mui/material/styles';

const palette = {
  primary: {
    main: '#26734D',
    dark: '#15402B',
    accent: '#73264C',
    primary100: '#E6F3EB',
    primary200: '#CCE7D7',
    primary300: '#B3DBC3',
    primary400: '#99CFB0',
    primary500: '#80C39C',
    primary600: '#66B788',
    primary700: '#4DAC75',
    primary750: '#409465',
    primary800: '#338C55',
    primary900: '#26734D',
    neutral100: '#F3F3F3',
    neutral200: '#E6E6E7',
    neutral300: '#CACACB',
    neutral400: '#A8A9AC',
    neutral500: '#7F8085',
    neutral600: '#3F414C',
    neutral700: '#383A44',
    neutral800: '#31323B',
    neutral900: '#282930',
    neutral1000: '#1C1D22',
    white: '#FFFFFF',
  },
  text: {
    primary: '#242625',
    secondary: '#56595a',
    disabled: '#AAAEB2',
    white: '#FFFFFF',
    dark: '#242526',
  },
  success: {
    main: '#25B86A',
    dark: '#0e995d',
  },
  error: {
    main: '#E85347',
    dark: '#c43c33',
  },
  pending: {
    main: '#B28800',
    dark: '#8a6a00',
  },
};

const shape = {
  defaultBorderRadius: '8px',
  secondaryBorderRadius: '6px',
  roundedButtonBorderRadius: '12px',
  checkboxBorderRadius: '3px',
  chipBorderRadius: '4px',
};

export const theme = createTheme({
  palette: {
    ...palette,
  },
  shape,
  typography: {
    fontFamily: `"Poppins", "Arial", sans-serif`,
    button: {
      textTransform: 'none',
      fontSize: '16px',
      borderRadius: shape.defaultBorderRadius,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: shape.defaultBorderRadius,
          '&:hover': {
            backgroundColor: palette.primary.primary750,
            borderColor: palette.primary.primary750,
          },
          '&.Mui-disabled': {
            backgroundColor: palette.neutral100,
            color: palette.neutral400,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: shape.chipBorderRadius,
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          marginTop: 8,
          borderRadius: shape.defaultBorderRadius,
          boxShadow: `0px 0px 32px ${palette.primary.neutral100},0 0px 10px ${palette.primary.neutral300}`,
          border: '1px solid',
          borderColor: palette.primary.neutral200,
          '& .MuiButtonBase-root.MuiMenuItem-root.Mui-selected': {
            backgroundColor: palette.primary.neutral100,
          },
          '& .Mui-selected:hover': {
            backgroundColor: palette.primary.neutral100,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          border: '1px solid',
          borderColor: palette.primary.neutral200,
          borderRadius: shape.defaultBorderRadius,
          boxShadow: `0px 0px 32px rgba(0, 0, 0, 0.15),0 0px 10px rgba(0, 0, 0, 0.1)`,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          '>:not(style)~:not(style)': {
            marginLeft: 0,
          },
        },
      },
    },
    MUIDataTableHeadCell: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.primary.neutral100, 0.7),
          color: palette.primary.neutral500,
          textTransform: 'uppercase',
          borderBottom: 'none',
          paddingTop: '8px',
          paddingBottom: '8px',
          borderRadius: '0px',
          '&:last-child': {
            borderTopRightRadius: shape.defaultBorderRadius,
            borderBottomRightRadius: shape.defaultBorderRadius,
          },
          '&:first-of-type': {
            borderTopLeftRadius: shape.defaultBorderRadius,
            borderBottomLeftRadius: shape.defaultBorderRadius,
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: alpha(palette.primary.neutral100, 0.7),
          color: palette.primary.neutral500,
          textTransform: 'uppercase',
        },
      },
    },
    MuiTableBody: {
      styleOverrides: {
        root: {
          '& .MuiTableRow-root:hover': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
  },
  transitions: {
    duration: {
      standard: '0.4s',
    },
  },
});
