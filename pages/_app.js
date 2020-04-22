import App from 'next/app'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import { theme } from 'rimble-ui'

import 'react-day-picker/lib/style.css'

export default class MyApp extends App {
  render () {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    )
  }
}
