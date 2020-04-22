import * as _ from 'lodash'
import Head from 'next/head'
import { Flex, Box, Heading, Text, Card, Button } from 'rimble-ui'

import flats from '../flats.json'
import Layout from '../../components/Layout'
import FlatComponent from '../../components/Flat'
import DateRangePicker from '../../components/DateRangePicker'

const Flat = ({ flat }) => (
  <Layout>
    <Flex display={['block', 'flex']}>
      <Head>
        <title>{flat.title}</title>
      </Head>
      <Box width={[1, 1 / 2, 3 / 5]}>
        <FlatComponent {...flat} />
      </Box>
      <Box mx={[0, 3]} width={[1, 1 / 2, 2 / 5]}>
        <h2>Add dates for prices</h2>
        <DateRangePicker />
      </Box>
    </Flex>
  </Layout>
)

Flat.getInitialProps = ({ query: { id } }) => {
  return { flat: _.filter(flats, ['id', id])[0] }
}

export default Flat
