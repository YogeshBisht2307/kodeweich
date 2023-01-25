import '../styles/globals.css'
import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app'
import { NextPageWithLayout } from './page';
const Toaster = dynamic(() => import("react-hot-toast").then((comp) => comp.Toaster),{ssr: false});

interface AppPropsWithLayout extends AppProps {
  Component: NextPageWithLayout;
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <Toaster 
        position="top-right"
        reverseOrder={false}
      />
      <Component {...pageProps} />
    </>
  );
}
