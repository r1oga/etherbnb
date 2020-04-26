import { useState } from 'react'
import Router from 'next/router'
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

export default props => {
  const [title, setTitle] = useState(props.title || '')
  const [town, setTown] = useState(props.town || '')
  const [nightPrice, setNightPrice] = useState(props.nightPrice || 0)
  const [picture, setPicture] = useState(props.picture || '')
  const [description, setDescription] = useState(props.description || '')
  const [guests, setGuests] = useState(props.guests || 0)
  const [bedrooms, setBedrooms] = useState(props.bedrooms || 0)
  const [beds, setBeds] = useState(props.beds || 0)
  const [bathrooms, setBathrooms] = useState(props.bathrooms || 0)
  const [wifi, setWifi] = useState(props.wifi || false)
  const [kitchen, setKitchen] = useState(props.kitchen || false)
  const [airConditioning, setAirConditioning] = useState(props.airConditioning || false)
  const [freeParking, setFreeParking] = useState(props.freeParking || false)
  const [entirePlace, setEntirePlace] = useState(props.entirePlace || false)
  const [type, setType] = useState(props.type || 'Flat')

  const types = ['House', 'Flat']

  const flat = {
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

  const onSubmit = async event => {
    event.preventDefault()
    try {
      const response = await axios.post('/api/host/new', { flat })

      if (response.data.status === 'error') {
        alert(response.data.message)
        return
      }
      Router.push('/host')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Form onSubmit={onSubmit}>
      <Heading.h2>
        {props.edit ? <>Edit flat</> : <>Add a new flat</>}
      </Heading.h2>
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
            placeholder='# guests'
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
      <Flex justifyContent='space-between'>
        <Field label='Bedrooms' maxWidth='200px' mr={1}>
          <Input
            value={bedrooms}
            type='number'
            required
            placeholder='# bedrooms'
            width={1}
            onChange={event => setBedrooms(event.target.value)}
          />
        </Field>
        <Field label='Beds' maxWidth='200px' mr={1}>
          <Input
            value={beds}
            type='number'
            required
            placeholder='# beds'
            width={1}
            onChange={event => setBeds(event.target.value)}
          />
        </Field>
        <Field label='Bathrooms' maxWidth='200px' mr={1}>
          <Input
            value={bathrooms}
            type='number'
            required
            placeholder='# bathrooms'
            width={1}
            onChange={event => setBathrooms(event.target.value)}
          />
        </Field>
        <Field label='Type' maxWidth='200px'>
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
      </Flex>
      <Flex flexWrap='wrap' justifyContent='space-around' className='checkboxes'>
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
      <Button type='submit' width={1}>{props.edit ? 'Update' : 'Add'}</Button>
    </Form>
  )
}
