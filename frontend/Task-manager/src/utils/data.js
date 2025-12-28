/**
 * Static data constants for the Task Manager application
 */

// Task priority options
export const PRIORITY_OPTIONS = [
    { value: 'low', label: 'Low', color: 'text-emerald-500', bgColor: 'bg-emerald-100' },
    { value: 'medium', label: 'Medium', color: 'text-amber-500', bgColor: 'bg-amber-100' },
    { value: 'high', label: 'High', color: 'text-red-500', bgColor: 'bg-red-100' },
];

// Task status options
export const STATUS_OPTIONS = [
    { value: 'pending', label: 'Pending', color: 'text-amber-700', bgColor: 'bg-amber-100' },
    { value: 'in-progress', label: 'In Progress', color: 'text-blue-700', bgColor: 'bg-blue-100' },
    { value: 'completed', label: 'Completed', color: 'text-emerald-700', bgColor: 'bg-emerald-100' },
];

// User role options
export const ROLE_OPTIONS = [
    { value: 'admin', label: 'Admin' },
    { value: 'member', label: 'Member' },
];

// Sidebar menu items for Admin
export const ADMIN_SIDEBAR_MENU = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/admin/dashboard',
        icon: 'dashboard',
    },
    {
        id: 'tasks',
        label: 'Manage Tasks',
        path: '/admin/tasks',
        icon: 'tasks',
    },
    {
        id: 'create-task',
        label: 'Create Task',
        path: '/admin/create-task',
        icon: 'add',
    },
    {
        id: 'users',
        label: 'Team Members',
        path: '/admin/user',
        icon: 'users',
    },
    {
        id: 'reports',
        label: 'Reports',
        path: '/admin/reports',
        icon: 'reports',
    },
];

// Sidebar menu items for regular users
export const USER_SIDEBAR_MENU = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        path: '/user/dashboard',
        icon: 'dashboard',
    },
    {
        id: 'my-tasks',
        label: 'My Tasks',
        path: '/user/tasks',
        icon: 'tasks',
    },
];

// Dashboard stat card configurations
export const DASHBOARD_STATS_CONFIG = [
    {
        id: 'total',
        title: 'Total Tasks',
        key: 'totalTasks',
        bgGradient: 'from-violet-500 to-purple-600',
        shadowColor: 'shadow-violet-200',
    },
    {
        id: 'inProgress',
        title: 'In Progress',
        key: 'inProgress',
        bgGradient: 'from-blue-500 to-cyan-500',
        shadowColor: 'shadow-blue-200',
    },
    {
        id: 'completed',
        title: 'Completed',
        key: 'completed',
        bgGradient: 'from-emerald-500 to-teal-500',
        shadowColor: 'shadow-emerald-200',
    },
    {
        id: 'pending',
        title: 'Pending',
        key: 'pending',
        bgGradient: 'from-amber-500 to-orange-500',
        shadowColor: 'shadow-amber-200',
    },
];

// Chart color palette
export const CHART_COLORS = {
    primary: '#9400D3',
    secondary: '#6366F1',
    success: '#10B981',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#3B82F6',
    gray: '#6B7280',
};

// Status distribution colors for charts
export const STATUS_CHART_COLORS = {
    completed: '#10B981',
    'in-progress': '#3B82F6',
    pending: '#F59E0B',
};

// Priority distribution colors for charts
export const PRIORITY_CHART_COLORS = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
};

// Date filter options
export const DATE_FILTER_OPTIONS = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
];

// Sort options for tasks
export const TASK_SORT_OPTIONS = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'status', label: 'Status' },
    { value: 'title', label: 'Title (A-Z)' },
];

// Items per page options
export const ITEMS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

// Default pagination settings
export const DEFAULT_PAGINATION = {
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
};

// Empty state messages
export const EMPTY_STATE_MESSAGES = {
    tasks: {
        title: 'No tasks yet',
        description: 'Create your first task to get started',
    },
    users: {
        title: 'No team members',
        description: 'Add team members to start collaborating',
    },
    search: {
        title: 'No results found',
        description: 'Try adjusting your search or filters',
    },
    notifications: {
        title: 'No notifications',
        description: "You're all caught up!",
    },
};

// Task attachment types
export const ALLOWED_FILE_TYPES = {
    images: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    documents: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
    spreadsheets: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
};

// Maximum file size for uploads (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// API response status codes
export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

// Local storage keys
export const STORAGE_KEYS = {
    AUTH_TOKEN: 'token',
    USER_DATA: 'user',
    THEME: 'theme',
    SIDEBAR_COLLAPSED: 'sidebarCollapsed',
};

// Notification types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
};

// Animation durations (in ms)
export const ANIMATION_DURATION = {
    fast: 150,
    normal: 300,
    slow: 500,
};
