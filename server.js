require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const next = require('next')

const User = require('./model').User
const sequelize = require('./model').sequelize

const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({ db: sequelize })
// sessionStore.sync() // create sessions table first time app is run, comment out after

const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const register = require('./api/auth/register')

passport.use(new LocalStrategy(
  { usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
  	if (!email || !password) {
  		done('Email and password required', null)
  		return
  	}

  	const user = await User.findOne({ where: { email: email } })

  	if (!user) {
  		done('User not found', null)
  		return
  	}

  	const valid = await user.isPasswordValid(password)

  	if (!valid) {
  		done('Email and password do not match', null)
  		return
  	}

  	done(null, user)
  }
))

passport.serializeUser((user, done) => {
  done(null, user.email)
})
passport.deserializeUser((email, done) => {
  User.findOne({ where: { email: email } }).then(user => {
    done(null, user)
  })
})

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const server = express()

  server.use(bodyParser.json())
  server.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: true,
      name: 'rbnb',
      cookie: {
        secure: false, // CRITICAL on localhost
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      },
      store: sessionStore
    }),
    passport.initialize(),
    passport.session()
  )

  // REGISTER END POINT
  server.post('/api/auth/register', register)

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on localhost:${port}`)
  })
})
