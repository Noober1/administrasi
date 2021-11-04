import { createTheme } from "@mui/material/styles";

const fontFamily = ['"PlusJakarta"', 'Open Sans']
const fontBold = {
    fontWeight: "bold"
}
const typography = {
    allVariants: {
        fontFamily: fontFamily.join(','),
    },
    h1:fontBold,
    h2:fontBold,
    h3:fontBold,
    h4:fontBold,
    h5:fontBold,
    h6:fontBold
}

const lightTheme = createTheme({
    palette:{
        mode:'light',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography,
    components:{
        MuiButton:{
            styleOverrides:{
                root:fontBold
            }
        }
    }
})

const darkTheme = createTheme({
    palette:{
        mode:'dark',
        primary: {
            main: '#3f51b5',
        },
        secondary: {
            main: '#f50057',
        },
    },
    typography,
    components:{
        MuiButton:{
            styleOverrides:{
                root:fontBold
            }
        }
    }
})

export default {
    lightTheme,
    darkTheme
};