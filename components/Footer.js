import Link from 'next/link'
import GitHubIcon from '@material-ui/icons/GitHub'

export default () => (
  <div className='footer-container'>
    <p>
      Made by
      <a href='https://twitter.com/r1oga' target='__blank'>@r1oga</a>
    </p>
    <Link href='/'>
      <a href='https://github.com/r1oga/rbnb' target='__blank'>
        <GitHubIcon fontSize='large' />
      </a>
    </Link>
    <style jsx>{`
      a {
        padding-left: 1%;
      }

      .footer-container {
        text-align: center;
      }
    `}
    </style>
  </div>
)
