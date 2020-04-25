import Link from 'next/link'
import RateReviewIcon from '@material-ui/icons/RateReview'
import {
  Link as LinkRimble,
  Card,
  Image,
  Box,
  Heading,
  Flex,
  Text,
  Button
} from 'rimble-ui'

const Booking = ({ booking, flat }) => {
  return (
    <Card
      width='auto'
      maxWidth='700px'
      mx='auto'
      mb={2}
      p={0}
      borderRadius={8}
    >
      <Box px={[3, 3, 4]}>
        <Link href='/flats/[id]' as={`/flats/${flat.id}`}>
          <LinkRimble>
            <Heading.h4 color='#666' my={2}>
              {flat.title}
            </Heading.h4>
          </LinkRimble>
        </Link>
      </Box>
      <Box
        px={[3, 3, 4]}
        py={2}
        borderTop={1}
        borderColor='#E8E8E8'
      >
        <p>From{' '}{new Date(booking.booking.startDate).toDateString()}</p>
        <p>To{' '}{new Date(booking.booking.endDate).toDateString()}</p>
      </Box>
    </Card>
  )
}

export default Booking
