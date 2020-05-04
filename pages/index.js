import { Heading, Flex, Box } from 'rimble-ui'
import fetch from 'isomorphic-unfetch'

import flats from './flats.json'
import Flat from '../components/Flat'
import Layout from '../components/Layout'

const Index = ({ flats }) => (
  <Layout>
    <Heading.h2 textAlign='center'>Places to stay at</Heading.h2>
    <Flex flexWrap='wrap' justifyContent='space-around' my={0}>
      {flats.map((flat, index) => (
        <Flex width='320px' my={0}>
          <Flat key={index} {...flat} route='flats' />
        </Flex>
      ))}
    </Flex>
  </Layout>
)

Index.getInitialProps = async () => {
  const res = await fetch(`http://localhost:${process.env.PORT}/api/flats`)
  const flats = await res.json()
  return { flats }
}

export default Index
