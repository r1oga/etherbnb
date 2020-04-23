import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { theme } from 'rimble-ui'
import { StoreProvider } from 'easy-peasy'

import store from '../store'
import 'react-day-picker/lib/style.css'
import '../main.css'

function MyApp ({ Component, pageProps, user }) {
  // check if user prop is set, set it to store by calling the setUser action
  if (user) {
    store.getActions().user.setUser(user)
  }

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  )
}

/*
  session is stored in req.session
  user is stored in req.session.passport.user
  we want to extract user value from server on the first page load
*/
MyApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)

  let user = null
  if (
    appContext.ctx.req &&
    appContext.ctx.req.session &&
    appContext.ctx.req.session.passport &&
    appContext.ctx.req.session.passport.user
  ) {
    user = appContext.ctx.req.session.passport.user
  }

  return { ...appProps, user: user }
}

export default MyApp
