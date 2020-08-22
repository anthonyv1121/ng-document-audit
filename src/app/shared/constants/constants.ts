import { environment } from '../../../environments/environment';

// GENERAL
export const APP_TITLE = "VOTE DOCUMENTS";

// API
export const API_URL = environment.apiUrl;

// GENERAL API ERROR MSG
export const ERROR_MSG = 'Problem with the service. Please try again later.';

// Paths
export const ROOT_PATH = 'dashboard';
export const QUEUE_PATH = 'queue';
export const CASE_PATH ='case';
export const URL_PARAMS = {
    1: 'category',
    2: 'status',
    3: 'name'
}
// TABULATOR NAMES
export const TABULATOR_NAMES = ['urgent', 'non-urgent', 'unclassified'];
export const DEFAULT_TABULATOR = TABULATOR_NAMES[0]

// PRIORITY TYPES
export const PRIORITY_TYPES = ['new', 'audit'];
export const PRIORITY_TYPES_UI_NAMES = [{"new": "NEW/REJECTED"}, {"audit":"READY FOR AUDIT"}]
export const DEFAULT_PRIORITY = PRIORITY_TYPES[0];

// CATEGORIES
export const CATEGORIES = ['urgent', 'non-urgent', 'unclassified'];
export const DEFAULT_CATEGORY = CATEGORIES[0]

// BREADCRUMB COMPONENT
export const REJECTED_LABEL = "(Rejected)";


// QUEUE STATUS
export const QUEUE_TYPES = ['new-rejected', 'ready-for-audit'];
export const DEFAULT_QUEUE = 'new-rejected';

// QUEUE COMPONENT
export const QUEUE_TABLE_COLS = ['id', 'description', 'cards', 'status', 'actions'];

// CASE COMPONENT
export const CASE_TABLE_COLS = ['meetingId', 'issuer', 'date', 'cards', 'actions'];

// TRACKING
export const TRACKING_TITLE = "Tracking Information";
export const TRACKING_SELECT_TEXT = "Select Tracking Method";
export const TRACKING_INPUT_TEXT = "Enter Tracking Reference";
export const TRACKING_REFERENCE_OPTIONS = ["post", "fax", "email"];
export const TRACKING_REFERENCE_MIN_LENGTH = 7;

// MESSAGE CENTER
export const MESSAGE_CENTER_TITLE = "Notes";
export const MESSAGE_CENTER_TABLE_COLS = ["date", "user", "note"];

// VIEW CARD MODAL
export const VIEW_CARDS_MODAL_SIZE = {height: '510px', width:'900px'}
export const VIEW_CARDS_TABLE_COLS = ["id", "nominee", "ownerCode", "ownerAccount"]

// SUBMIT FOR AUDIT MODAL
export const SUBMIT_AUDIT_MODAL_SIZE = {height: '345px', width:'485px'}
export const SUBMIT_AUDIT_MODAL_HEADER = "CONFIRM FOR AUDIT";
export const NO_TRACKING_APPLIED_MSG = "You have not added tracking information."
export const CONFIRM_FOR_AUDIT_MSG = "Are you sure you want to confirm for audit?";
export const AUDIT_SUCESS_MSG = "All Items Are Ready For Audit!";
export const REDIRECT_MSG = "You will now be redirected to the dashboard.";

// APPROVE AUDIT MODAL
export const APPROVE_AUDIT_MODAL_SIZE = {height: '300px', width:'485px'}