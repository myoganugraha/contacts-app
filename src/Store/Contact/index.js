import {buildSlice} from '@thecodingmachine/redux-toolkit-wrapper';
import FetchAllContacts from './FetchAllContacts';
import AddContact from './AddContact';
import FetchContactDetails from './FetchContactDetails';
import ResetContactDetails from './ResetContactDetails';
import UpdateContactData from './UpdateContactData';
import RemoveContact from './RemoveContact';

const sliceInitialState = {
  item: [],
  addContact: null,
  contactDetails: null,
  updateContactData: null,
};

export default buildSlice(
  'contact',
  [
    AddContact,
    FetchAllContacts,
    FetchContactDetails,
    ResetContactDetails,
    UpdateContactData,
    RemoveContact,
  ],
  sliceInitialState,
).reducer;
