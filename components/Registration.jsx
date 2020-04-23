import { Form, Button, Heading, Box, Text } from 'rimble-ui'

export default ({ toggle }) => {
  const onSubmit = event => {
    alert('Log in')
    event.preventDefault()
  }

  return (
    <Form onSubmit={onSubmit}>
      <Heading.h2>Register</Heading.h2>
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
      <Form.Field label='Repeat Password' width={1}>
        <Form.Input
          type='password'
          required
          width={1}
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
