import * as _ from 'lodash'
import Head from 'next/head'

import flats from '../flats.json'
import FlatComponent from '../../components/flat'

const Flat = ({ flat }) => (
  <>
    <Head>
      <title>{flat.title}</title>
    </Head>
    <FlatComponent {...flat} />
  </>
)

Flat.getInitialProps = ({ query: { id } }) => {
  return { flat: _.filter(flats, ['id', id])[0] }
}

export default Flat
