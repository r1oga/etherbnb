require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

const User = require('./models/user')
const Flat = require('./models/flat')
const Review = require('./models/review')
const sequelize = require('./db')

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db: sequelize })
// sessionStore.sync() // create sessions table first time app is run, comment out after

// keep DB in sync in case with change the models
User.sync({ alter: true })
Flat.sync({ alter: true })
Review.sync({ alter: true })

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const routes = require('./routes')

passport.use(new LocalStrategy(
  // options
  { usernameField: 'email', passwordField: 'password' },
  // verify callback
  async (email, password, done) => {
  	if (!email || !password) {
      /* authentication failed but server operates normally
      we pass err = null, false, error message
      */
  		return done(null, false, 'Email and password required')
  	}

    try {
      const user = await User.findOne({ where: { email: email } })
      if (!user) {
        return done(null, false, 'User not found')
      }

      const valid = await user.isPasswordValid(password)
      if (!valid) {
        return done(null, false, 'Incorrect password')
      }
      return done(null, user)
    } catch (err) {
      // done invoked with an error because this is a server exception not an authentication failure
      return done(err)
    }
  }
))

/* serialize to keep the amount of data stored within the session small.
Only the user email is stored within the session
*/
passport.serializeUser((user, done) => {
  done(null, user.email)
})
/* When subsequent requests are received, this email is used to find the user,
which will be restored to req.user.
*/
passport.deserializeUser((email, done) => {
  User.findOne({ where: { email: email } }).then(user => {
    done(null, user)
  })
})

const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const server = express()
  // MIDDLEWARES
  server.use(bodyParser.json())

  /* express-session middleware:
    'value'each user gets assigned a unique session and link their requests together.
    session is accessible in req.session
    Can be used to get or set data
    only session id is stored in a cookie sent along with each HTTP req
    session data has to be stored server side
    */
  server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    name: 'rbnb',
    cookie: {
      secure: false, // CRITICAL on localhost
      maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
    },
    store: sessionStore
  }))
  // passport middleware
  server.use(passport.initialize())
  server.use(passport.session())

  // ROUTES
  routes(server, passport)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
