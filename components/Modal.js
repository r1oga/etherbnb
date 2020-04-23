import { Box, Modal, Button, Card } from 'rimble-ui'
import { useState } from 'react'

import Login from './Login'
import Registration from './Registration'

export default props => {
  const [isOpen, setIsOpen] = useState(true)
  const [showLogin, setShowLogin] = useState(true)
  const [showRegistration, setShowRegistration] = useState(false)

  const closeModal = e => {
    e.preventDefault()
    setIsOpen(false)
  }

  const openModal = e => {
    e.preventDefault()
    setIsOpen(true)
  }

  return (
    <>
      <Modal isOpen={isOpen}>
        <Card width='420px' p={0}>
          <Button.Text
            icononly
            icon='Close'
            color='moon-gray'
            position='absolute'
            top={0}
            right={0}
            mt={3}
            mr={3}
            onClick={closeModal}
          />
          <Box p={4} mb={3}>
            {showLogin && <Login toggle={() => {
              setShowLogin(false)
              setShowRegistration(true)
            }}
                          />}
            {showRegistration && <Registration toggle={() => {
              setShowLogin(true)
              setShowRegistration(false)
            }}
            />}
          </Box>
        </Card>
      </Modal>
    </>
  )
}
