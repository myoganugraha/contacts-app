import {
    buildAsyncState,
    buildAsyncReducers,
    buildAsyncActions,
  } from '@thecodingmachine/redux-toolkit-wrapper'
  import updateContactDataService from '@/Services/Contact/UpdateContactData'
  
  export default {
    initialState: buildAsyncState('updateContactData'),
    action: buildAsyncActions('contact/updateContactData', updateContactDataService),
    reducers: buildAsyncReducers({
      itemKey: 'updateContactData',
      errorKey: 'updateContactData.error', // Optionally, if you scoped variables, you can use a key with dot notation
      loadingKey: 'updateContactData.loading',
    }),
  }
  