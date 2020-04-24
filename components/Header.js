import Link from 'next/link'
import { Link as LinkRimble, Button, Flex, Heading, Box, Image } from 'rimble-ui'
import { useStoreActions, useStoreState } from 'easy-peasy'
import axios from 'axios'

export default () => {
  const openLogin = useStoreActions(actions => actions.modals.openLogin)
  const openRegistration =
  useStoreActions(actions => actions.modals.openRegistration)
  const user = useStoreState(state => state.user.user)
  const setUser = useStoreActions(actions => actions.user.setUser)

  return (
    <Flex justifyContent='flex-end' alignItems='center'>
      <Flex flexGrow={4} alignItems='center'>
        <Link href='/'>
          <LinkRimble>
            <Image
              src='../img/favicon.ico'
              alt='Logo'
              height={['30px', '40px', '50px']}
              mr={[3, 5, 5]}
            />
          </LinkRimble>
        </Link>
        <Heading fontSize={[3, 4, 6]}>Rbnb</Heading>
      </Flex>
      {user
        ? (
          <>{user}
            <Button
              mx={2}
              fontSize={[1, 2, 3]}
              onClick={async () => {
                await axios.post('/api/auth/logout')
                setUser(null)
              }}
            >Logout
            </Button>
          </>
        ) : (
          <Box fontSize={[1, 2, 3]}>
            <Button mx={2} onClick={openLogin}>Login</Button>
            <Button mx={2} onClick={openRegistration}>Register</Button>
          </Box>
        )}
    </Flex>
  )
}
