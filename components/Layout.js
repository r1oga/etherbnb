import { useState } from 'react'
import Head from 'next/head'
import Header from './Header'
import Footer from './Footer'
import Modal from './Modal'

export default props => {
  // const [showModal, setShowModal] = useState(true)

  return (
    <>
      <Head>
        <script src='https://js.stripe.com/v3/' />
      </Head>
      <Header />
      <main style={{ marginTop: '2%', marginBottom: '2%' }}>{props.children}</main>
      <Modal>Modal</Modal>
      <Footer mt={2} />
    </>
  )
}
