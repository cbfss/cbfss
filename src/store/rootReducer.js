// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';

// Import API slices
import { addressTypeApi } from '../services/customer/addressTypeApi';
import { goldRateApi } from '../services/gold/goldRateApi';

// UI reducers
import sidebarReducer from './slices/ui/sidebarSlice';
import menuReducer from './slices/ui/menuSlice';

// Customer data reducers
import nationalityReducer from './slices/customer/nationalitySlice';
import taxCategoryReducer from './slices/customer/taxCategorySlice';
import occupationReducer from './slices/customer/occupationSlice';
import themeReducer from './slices/themeSlice';
import contactTypeReducer from './slices/customer/contactTypeSlice';
import customerStatusReducer from './slices/customer/customerStatusSlice';
import addressTypeReducer from './slices/customer/addressTypeSlice'; // Now only UI state
import relationshipReducer from './slices/customer/relationshipSlice';
import languageReducer from './slices/customer/languageSlice';

// Loan reducers
import loanCategoryReducer from './slices/loan-management/loanCategorySlice';

// Gold reducers
import goldRateUIReducer from './slices/gold/goldRateSlice';

// Dashboard reducers
import dashboardReducer from './slices/dashboard/dashboardSlice';
import ornamentReducer from './slices/gold-loan/ornamentSlice';
import { ornamentApi } from '../services/gold-loan/ornamentApi';
import ornamentUIReducer from './slices/gold-loan/ornamentSlice';
import standardWeightReducer from './slices/gold-loan/standardWeightSlice';
import customerStatusUIReducer from './slices/customer/customerStatusSlice';
import { customerStatusApi } from '../services/customer/customerStatusApi';
import { relationshipApi } from '../services/customer/relationshipApi';
import relationshipUIReducer from './slices/customer/relationshipSlice';
import { loanCategoryApi } from '../services/loan-management/loanCategoryApi';
import loanCategoryUIReducer from './slices/loan-management/loanCategorySlice';



const rootReducer = combineReducers({
  // Add RTK Query API reducers
  [addressTypeApi.reducerPath]: addressTypeApi.reducer,
  [ornamentApi.reducerPath]: ornamentApi.reducer,
  [customerStatusApi.reducerPath]: customerStatusApi.reducer,
  [relationshipApi.reducerPath]: relationshipApi.reducer,
  [loanCategoryApi.reducerPath]: loanCategoryApi.reducer,
  [goldRateApi.reducerPath]: goldRateApi.reducer, 
  
  loanCategoryUI: loanCategoryUIReducer,



  ornamentUI: ornamentReducer,
  customerStatusUI: customerStatusUIReducer,
  relationshipUI: relationshipUIReducer,
  goldRateUI: goldRateUIReducer,

  sidebar: sidebarReducer,
  menu: menuReducer,

  nationality: nationalityReducer,
  taxCategory: taxCategoryReducer,
  occupation: occupationReducer,
  relationshipUI: relationshipUIReducer,
  theme: themeReducer,
  contactType: contactTypeReducer,
  customerStatus: customerStatusReducer,
  addressTypeUI: addressTypeReducer, // Renamed to indicate it's only UI state
  relationship: relationshipReducer,
  language: languageReducer,
  standardWeightUI: standardWeightReducer,
  loanCategory: loanCategoryReducer,
  // goldRate: goldRateReducer,
  dashboard: dashboardReducer
});

export default rootReducer;