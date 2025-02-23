// store/index.js
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter'

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // 关闭序列化检查
    })
})