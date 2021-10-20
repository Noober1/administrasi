import { createTheme } from "@mui/material/styles";

const fontFamily = ['"PlusJakarta"', 'Open Sans']
const headingFontBold = {
    fontWeight: "bold"
}
const typography = {
    allVariants: {
        fontFamily: fontFamily.join(','),
    },
    h1:headingFontBold,
    h2:headingFontBold,
    h3:headingFontBold,
    h4:headingFontBold,
    h5:headingFontBold,
    h6:headingFontBold
}

const lightTheme = createTheme({
    palette:{
        mode:'light'
    },
    typography
})

const darkTheme = createTheme({
    palette:{
        mode:'dark'
    },
    typography
})

export default {
    lightTheme,
    darkTheme
};