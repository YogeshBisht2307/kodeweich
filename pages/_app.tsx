import '../styles/globals.css'
import {ThemeProvider} from 'next-themes'
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from './page';


interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(<Component {...pageProps} />);
}
