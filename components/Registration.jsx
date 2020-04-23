import { Form, Button, Heading, Box, Text } from 'rimble-ui'
import { useState } from 'react'
import axios from 'axios'

export default ({ toggle }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordRepeat, setPasswordRepeat] = useState('')

  const onSubmit = async event => {
    try {
      const response = await axios.post(
        '/api/auth/register',
        { email, password, passwordRepeat }
      )
      if (response.data.status === 'error') {
        alert(response.data.message)
        return
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Heading.h2>Register</Heading.h2>
      <Form.Field label='Email' width={1}>
        <Form.Input
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
          onChange={event => setPassword(event.target.value)}
        />
      </Form.Field>
      <Form.Field label='Repeat Password' width={1}>
        <Form.Input
          type='password'
          required
          width={1}
          onChange={event => setPasswordRepeat(event.target.value)}
        />
      </Form.Field>
      <Button type='submit' width={1}>
          Sign up
      </Button>
      <Box pt={3}>
        <Text>Already have an account?</Text>
        <Button.Outline width={1} onClick={toggle}>
              Login
        </Button.Outline>
      </Box>
    </Form>
  )
}
