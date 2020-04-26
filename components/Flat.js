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

const Flat = ({
  title,
  type,
  picture,
  town,
  id,
  reviewsCount,
  reviews,
  route
}) => {
  return (
    <Card
      width='auto'
      maxWidth='700px'
      mx='auto'
      mb={2}
      p={0}
      borderRadius={8}
    >
      <Link href={`/${route}/[id]`} as={`/${route}/${id}`}>
        <LinkRimble>
          <Image
            width={1}
            src={picture}
            borderRadius={8}
            alt='random image from airbnb'
          />
        </LinkRimble>
      </Link>

      <Box px={[3, 3, 4]}>
        <Heading.h3 my={2}>{title}</Heading.h3>
        <Heading.h5 color='#666' my={2}>{type} - {town}</Heading.h5>
      </Box>
      <Box
        px={[3, 3, 4]}
        py={2}
        borderTop={1}
        borderColor='#E8E8E8'
      >
        {reviewsCount ? (
          <>
            <Heading.h4>{reviewsCount} review(s)</Heading.h4>
            {reviews.map((review, index) => (
              <div key={index}>
                <p>{new Date(review.createdAt).toDateString()}</p>
                <p>{review.comment}</p>
              </div>
            ))}
          </>
        ) : (
          <></>
        )}
      </Box>
    </Card>
  )
}

export default Flat
