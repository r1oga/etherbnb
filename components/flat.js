import React from 'react'
import Link from 'next/link'

import {
  Card,
  Image,
  Box,
  Heading,
  Flex,
  Text,
  Icon,
  Button
} from 'rimble-ui'

const Flat = ({
  title,
  type,
  picture,
  rating,
  reviewsCount,
  town,
  id
}) => (
  <Link href='/flats/[id]' as={`/flats/${id}`}>
    <a style={{ color: 'inherit', textDecoration: 'none' }}>
      <Card
        width='auto'
        maxWidth='800px'
        mx='auto'
        mb={2}
        p={0}
        borderRadius={8}
      >
        <Image
          width={1}
          src={picture}
          alt='random image from unsplash.com'
        />

        <Box px={[3, 3, 4]}>
          <Heading.h3 my={2}>{title}</Heading.h3>
          <Heading.h5 color='#666' my={2}>{type} - {town}</Heading.h5>
        </Box>

        <Flex
          px={[3, 3, 4]}
          py={2}
          borderTop={1}
          borderColor='#E8E8E8'
        >
          <Box width={1 / 2} display='flex' alignItems='center'>
            <Icon name='RateReview' pr={1} color='primary' />
            <Text>{rating}</Text>
          </Box>
          <Box width={1 / 2} display='flex' alignItems='center'>
            <Text>{reviewsCount} reviews</Text>
          </Box>
        </Flex>
      </Card>
    </a>
  </Link>
)

export default Flat
