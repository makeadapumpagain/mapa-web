import { createTheme, Theme } from '@mui/material';

const theme: Theme = createTheme({
    palette: {
        primary: {
            main: "#00b579",
        },
        secondary: {
            main: "#004bb5",
        },
        info: {
            main: "#e2f04d",
        },
        error: {
            main: "#c91414",
        },
        warning: {
            main: "#e3901b",
        },
        background: {
            default: "#383838",
        },
        text: {
            primary: "#000000",
            secondary: "#616161"
        }
    }
});

export default theme;