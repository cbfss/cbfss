// src/services/menu/menuService.js
// Comprehensive menu structure based on the CBFSS user stories

// Mock menu data
const mockMenuItems = [
  {
    id: 1,
    title: "Dashboard",
    icon: "Home",
    href: "/dashboard",
    permissions: ["view_dashboard"]
  },
  {
    id: 2,
    title: "User Management",
    icon: "Users",
    href: "/users",
    permissions: ["view_users", "manage_users"],
    submenu: [
      { id: 21, title: "User List", href: "/users/list", permissions: ["view_users"] },
      { id: 22, title: "User Groups", href: "/users/groups", permissions: ["view_users"] },
      { id: 23, title: "User Roles", href: "/users/roles", permissions: ["manage_users"] },
      { id: 24, title: "User Profiles", href: "/users/profiles", permissions: ["view_users"] },
      { id: 25, title: "User Authentication", href: "/users/authentication", permissions: ["manage_users"] },
      { id: 26, title: "User Security Settings", href: "/users/security", permissions: ["manage_users"] },
      { id: 27, title: "User Status History", href: "/users/status-history", permissions: ["view_users"] },
      { id: 28, title: "User Login History", href: "/users/login-history", permissions: ["view_users"] },
      { id: 29, title: "User Preferences", href: "/users/preferences", permissions: ["view_users"] }
    ]
  },
  {
    id: 3,
    title: "Role Management",
    icon: "Shield",
    href: "/roles",
    permissions: ["view_roles", "manage_roles"],
    submenu: [
      { id: 31, title: "Roles List", href: "/roles/list", permissions: ["view_roles"] },
      { id: 32, title: "Role Hierarchy", href: "/roles/hierarchy", permissions: ["view_roles"] },
      { id: 33, title: "Role Permissions", href: "/roles/permissions", permissions: ["manage_roles"] },
      { id: 34, title: "Module Master", href: "/roles/modules", permissions: ["manage_roles"] },
      { id: 35, title: "Role Attributes", href: "/roles/attributes", permissions: ["manage_roles"] },
      { id: 36, title: "Role Security", href: "/roles/security", permissions: ["manage_roles"] },
      { id: 37, title: "Role History", href: "/roles/history", permissions: ["view_roles"] },
      { id: 38, title: "Role Workflows", href: "/roles/workflows", permissions: ["manage_roles"] }
    ]
  },
  {
    id: 4,
    title: "Organization Management",
    icon: "Briefcase",
    href: "/organization",
    permissions: ["view_organization", "manage_organization"],
    submenu: [
      { id: 41, title: "Organization Units", href: "/organization/units", permissions: ["view_organization"] },
      { id: 42, title: "Organization Roles", href: "/organization/roles", permissions: ["view_organization"] },
      { id: 43, title: "Organization Users", href: "/organization/users", permissions: ["view_organization"] },
      { id: 44, title: "Organization Permissions", href: "/organization/permissions", permissions: ["manage_organization"] },
      { id: 45, title: "Organization Unit Types", href: "/organization/unit-types", permissions: ["manage_organization"] },
      { id: 46, title: "Organization Hierarchy", href: "/organization/hierarchy", permissions: ["view_organization"] },
      { id: 47, title: "Organization Workflows", href: "/organization/workflows", permissions: ["manage_organization"] },
      { id: 48, title: "Organization Logs", href: "/organization/logs", permissions: ["view_organization"] },
      { id: 49, title: "Organization Documents", href: "/organization/documents", permissions: ["view_organization"] }
    ]
  },
  // {
  //   id: 5,
  //   title: "Customer Management",
  //   icon: "UserCheck",
  //   href: "/customer",
  //   permissions: ["view_customers", "manage_customers"],
  //   submenu: [
  //     { id: 51, title: "Lead Management", href: "/customer/leads", permissions: ["view_customers"] },
  //     { id: 52, title: "Customers", href: "/customer/list", permissions: ["view_customers"] },
  //     { id: 53, title: "Addresses", href: "/customer/addresses", permissions: ["view_customers"] },
  //     { id: 54, title: "Contact Persons", href: "/customer/contacts", permissions: ["view_customers"] },
  //     { id: 55, title: "Lead Status History", href: "/customer/lead-status", permissions: ["view_customers"] },
  //     { id: 56, title: "Lead Scoring Rules", href: "/customer/lead-scoring", permissions: ["manage_customers"] },
  //     { id: 57, title: "Lead Interactions", href: "/customer/lead-interactions", permissions: ["view_customers"] },
  //     { id: 58, title: "Customer Accounts", href: "/customer/accounts", permissions: ["view_customers"] },
  //     { id: 59, title: "Entity Notes", href: "/customer/notes", permissions: ["view_customers"] },
  //     { id: 510, title: "Customer Categories", href: "/customer/categories", permissions: ["manage_customers"] },
  //     { id: 511, title: "Customer Payment Methods", href: "/customer/payment-methods", permissions: ["view_customers"] },
  //     { id: 512, title: "Customer Nominees", href: "/customer/nominees", permissions: ["view_customers"] },
  //     { id: 513, title: "Credit History", href: "/customer/credit-history", permissions: ["view_customers"] },
  //     { id: 514, title: "Customer Relationships", href: "/customer/relationships", permissions: ["view_customers"] },
  //     { id: 515, title: "Customer Audit Log", href: "/customer/audit-log", permissions: ["view_customers"] },
  //     { id: 516, title: "Customer Preferences", href: "/customer/preferences", permissions: ["view_customers"] },
  //     { id: 517, title: "Customer Interactions", href: "/customer/interactions", permissions: ["view_customers"] },
  //     { id: 518, title: "Customer Documents", href: "/customer/documents", permissions: ["view_customers"] },
  //     { id: 519, title: "Customer Feedback", href: "/customer/feedback", permissions: ["view_customers"] },
  //     { id: 520, title: "Loyalty Points", href: "/customer/loyalty", permissions: ["view_customers"] }
  //   ]
  // },
  {
    id: 6,
    title: "Customer Master Data",
    icon: "Database",
    href: "/customer-data",
    permissions: ["view_customer_data"],
    submenu: [
      { id: 61, title: "Salutation Types", href: "/customer-data/salutation-types", permissions: ["view_customer_data"] },
      { id: 62, title: "Nationality Master Data", href: "/customer-data/nationality", permissions: ["view_customer_data"] },
      { id: 63, title: "Customer Categories", href: "/customer-data/categories", permissions: ["view_customer_data"] },
      { id: 64, title: "Tax Categories", href: "/customer-data/tax", permissions: ["view_customer_data"] },
      { id: 65, title: "Occupation Master", href: "/customer-data/occupation", permissions: ["view_customer_data"] },
      { id: 66, title: "Contact Type Master", href: "/customer-data/contact-type", permissions: ["view_customer_data"] },
      { id: 67, title: "Customer Status Master", href: "/customer-data/status", permissions: ["view_customer_data"] },
      { id: 68, title: "Address Type Master", href: "/customer-data/address-type", permissions: ["view_customer_data"] },
      { id: 69, title: "Relationship Master", href: "/customer-data/relationship", permissions: ["view_customer_data"] },
      { id: 610, title: "Language", href: "/customer-data/language", permissions: ["view_customer_data"] }
    ]
  },
  {
    id: 7,
    title: "Loan Origination",
    icon: "FileText",
    href: "/loan-origination", 
    permissions: ["view_loan_origination"],
    submenu: [
      { id: 71, title: "Gold Loan Request", href: "/loan-origination/gold-request", permissions: ["view_loan_origination"] },
      { id: 72, title: "Customer Details Entry", href: "/loan-origination/customer-details", permissions: ["view_loan_origination"] },
      { id: 73, title: "Collateral Details", href: "/loan-origination/collateral", permissions: ["view_loan_origination"] },
      { id: 74, title: "Document Verification", href: "/loan-origination/documents", permissions: ["view_loan_origination"] },
      { id: 75, title: "Eligibility Calculation", href: "/loan-origination/eligibility", permissions: ["view_loan_origination"] },
      { id: 76, title: "Approval Workflow", href: "/loan-origination/approval", permissions: ["view_loan_origination"] },
      { id: 77, title: "Loan Sanction", href: "/loan-origination/sanction", permissions: ["view_loan_origination"] },
      { id: 78, title: "Disbursement", href: "/loan-origination/disbursement", permissions: ["view_loan_origination"] }
    ]
  },
  {
    id: 8,
    title: "Loan Management",
    icon: "DollarSign",
    href: "/loans", 
    permissions: ["view_loan_data"],
    submenu: [
      { id: 81, title: "Loan Categories", href: "/loans/categories", permissions: ["view_loan_data"] },
      { id: 82, title: "Loan Product Master", href: "/loans/products", permissions: ["view_loan_data"] },
      { id: 83, title: "Loan Purpose Master", href: "/loans/purpose", permissions: ["view_loan_data"] },
      { id: 84, title: "Loan Schemes", href: "/loans/schemes", permissions: ["view_loan_data"] },
      { id: 85, title: "Interest Rate Slabs", href: "/loans/interest-rates", permissions: ["view_loan_data"] },
      { id: 86, title: "Repayment Tracking", href: "/loans/repayment", permissions: ["view_loan_data"] },
      { id: 87, title: "Loan Closure", href: "/loans/closure", permissions: ["view_loan_data"] },
      { id: 88, title: "Re-pledge/Top-up", href: "/loans/re-pledge", permissions: ["view_loan_data"] },
      { id: 89, title: "Loan Restructuring", href: "/loans/restructuring", permissions: ["view_loan_data"] },
      { id: 810, title: "Loan Reports", href: "/loans/reports", permissions: ["view_loan_data"] }
    ]
  },
  {
    id: 9,
    title: "Gold Loan Parameters",
    icon: "Award",
    href: "/gold-loan",
    permissions: ["view_gold_loan"],
    submenu: [
      { id: 91, title: "Daily Gold Rate Master", href: "/gold-loan/rates", permissions: ["view_gold_loan"] },
      { id: 92, title: "Carat Master Data", href: "/gold-loan/carat", permissions: ["view_gold_loan"] },
      { id: 93, title: "Ornament Master Data", href: "/gold-loan/ornament", permissions: ["view_gold_loan"] }
    ]
  },
  {
    id: 10,
    title: "Auction Management",
    icon: "Truck",
    href: "/auction",
    permissions: ["view_auction"],
    submenu: [
      { id: 101, title: "Auction Setup", href: "/auction/setup", permissions: ["view_auction"] },
      { id: 102, title: "Bid Management", href: "/auction/bids", permissions: ["view_auction"] },
      { id: 103, title: "Auction Closing", href: "/auction/closing", permissions: ["view_auction"] },
      { id: 104, title: "Payment & Settlement", href: "/auction/payment", permissions: ["view_auction"] },
      { id: 105, title: "Auction Reports", href: "/auction/reports", permissions: ["view_auction"] },
      { id: 106, title: "Dispute Resolution", href: "/auction/disputes", permissions: ["view_auction"] }
    ]
  },
  {
    id: 11,
    title: "Liability Management",
    icon: "FileText",
    href: "/liability",
    permissions: ["view_liability"],
    submenu: [
      { id: 111, title: "Product Management", href: "/liability/products", permissions: ["view_liability"] },
      { id: 112, title: "Scheme Management", href: "/liability/schemes", permissions: ["view_liability"] },
      { id: 113, title: "Interest Management", href: "/liability/interest", permissions: ["view_liability"] },
      { id: 114, title: "Application Management", href: "/liability/applications", permissions: ["view_liability"] },
      { id: 115, title: "Realization & Allotment", href: "/liability/realization", permissions: ["view_liability"] }
    ]
  },
  {
    id: 12,
    title: "Financial Accounting",
    icon: "BarChart2",
    href: "/accounting",
    permissions: ["view_accounting"],
    submenu: [
      { id: 121, title: "General Ledger", href: "/accounting/ledger", permissions: ["view_accounting"] },
      { id: 122, title: "Chart of Accounts", href: "/accounting/coa", permissions: ["view_accounting"] },
      { id: 123, title: "Accounts Payable", href: "/accounting/payable", permissions: ["view_accounting"] },
      { id: 124, title: "Accounts Receivable", href: "/accounting/receivable", permissions: ["view_accounting"] },
      { id: 125, title: "Bank Reconciliation", href: "/accounting/reconciliation", permissions: ["view_accounting"] },
      { id: 126, title: "Financial Reports", href: "/accounting/reports", permissions: ["view_accounting"] },
      { id: 127, title: "Budgeting & Forecasting", href: "/accounting/budgeting", permissions: ["view_accounting"] },
      { id: 128, title: "Tax Management", href: "/accounting/tax", permissions: ["view_accounting"] },
      { id: 129, title: "Multi-Currency Support", href: "/accounting/currency", permissions: ["view_accounting"] }
    ]
  },
  {
    id: 13,
    title: "Audit Management",
    icon: "CheckSquare",
    href: "/audit",
    permissions: ["view_audit"],
    submenu: [
      { id: 131, title: "Auditor Onboarding", href: "/audit/auditors", permissions: ["view_audit"] },
      { id: 132, title: "Auditor Assignment", href: "/audit/assignments", permissions: ["view_audit"] },
      { id: 133, title: "Audit Plans", href: "/audit/plans", permissions: ["view_audit"] },
      { id: 134, title: "Audit Schedule", href: "/audit/schedule", permissions: ["view_audit"] },
      { id: 135, title: "Audit Checklists", href: "/audit/checklists", permissions: ["view_audit"] },
      { id: 136, title: "Conduct Audit", href: "/audit/conduct", permissions: ["view_audit"] },
      { id: 137, title: "Audit Reports", href: "/audit/reports", permissions: ["view_audit"] },
      { id: 138, title: "Corrective Actions", href: "/audit/actions", permissions: ["view_audit"] },
      { id: 139, title: "Audit Status Tracking", href: "/audit/status", permissions: ["view_audit"] },
      { id: 1310, title: "MIS Reports", href: "/audit/mis", permissions: ["view_audit"] },
      { id: 1311, title: "Auditor Performance", href: "/audit/performance", permissions: ["view_audit"] }
    ]
  },
  {
    id: 14,
    title: "Asset Management",
    icon: "Package",
    href: "/assets",
    permissions: ["view_assets"],
    submenu: [
      { id: 141, title: "Asset Registration", href: "/assets/registration", permissions: ["view_assets"] },
      { id: 142, title: "Asset Classification", href: "/assets/classification", permissions: ["view_assets"] },
      { id: 143, title: "Depreciation & Valuation", href: "/assets/depreciation", permissions: ["view_assets"] },
      { id: 144, title: "Asset Allocation", href: "/assets/allocation", permissions: ["view_assets"] },
      { id: 145, title: "Asset Maintenance", href: "/assets/maintenance", permissions: ["view_assets"] },
      { id: 146, title: "Asset Disposal", href: "/assets/disposal", permissions: ["view_assets"] },
      { id: 147, title: "Asset Audit", href: "/assets/audit", permissions: ["view_assets"] },
      { id: 148, title: "Asset Reports", href: "/assets/reports", permissions: ["view_assets"] }
    ]
  },
  {
    id: 15,
    title: "Settings",
    icon: "Settings",
    href: "/settings",
    permissions: ["view_settings"],
    submenu: [
      { id: 151, title: "System Configuration", href: "/settings/system", permissions: ["view_settings"] },
      { id: 152, title: "Security Settings", href: "/settings/security", permissions: ["view_settings"] },
      { id: 153, title: "Workflow Configuration", href: "/settings/workflow", permissions: ["view_settings"] },
      { id: 154, title: "Notification Settings", href: "/settings/notifications", permissions: ["view_settings"] },
      { id: 155, title: "Audit Logs", href: "/settings/audit-logs", permissions: ["view_settings"] }
    ]
  }
];

export const getMockMenuItems = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockMenuItems;
};