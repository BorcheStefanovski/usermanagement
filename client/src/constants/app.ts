// Config
export const BASE_API_URL = 'http://localhost:3005' as const;

export const REQUEST_METHODS = {
  post: 'POST',
} as const;

export const SERVER_ENDPOINTS = {
  update: '/api/users/update',
  delete: '/api/users/delete',
  read: '/api/users',
  create: '/api/users/add'
} as const;

// User
export const AVAILABLE_ROLES = ['Admin', 'User', 'Guest'] as const;

// UI
export const BUTTON_CONTENT = {
  edit: 'Edit',
  add: 'Add',
  cancel: 'Cancel',
  delete: 'Delete'
} as const;

export const ERROR_MESSAGES = {
  no_user_found: 'No User Found',
  required_field: 'This field is required',
  invalid_email: 'Invalid email format',
  invalid_age: 'Age must be a positive number',
} as const;

export const MODAL_CONFIRMATION_MESSAGE = "Are you sure you want to delete this user?" as const;
