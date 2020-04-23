import { useState } from 'react'

import Header from './Header'
import Footer from './Footer'
import Modal from './Modal'

export default props => {
  // const [showModal, setShowModal] = useState(true)

  return (
    <>
      <Header />
      <main style={{ marginTop: '2%', marginBottom: '2%' }}>{props.children}</main>
      <Modal>Modal</Modal>
      <Footer mt={3} />
    </>
  )
}
