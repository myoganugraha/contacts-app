import { buildSlice } from '@thecodingmachine/redux-toolkit-wrapper'
import FetchAllContacts from './FetchAllContacts'
import AddContact from './AddContact'
import FetchContactDetails from './FetchContactDetails'

const sliceInitialState = {
  item: [],
  addContact: null,
  contactDetails: null,
}

export default buildSlice('contact', [AddContact, FetchAllContacts, FetchContactDetails], sliceInitialState).reducer