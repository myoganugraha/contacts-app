import {
    buildAsyncState,
    buildAsyncReducers,
    buildAsyncActions,
  } from '@thecodingmachine/redux-toolkit-wrapper';
  import removeContactService from '@/Services/Contact/RemoveContact';
  
  export default {
    initialState: buildAsyncState('removeContact'),
    action: buildAsyncActions(
      'contact/removeContact',
      removeContactService,
    ),
    reducers: buildAsyncReducers({
      errorKey: 'removeContact.error', // Optionally, if you scoped variables, you can use a key with dot notation
      loadingKey: 'removeContact.loading',
    }),
  };
  