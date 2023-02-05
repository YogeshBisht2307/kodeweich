import { Html, Head, Main, NextScript } from 'next/document'
import Seo from '../components/Seo'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <Seo/>
      </Head>
      <body className='text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-gray-100'>
        <Main />
        <NextScript />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js" async></script>
      </body>
    </Html>
  )
}
