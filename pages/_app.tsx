import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { authentication, db } from '../firebase'
import { Provider } from 'react-redux'
import { store } from '../App/store'
import AuthMiddleWare from '../components/AuthMiddleWare'

function MyApp({ Component, pageProps }: AppProps) {

  return <Provider store={store}>
    <AuthMiddleWare>
      <Component {...pageProps} />
    </AuthMiddleWare>
  </Provider>
}

export default MyApp
