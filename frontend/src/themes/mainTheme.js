import { createTheme } from '@mui/material/styles';
import { purple, red, indigo, lightGreen, amber } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    purple: {
        main: purple[500],
        light: purple[200],
        dark: purple[1800],
    },
    red: {
        main: red[500],
        light: red[200],
        dark: red[800],
    },
    indigo: {
        main: indigo[500],
        light: indigo[200],
        dark: indigo[800],
    },
    lightGreen: {
        main: lightGreen[500],
        light: lightGreen[200],
        dark: lightGreen[800],
    },
    amber: {
        main: amber[500],
        light: amber[200],
        dark: amber[800],
    },
  },
});

export default theme