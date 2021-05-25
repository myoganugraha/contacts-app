import {
    buildAsyncState,
    buildAsyncReducers,
    buildAsyncActions,
  } from '@thecodingmachine/redux-toolkit-wrapper'
  import addContactService from '@/Services/Contact/AddContact'
  
  export default {
    initialState: buildAsyncState('addContact'),
    action: buildAsyncActions('contact/addContact', addContactService),
    reducers: buildAsyncReducers({
      itemKey: 'addContact',
      errorKey: 'addContact.error', // Optionally, if you scoped variables, you can use a key with dot notation
      loadingKey: 'addContact.loading',
    }),
  }
  