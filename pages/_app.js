import { QuioscoProvider } from '@/context/QuioscoProvider'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}
