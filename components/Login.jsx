import { Form, Box, Button, Heading, Text } from 'rimble-ui'

export default ({ toggle }) => {
  const onSubmit = event => {
    alert('Log in')
    event.preventDefault()
  }

  return (
    <Form onSubmit={onSubmit}>
      <Heading.h2>Login</Heading.h2>
      <Form.Field label='Email' width={1}>
        <Form.Input
          type='email'
          required
          width={1}
        />
      </Form.Field>
      <Form.Field label='Password' width={1}>
        <Form.Input
          type='password'
          required
          width={1}
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
