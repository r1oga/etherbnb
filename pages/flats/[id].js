import * as _ from 'lodash'
import Head from 'next/head'
import { Flex, Box, Heading, Text, Card, Button } from 'rimble-ui'
import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { useStoreActions } from 'easy-peasy'

import flats from '../flats.json'
import Layout from '../../components/Layout'
import FlatComponent from '../../components/Flat'
import DateRangePicker from '../../components/DateRangePicker'

const Flat = ({ flat }) => {
  const [dateChosen, setDateChosen] = useState(false)
  const [numberNights, setNumberNights] = useState(0)

  const openLogin = useStoreActions(actions => actions.modals.openLogin)

  return (
    <Layout>
      <Flex display={['block', 'flex']}>
        <Head>
          <title>{flat.title}</title>
        </Head>
        <Box width={[1, 1 / 2, 3 / 5]}>
          <FlatComponent {...flat} />
        </Box>
        <Box mx={[0, 3]} width={[1, 1 / 2, 2 / 5]}>
          <DateRangePicker datesChanged={(startDate, endDate) => {
            setNumberNights(differenceInCalendarDays(endDate, startDate))
            setDateChosen(true)
          }}
          />
          {
            dateChosen && (
              <Card mt={3} borderRadius={8}>
                <Flex flexWrap='wrap' flexDirection='row'>
                  <Heading.h2 flex='1 100%'>Costs</Heading.h2>
                  <Box flex='1 50%'>
                    <Heading.h3>Nights</Heading.h3>
                    <Text>{numberNights}</Text>
                  </Box>
                  <Box flex='1 50%'>
                    <Heading.h3>Price/night </Heading.h3>
                    <Text>{flat.nightPrice.toFixed(2)} €</Text>
                  </Box>
                  <Box flex='1 100%'>
                    <Heading.h3>Total</Heading.h3>
                    <Text>{(numberNights * flat.nightPrice).toFixed(2)} €</Text>
                  </Box>
                </Flex>
                <Button mt={2} width={1} onClick={openLogin}>
                    Book
                </Button>
              </Card>
            )
          }
        </Box>
      </Flex>
    </Layout>
  )
}

Flat.getInitialProps = ({ query: { id } }) => {
  return { flat: _.filter(flats, ['id', id])[0] }
}

export default Flat
