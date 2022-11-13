import '../styles/globals.css'
import 'highlight.js/styles/stackoverflow-dark.css'

import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import {SessionProvider} from "next-auth/react";
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
