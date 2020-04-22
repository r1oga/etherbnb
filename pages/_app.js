import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from 'rimble-ui'
import { StoreProvider } from 'easy-peasy'

import store from '../store'
import 'react-day-picker/lib/style.css'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <StoreProvider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </StoreProvider>
    )
  }
}
