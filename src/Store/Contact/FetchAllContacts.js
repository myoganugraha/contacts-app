import {
    buildAsyncState,
    buildAsyncReducers,
    buildAsyncActions,
  } from '@thecodingmachine/redux-toolkit-wrapper'
  import fetchAllContactsService from '@/Services/Contact/FetchAllContacts'
  
  export default {
    initialState: buildAsyncState('fetchAllContacts'),
    action: buildAsyncActions('contact/fetchAllContacts', fetchAllContactsService),
    reducers: buildAsyncReducers({
      errorKey: 'fetchAllContacts.error', // Optionally, if you scoped variables, you can use a key with dot notation
      loadingKey: 'fetchAllContacts.loading',
    }),
  }