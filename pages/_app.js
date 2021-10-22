import 'tailwindcss/tailwind.css'
import '../src/styles/globals.css'
import { CssBaseline } from '@mui/material'
import NextNprogress from 'nextjs-progressbar';
import { theme } from '../src/lib'
import { ThemeProvider } from '@mui/system'
import { wrapper } from '../src/lib/redux';
import { useStore } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { useSelector } from 'react-redux'
import { selectConfig } from '../src/lib/redux/slices/configSlice'
import MainSpinner from '../src/components/molecules/mainSpinner';

function MyApp({ Component, pageProps }) {
	const store = useStore((state) => state);
	const config = useSelector(selectConfig)
	const getLayout = Component.getLayout || ((page) => page)
	const applyTheme = config.theme == 'light' ? theme.lightTheme : theme.darkTheme

	const Body = () => getLayout(<Component {...pageProps} />)

	return(
		<PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
			<ThemeProvider theme={applyTheme}>
				<CssBaseline/>
				<NextNprogress
					color={applyTheme.palette.secondary.main}
					startPosition={0.3}
					stopDelayMs={200}
					height={3}
					showOnShallow={true}
					options={{
						showSpinner:true
					}}
				/>
				<Body/>
				<MainSpinner/>
			</ThemeProvider>
		</PersistGate>
	);
}

export default wrapper.withRedux(MyApp);
