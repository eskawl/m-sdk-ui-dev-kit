import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'

import { notificationSlice } from './slices/notification-slice'

export const store = configureStore({
  reducer: {
    notifications: notificationSlice.reducer,
  },
  devTools: true,
})

setupListeners(store.dispatch)
