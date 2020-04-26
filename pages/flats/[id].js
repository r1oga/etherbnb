import * as _ from 'lodash'
import Head from 'next/head'
import { Flex, Box, Heading, Text, Card, Button } from 'rimble-ui'
import { useState } from 'react'
import { differenceInCalendarDays } from 'date-fns'
import { useStoreActions, useStoreState } from 'easy-peasy'
import fetch from 'isomorphic-unfetch'
import axios from 'axios'

import Layout from '../../components/Layout'
import FlatComponent from '../../components/Flat'
import DateRangePicker from '../../components/DateRangePicker'

const getBookedDates = async flatId => {
  try {
    const response = await axios.post(
      'http://localhost:3000/api/flats/booked',
      { flatId }
    )

    if (response.data.status === 'error') {
      alert(response.data.message)
      return
    }
    return response.data.dates
  } catch (error) {
    console.log(error)
  }
}

const Flat = ({ flat }) => {
  const [dateChosen, setDateChosen] = useState(false)
  const [numberNights, setNumberNights] = useState(0)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const user = useStoreState(state => state.user.user)

  const openLogin = useStoreActions(actions => actions.modals.openLogin)

  const canBook = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/flats/check',
        { flatId: flat.id, startDate, endDate }
      )
      if (response.data.message === 'unavailable') return false
      return true
    } catch (error) {
      alert(error.toString())
    }
  }

  const book = async () => {
    const available = await canBook()
    if (!available) {
      alert('These dates are not valid (busy in between)')
      return
    }
    try {
      // const payload = { flatId: flat.id, startDate, endDate }
      const response = await axios.post(
        'http://localhost:3000/api/flats/book',
        { flatId: flat.id, startDate, endDate }
      )
      if (response.data.status === 'error') {
        alert(response.data.message)
        return
      }
    } catch (error) {
      alert(error.toString())
    }
  }

  return (
    <Layout>
      <Flex display={['block', 'flex']}>
        <Head>
          <title>{flat.title}</title>
        </Head>
        <Box width={[1, 1 / 2, 3 / 5]}>
          <FlatComponent {...flat} route='flats' />
        </Box>
        <Box mx={[0, 3]} width={[1, 1 / 2, 2 / 5]}>
          <DateRangePicker
            datesChanged={(startDate, endDate) => {
              setNumberNights(differenceInCalendarDays(endDate, startDate))
              setDateChosen(true)
              setStartDate(startDate)
              setEndDate(endDate)
            }}
            bookedDates={flat.bookedDates}
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
                {user ? (
                  <Button
                    mt={2}
                    width={1}
                    onClick={book}
                  >
                    Book
                  </Button>
                ) : (
                  <Button mt={2} width={1} onClick={openLogin}>
                    Log in to book
                  </Button>
                )}
              </Card>
            )
          }
        </Box>
      </Flex>
    </Layout>
  )
}

Flat.getInitialProps = async ({ query: { id } }) => {
  const res = await fetch(`http://localhost:3000/api/flats/${id}`)
  const flat = await res.json()
  const bookedDates = await getBookedDates(id)
  flat.bookedDates = bookedDates
  return { flat }
}

export default Flat
