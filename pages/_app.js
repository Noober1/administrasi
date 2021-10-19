import 'tailwindcss/tailwind.css'
import '../src/styles/globals.css'
import { CssBaseline } from '@mui/material'
import { theme } from '../src/lib'
import { ThemeProvider } from '@mui/system'
import { wrapper } from '../src/lib/redux';

function MyApp({ Component, pageProps }) {
	return(
		<ThemeProvider theme={theme}>
			<CssBaseline/>
			<Component {...pageProps} />
		</ThemeProvider>
	)
}

export default wrapper.withRedux(MyApp);
