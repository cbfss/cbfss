// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import { addressTypeApi } from '../services/customer/addressTypeApi';
import { ornamentApi } from '../services/gold-loan/ornamentApi';
import { standardWeightApi } from '../services/gold-loan/standardWeightApi';
import { customerStatusApi } from '../services/customer/customerStatusApi';
import { relationshipApi } from '../services/customer/relationshipApi';
import { loanCategoryApi } from '../services/loan-management/loanCategoryApi';
import { goldRateApi } from '../services/gold/goldRateApi'; 


const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }).concat([
      addressTypeApi.middleware,
      ornamentApi.middleware,
      standardWeightApi.middleware,
      customerStatusApi.middleware,
      relationshipApi.middleware,
      loanCategoryApi.middleware,
      goldRateApi.middleware,
    ]), 
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;