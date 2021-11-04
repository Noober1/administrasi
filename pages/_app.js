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
import { MainSnackbar, SpinnerBackdrop } from '../src/components/atoms';
import { MainSpinner } from '../src/components/molecules';

function MyApp({ Component, pageProps }) {
	const store = useStore((state) => state);
	const config = useSelector(selectConfig)
	const getLayout = Component.getLayout || ((page) => page)
	const applyTheme = config.theme == 'light' ? theme.lightTheme : theme.darkTheme

	return(
		<PersistGate persistor={store.__persistor} loading={<SpinnerBackdrop/>}>
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
				{getLayout(<Component {...pageProps} />)}
				<MainSnackbar/>
				<MainSpinner/>
			</ThemeProvider>
		</PersistGate>
	);
}

export default wrapper.withRedux(MyApp);
