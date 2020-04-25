import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { Heading } from 'rimble-ui'

import Layout from '../../components/Layout'
import Flat from '../../components/Flat'

const Host = ({ flats }) => {
  return (
    <Layout>
      <Head><title>Your flats</title></Head>
      <Heading.h2 textAlign='center'>Your flats</Heading.h2>
      <div className='flats'>
        {flats.map((flat, index) => <Flat key={index} {...flat} />)}
      </div>
    </Layout>
  )
}

Host.getInitialProps = async ctx => {
  const response = await axios({
    method: 'get',
    url: 'http://localhost:3000/api/host/list',
    headers: ctx.req ? { cookie: ctx.req.headers.cookie } : undefined
  })

  return { flats: response.data.flats }
}

export default Host
