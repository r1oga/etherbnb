import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Heading } from 'rimble-ui'

import Layout from '../../components/Layout'
import Flat from '../../components/Flat'
import Booking from '../../components/Booking'

const Host = ({ flats, bookings }) => {
  return (
    <Layout>
      <Head><title>Your flats</title></Head>
      <Heading.h2 textAlign='center'>Your Flats</Heading.h2>
      <div className='flats'>
        {flats.map((flat, index) => <Flat key={index} {...flat} route='host' />)}
      </div>
      <Heading.h2 textAlign='center'>Your Bookings</Heading.h2>
      <div className='flats'>
        {bookings.map((booking, index) => <Booking key={index} {...booking} />)}
      </div>
    </Layout>
  )
}

Host.getInitialProps = async ctx => {
  const { data: { flats, bookings } } = await axios({
    method: 'get',
    url: 'http://localhost:3000/api/host/list',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })

  return { flats, bookings }
}

export default Host
