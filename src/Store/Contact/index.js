import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchAllContacts from './FetchAllContacts'

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: [],
}

export default buildSlice('contact', [FetchAllContacts], sliceInitialState).reducer