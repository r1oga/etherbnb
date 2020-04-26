import { useState } from 'react'
import Head from 'next/head'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import {
  Box,
  Button,
  Field,
  Flex,
  Form,
  Heading,
  Input,
  Text,
  Textarea,
  Select
} from 'rimble-ui'
import axios from 'axios'

import Layout from '../../components/Layout'

export default () => {
  const [title, setTitle] = useState('')
  const [town, setTown] = useState('')
  const [nightPrice, setNightPrice] = useState(0)
  const [picture, setPicture] = useState('')
  const [description, setDescription] = useState('')
  const [guests, setGuests] = useState(0)
  const [bedrooms, setBedrooms] = useState(0)
  const [beds, setBeds] = useState(0)
  const [bathrooms, setBathrooms] = useState(0)
  const [wifi, setWifi] = useState(false)
  const [kitchen, setKitchen] = useState(false)
  const [airConditioning, setAirConditioning] = useState(false)
  const [freeParking, setFreeParking] = useState(false)
  const [entirePlace, setEntirePlace] = useState(false)
  const [type, setType] = useState('Entire flat')

  const types = ['House', 'Flat']

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/host/new', {
        flat: {
          title,
          town,
          nightPrice,
          picture,
          description,
          guests,
          bedrooms,
          beds,
          bathrooms,
          wifi,
          kitchen,
          airConditioning,
          freeParking,
          entirePlace,
          type
        }
      })

      if (response.data.status === 'error') {
        alert(response.data.message)
        return
      }
      goto('/host')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Layout>
      <Head><title>Add a new flat</title></Head>
      <Form onSubmit={onSubmit}>
        <Heading.h2>Add a new flat</Heading.h2>
        <Flex flexWrap='wrap' justifyContent='space-between'>
          <Field label='Title' maxWidth='300px'>
            <Input
              value={title}
              type='text'
              required
              placeholder='Flat title'
              width={1}
              onChange={event => setTitle(event.target.value)}
            />
          </Field>
          <Field label='Town' maxWidth='300px'>
            <Input
              value={town}
              type='text'
              required
              placeholder='Town'
              width={1}
              onChange={event => setTown(event.target.value)}
            />
          </Field>
          <Field label='Price' maxWidth='300px'>
            <Input
              value={nightPrice}
              type='number'
              required
              placeholder='Night price'
              width={1}
              onChange={event => setNightPrice(event.target.value)}
            />
          </Field>
          <Field label='Capacity' maxWidth='300px'>
            <Input
              value={guests}
              type='number'
              required
              placeholder='Number of guests'
              width={1}
              onChange={event => setGuests(event.target.value)}
            />
          </Field>
        </Flex>
        <Field label='Picture' width={1}>
          <Input
            value={picture}
            type='text'
            required
            placeholder='Picture URL'
            width={1}
            onChange={event => setPicture(event.target.value)}
          />
        </Field>
        <Field label='Description' width={1}>
          <textarea
            rows={4}
            value={description}
            required
            placeholder='Description'
            onChange={event => setDescription(event.target.value)}
          />
        </Field>
        <Flex>
          <Field label='Number of bedrooms' width={1} mr={1}>
            <Input
              value={bedrooms}
              type='number'
              required
              placeholder='Number of bedrooms'
              width={1}
              onChange={event => setBedrooms(event.target.value)}
            />
          </Field>
          <Field label='Number of beds' width={1} mr={1}>
            <Input
              value={beds}
              type='number'
              required
              placeholder='Number of beds'
              width={1}
              onChange={event => setBeds(event.target.value)}
            />
          </Field>
          <Field label='Number of bathrooms' width={1}>
            <Input
              value={bathrooms}
              type='number'
              required
              placeholder='Number of bathrooms'
              width={1}
              onChange={event => setBathrooms(event.target.value)}
            />
          </Field>
        </Flex>
        <Flex flexWrap='wrap' justifyContent='space-between' className='checkboxes'>
          <FormControlLabel
            control={
              <Checkbox
                checked={wifi}
                onChange={event => setWifi(!wifi)}
                name='wifi'
                color='primary'
              />
            }
            label='WLAN'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={kitchen}
                onChange={event => setKitchen(!kitchen)}
                name='kitchen'
                color='primary'
              />
            }
            label='Kitchen'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={airConditioning}
                onChange={event => setAirConditioning(!airConditioning)}
                name='airConditioning'
                color='primary'
              />
            }
            label='Air conditioning'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={freeParking}
                onChange={event => setFreeParking(!freeParking)}
                name='freeParking'
                color='primary'
              />
            }
            label='Free parking'
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={entirePlace}
                onChange={event => setEntirePlace(!entirePlace)}
                name='entirePlace'
                color='primary'
              />
            }
            label='Entire place'
          />
        </Flex>
        <Field label='Type'>
          <select
            onChange={event => setType(event.target.value)}
            value={type}
            required
          >
            {types.map((item, key) => (
              <option value={item} key={key}>
                {item}
              </option>
            ))}
          </select>
        </Field>
        <Button type='submit' width={1}>Add</Button>
      </Form>
    </Layout>
  )
}
