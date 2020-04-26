import { Heading, Flex } from 'rimble-ui'
import fetch from 'isomorphic-unfetch'

import flats from './flats.json'
import Flat from '../components/Flat'
import Layout from '../components/Layout'

const Index = ({ flats }) => (
  <Layout>
    <Heading.h2 textAlign='center'>Places to stay at</Heading.h2>
    <Flex flexWrap='wrap' justifyContent='space-around'>
      {flats.map((flat, index) => <Flat key={index} {...flat} route='flats' />)}
    </Flex>
  </Layout>
)

Index.getInitialProps = async () => {
  const res = await fetch('http://localhost:3000/api/flats')
  const flats = await res.json()
  return { flats }
}

export default Index
