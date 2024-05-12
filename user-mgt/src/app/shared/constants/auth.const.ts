export const PERMISSIONS = {
  menuDashboard: 'MENU_DASHBOARD',
  menuUserMgt: 'MENU_USER_MGT',
  menuReports: 'MENU_REPORTS',
  menuAssignUsers: 'MENU_ASSIGN_USERS',
  menuIssueTickets: 'MENU_ISSUE_TICKETS',
  subMenuRedeemHistory: 'SUB_MENU_REPORTS_REDEEM_HISTORY',
  subMenuMonitoringReport: 'SUB_MENU_REPORTS_MONITORING',
  subMenuTransactionReport: 'SUB_MENU_REPORTS_PAYMENT_TRANSACTION',
  subMenuReconciliationReport: 'SUB_MENU_REPORTS_RECONCILIATION',
  subMenuFinanceReport: 'SUB_MENU_REPORTS_FINANCE',
  subMenuManifestReport: 'SUB_MENU_REPORTS_MANIFEST',
  subMenuViewUser: 'SUB_MENU_USER_MGT_VIEW_USER',
  subMenuUserProfile: 'SUB_MENU_USER_MGT_USER_PROFILE',
  subMenuAssignCounter: 'SUB_MENU_ASSIGN_USERS_COUNTER',
  subMenuAssignGate: 'SUB_MENU_ASSIGN_USERS_GATE',
  subMenuStandGates: 'SUB_MENU_ASSIGN_USERS_STAND_GATES',
  subMenuFreeScanGates: 'SUB_MENU_ASSIGN_USERS_FREE_SCAN_GATES',
  subMenuIssueWalkIn: 'SUB_MENU_ISSUE_TICKETS_WALK-IN',
  subMenuIssueCredit: 'SUB_MENU_ISSUE_TICKETS_CREDIT',
  subMenuIssueComplimentary: 'SUB_MENU_ISSUE_TICKETS_COMPLIMENTARY',
  subMenuIssueCounterRecords: 'SUB_MENU_ISSUE_COUNTER_RECORDS',
};

export const MENU_ROUTE_MAP: Map<string, string> = new Map<string, string>([
  ['MENU_DASHBOARD', 'secure/dashboard'],
  ['MENU_USER_MGT', 'secure/user-management']
]);

export const MENU_PERM_PREFIX = 'MENU';
export const SUB_MENU_REPORTS_PREFIX = 'SUB_MENU_REPORTS';
export const SUB_MENU_ASSIGN_USERS_PREFIX = 'SUB_MENU_ASSIGN_USERS';
export const SUB_MENU_ISSUE_TICKETS_PREFIX = 'SUB_MENU_ISSUE_TICKETS';
export const SUB_MENU_USER_MGT_PREFIX = 'SUB_MENU_USER_MGT';
export const ROUTE_DASHBOARD = 'secure/dashboard';
export const ROUTE_CREATED_USER = 'secure/user-management/create';
export const ROUTE_FORBIDDEN = 'secure/forbidden';
export const ROUTE_LOGIN = 'public/login';
export const LOGIN_API_PATH = '/user/login';
export const REFRESH_API_PATH = '/user/refresh';
export const DEFAULT_MENU = 'dashboard';
