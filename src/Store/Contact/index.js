import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchAllContacts from './FetchAllContacts'
import AddContact from './AddContact'


const sliceInitialState = {
  item: [],
  addContact: null,
}

export default buildSlice('contact', [AddContact, FetchAllContacts], sliceInitialState).reducer