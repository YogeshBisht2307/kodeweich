import { Html, Head, Main, NextScript } from 'next/document'
import Seo from '../components/Seo'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Seo/>
      </Head>
      <body className='bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white'>
        <Main />
        <NextScript />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js" async></script>
      </body>
    </Html>
  )
}
