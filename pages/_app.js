import 'tailwindcss/tailwind.css'
import '../src/styles/globals.css'
import { CssBaseline } from '@mui/material'
import { theme } from '../src/lib'
import { ThemeProvider } from '@mui/system'
import { wrapper } from '../src/lib/redux';
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from 'react-redux'
import { selectConfig } from '../src/lib/redux/slices/configSlice'
import { useEffect } from 'react'
import useLocalization from '../src/lib/useLocalization'

function MyApp({ Component, pageProps }) {
	const store = useStore((state) => state);
	const config = useSelector(selectConfig)
	const getLayout = Component.getLayout || ((page) => page)
	
	if (process.env.NODE_ENV !== "production") {
		useEffect(() => {
			console.log(config)
		}, [config])
	}

	const Body = () => getLayout(<Component {...pageProps} />)

	return(
		<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
			<ThemeProvider theme={config.theme == 'light' ? theme.lightTheme : theme.darkTheme}>
				<CssBaseline/>
				<Body/>
			</ThemeProvider>
		</PersistGate>
	);
}

export default wrapper.withRedux(MyApp);
