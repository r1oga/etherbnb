import * as _ from 'lodash'

import flats from '../flats.json'
import FlatComponent from '../../components/flat'
const Flat = ({ flat }) => <FlatComponent {...flat} />

Flat.getInitialProps = ({ query: { id } }) => {
  return { flat: _.filter(flats, ['id', id])[0] }
}

export default Flat
