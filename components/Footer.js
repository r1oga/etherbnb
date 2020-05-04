import Link from 'next/link'
import { Flex, Link as LinkRimble } from 'rimble-ui'
import GitHubIcon from '@material-ui/icons/GitHub'

export default () => (
  <Flex
    alignItems='center'
    justifyContent='center'
    flexDirection='column'
    mt={0}
  >
    <p>Made by
      <LinkRimble
        href='https://twitter.com/r1oga'
        target='__blank'
        px={2}
      >@r1oga
      </LinkRimble>
    </p>
    <Link href='/'>
      <LinkRimble
        href='https://github.com/r1oga/rbnb'
        target='__blank'
        px={2}
      >
        <GitHubIcon fontSize='large' />
      </LinkRimble>
    </Link>
  </Flex>
)
