import {
  buildAsyncState,
  buildAsyncReducers,
  buildAsyncActions,
} from '@thecodingmachine/redux-toolkit-wrapper';
import fetchContactDetailsService from '@/Services/Contact/FetchContactDetails';

export default {
  initialState: buildAsyncState('fetchContactDetails'),
  action: buildAsyncActions(
    'contact/fetchContactDetails',
    fetchContactDetailsService,
  ),
  reducers: buildAsyncReducers({
    itemKey: 'contactDetails',
    errorKey: 'fetchContactDetails.error', // Optionally, if you scoped variables, you can use a key with dot notation
    loadingKey: 'fetchContactDetails.loading',
  }),
};
