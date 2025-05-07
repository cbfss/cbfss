import React, { lazy } from 'react';


const NationalityManagement = lazy(() => import('../../pages/customer-data/nationality'));
const TaxCategoryManagement = lazy(() => import('../../pages/customer-data/tax-category'));
const OccupationManagement = lazy(() => import('../../pages/customer-data/occupation'));
const ContactTypeManagement = lazy(() => import('../../pages/customer-data/contact-type'));
const CustomerStatusManagement = lazy(() => import('../../pages/customer-data/customer-status'));
const AddressTypeManagement = lazy(() => import('../../pages/customer-data/address-type'));
const RelationshipManagement = lazy(() => import('../../pages/customer-data/relationship'));
const LanguageManagement = lazy(() => import('../../pages/customer-data/language'));

const customerDataRoutes = [
  {
    path: '/customer-data/nationality',
    element: <NationalityManagement />,
    title: 'Nationality Master Data'
  },
  {
    path: '/customer-data/tax',
    element: <TaxCategoryManagement />,
    title: 'Tax Master Data'
  },
  {
    path: '/customer-data/occupation',
    element: <OccupationManagement />,
    title: 'Occupation Master Data'
  },
  {
    path: '/customer-data/contact-type',
    element: <ContactTypeManagement />,
    title: 'Contact Type Master Data'
  },
  {
    path: '/customer-data/status',
    element: <CustomerStatusManagement />,
    title: 'Customer Status Master Data'
  },
  {
    path: '/customer-data/address-type',
    element: <AddressTypeManagement />,
    title: 'Address Type Master Data'
  },
  {
    path: '/customer-data/relationship',
    element: <RelationshipManagement />,
    title: 'Relationship Master Data'
  },
  {
    path: '/customer-data/language',
    element: <LanguageManagement />,
    title: 'Supported Languages'
  }
];

export default customerDataRoutes;