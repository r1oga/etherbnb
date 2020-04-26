import axios from 'axios'
import Layout from '../../components/Layout'
import FlatForm from '../../components/FlatForm'

const EditFlat = ({ flat }) => {
  // console.log(flat)
  return (
    <Layout>
      <FlatForm {...flat} edit />
    </Layout>

  )
}

EditFlat.getInitialProps = async ({ query }) => {
  const { id } = query
  const response = await axios.get(`http://localhost:3000/api/flats/${id}`)

  return {
    flat: response.data
  }
}

export default EditFlat
