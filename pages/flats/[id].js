import * as _ from 'lodash'
import Head from 'next/head'

import flats from '../flats.json'
import Layout from '../../components/Layout'
import FlatComponent from '../../components/Flat'

const Flat = ({ flat }) => (
  <Layout>
    <Head>
      <title>{flat.title}</title>
    </Head>
    <FlatComponent {...flat} />
  </Layout>
)

Flat.getInitialProps = ({ query: { id } }) => {
  return { flat: _.filter(flats, ['id', id])[0] }
}

export default Flat
