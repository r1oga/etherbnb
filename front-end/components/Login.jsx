import { Form, Box, Button, Heading, Text } from 'rimble-ui'
import { useState } from 'react'
import axios from 'axios'
import { useStoreActions } from 'easy-peasy'

export default ({ toggle }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const setUser = useStoreActions(actions => actions.user.setUser)
  const closeModal = useStoreActions(actions => actions.modals.closeModal)

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/auth/login', { email, password })
      if (response.data.status === 'error') {
        alert(response.data.message)
        return
      }
      setUser(email)
      closeModal()
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Heading.h2>Login</Heading.h2>
      <Form.Field label='Email' width={1}>
        <Form.Input
          value={email}
          type='email'
          required
          width={1}
          onChange={event => setEmail(event.target.value)}
        />
      </Form.Field>
      <Form.Field label='Password' width={1}>
        <Form.Input
          type='password'
          required
          width={1}
          value={password}
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Field>
      <Button type='submit' width={1}>
          Login
      </Button>
      <Box pt={3}>
        <Text>Don't have an account yet?</Text>
        <Button.Outline width={1} onClick={toggle}>
              Register
        </Button.Outline>
      </Box>
    </Form>
  )
}
