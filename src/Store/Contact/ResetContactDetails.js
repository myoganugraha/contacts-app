import { createAction } from '@reduxjs/toolkit'

export default {
  initialState: {},
  action: createAction('contact/resetContactDetails'),
  reducers(state) {
    state.contactDetails = null
  },
}