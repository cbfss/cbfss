src/
├── components/
│   └── common/│       
│       ├── DataTable.jsx
│       └── ... (other reusable components)
│
├── hooks/
│   └── useTheme.js 
│
├── layouts/
│   ├── MainLayout.jsx
│   ├── AuthLayout.jsx
│   └── 
│
├── pages/
│   ├── 
│   │  
│   │
│   ├── customer-data/
│   │   ├── address-type/
│   │   │   ├── components/
│   │   │   │   ├── AddressTypeFilters.jsx
│   │   │   │   ├── InlineAddressTypeForm.jsx
│   │   │   │   └── AddressTypeModal.jsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAddressTypeFilters.js
│   │   │   │   └── useAddressTypeRTK.js
│   │   │   └── AddressTypePage.jsx (main page component)
│   │   │
│   │   │   
│   │   │
│   │   └──
│   │
│   │
├── services/
│   ├── customer/
│   │   ├── addressTypeApi.js
│   │   ├── addressTypeService.js
│   │   └── ... (other customer-related services)
│   │
│   │
│   └── menu/
│       └── menuService.js
│
├── store/
│   ├── slices/
│   │   ├── customer/
│   │   │   └── addressTypeSlice.js
│   │
│   └── ... (store configuration files)
│
└── router.jsx
