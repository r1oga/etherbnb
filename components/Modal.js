import { Box, Modal, Button, Card } from 'rimble-ui'
import { useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'

import Login from './Login'
import Registration from './Registration'

export default props => {
  const showModal = useStoreState(state => state.modals.showModal)
  const showLogin = useStoreState(state => state.modals.showLogin)
  const showRegistration = useStoreState(state => state.modals.showRegistration)

  const openLogin = useStoreActions(actions => actions.modals.openLogin)
  const openRegistration = useStoreActions(actions => actions.modals.openRegistration)
  const closeModal = useStoreActions(actions => actions.modals.closeModal)

  return (
    <>
      <Modal isOpen={showModal}>
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
            {showLogin && <Login toggle={openRegistration} />}
            {showRegistration && <Registration toggle={openLogin} />}
          </Box>
        </Card>
      </Modal>
    </>
  )
}
