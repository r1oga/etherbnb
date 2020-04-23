import Link from 'next/link'
import { useStoreActions, useStoreState } from 'easy-peasy'
import axios from 'axios'

export default () => {
  const openLogin = useStoreActions(actions => actions.modals.openLogin)
  const openRegistration =
  useStoreActions(actions => actions.modals.openRegistration)
  const user = useStoreState(state => state.user.user)
  const setUser = useStoreActions(actions => actions.user.setUser)

  const loggedHtml = (
    <>
      <li className='username'>{user}</li>
      <li>
        <a
          href='#'
          onClick={async () => {
            await axios.post('/api/auth/logout')
            setUser(null)
          }}
        >Logout
        </a>
      </li>
    </>
  )
  const notLoggedHtml = (
    <>
      <li>
        <Link href='#'>
          <a href='#' onClick={openRegistration}>Register</a>
        </Link>
      </li>
      <li>
        <Link href='#'>
          <a href='#' onClick={openLogin}>Log in</a>
        </Link>
      </li>
    </>)

  return (
    <div className='nav-container'>
      <Link href='/'>
        <a>
          <img src='/img/favicon.ico' alt='rbnb logo' />
        </a>
      </Link>

      <nav>
        <ul>
          {user ? loggedHtml : notLoggedHtml}
        </ul>
      </nav>

      <style jsx>{`
        ul {
          margin: 0;
          padding: 0;
        }

        li {
          display: block;
          float: left;
        }

        a {
          text-decoration: none;
          display: block;
          margin-right: 15px;
          color: #333;
        }

        nav a {
          padding: 1em 0.5em;
        }

        .nav-container {
          border-bottom: 1px solid #eee;
          height: 50px;
        }

        img {
          float: left;
        }

        ul {
          float: right;
        }

        .username {
          padding: 1em 0.5em;
        }
   `}
      </style>
    </div>
  )
}
