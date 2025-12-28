/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email format
 */
export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Object with isValid and message
 */
export const validatePassword = (password) => {
    if (password.length < 8) {
        return { isValid: false, message: 'Password must be at least 8 characters long' };
    }
    if (!/[A-Z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one uppercase letter' };
    }
    if (!/[a-z]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one lowercase letter' };
    }
    if (!/[0-9]/.test(password)) {
        return { isValid: false, message: 'Password must contain at least one number' };
    }
    return { isValid: true, message: 'Password is strong' };
};

/**
 * Get initials from a name
 * @param {string} name - Full name
 * @returns {string} - Initials (e.g., "John Doe" → "JD")
 */
export const getInitials = (name) => {
    if (!name) return '';
    return name
        .split(' ')
        .map(word => word.charAt(0))
        .join('')
        .toUpperCase()
        .slice(0, 2);
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

/**
 * Format date with time
 * @param {string|Date} date - Date to format
 * @returns {string} - Formatted date and time string
 */
export const formatDateTime = (date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to compare
 * @returns {string} - Relative time string
 */
export const getRelativeTime = (date) => {
    if (!date) return '';
    const now = new Date();
    const past = new Date(date);
    const diffMs = now - past;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    if (diffDay < 7) return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    return formatDate(date);
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} - Capitalized string
 */
export const capitalizeFirst = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateText = (text, maxLength = 50) => {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
};

/**
 * Get task priority color classes
 * @param {string} priority - Priority level (low, medium, high)
 * @returns {object} - Object with bg, text, and border classes
 */
export const getPriorityColors = (priority) => {
    const colors = {
        low: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            border: 'border-green-200',
        },
        medium: {
            bg: 'bg-yellow-100',
            text: 'text-yellow-700',
            border: 'border-yellow-200',
        },
        high: {
            bg: 'bg-red-100',
            text: 'text-red-700',
            border: 'border-red-200',
        },
    };
    return colors[priority?.toLowerCase()] || colors.medium;
};

/**
 * Get task status color classes
 * @param {string} status - Task status
 * @returns {object} - Object with bg, text, and border classes
 */
export const getStatusColors = (status) => {
    const colors = {
        pending: {
            bg: 'bg-gray-100',
            text: 'text-gray-700',
            border: 'border-gray-200',
        },
        'in-progress': {
            bg: 'bg-blue-100',
            text: 'text-blue-700',
            border: 'border-blue-200',
        },
        completed: {
            bg: 'bg-green-100',
            text: 'text-green-700',
            border: 'border-green-200',
        },
    };
    return colors[status?.toLowerCase()] || colors.pending;
};

/**
 * Calculate task completion percentage
 * @param {Array} todos - Array of todo items
 * @returns {number} - Completion percentage (0-100)
 */
export const calculateCompletionPercentage = (todos) => {
    if (!todos || todos.length === 0) return 0;
    const completed = todos.filter(todo => todo.completed).length;
    return Math.round((completed / todos.length) * 100);
};

/**
 * Check if a date is overdue
 * @param {string|Date} dueDate - Due date to check
 * @returns {boolean} - True if overdue
 */
export const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    return due < now;
};

/**
 * Check if a date is due soon (within 3 days)
 * @param {string|Date} dueDate - Due date to check
 * @returns {boolean} - True if due soon
 */
export const isDueSoon = (dueDate) => {
    if (!dueDate) return false;
    const now = new Date();
    const due = new Date(dueDate);
    const threeDays = 3 * 24 * 60 * 60 * 1000;
    return due > now && due - now <= threeDays;
};

/**
 * Sort tasks by various criteria
 * @param {Array} tasks - Array of tasks
 * @param {string} sortBy - Sort criteria (dueDate, priority, status, createdAt)
 * @param {string} order - Sort order (asc, desc)
 * @returns {Array} - Sorted tasks
 */
export const sortTasks = (tasks, sortBy = 'createdAt', order = 'desc') => {
    if (!tasks || tasks.length === 0) return [];

    const priorityOrder = { high: 3, medium: 2, low: 1 };
    const statusOrder = { pending: 1, 'in-progress': 2, completed: 3 };

    return [...tasks].sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
            case 'dueDate':
                comparison = new Date(a.dueDate) - new Date(b.dueDate);
                break;
            case 'priority':
                comparison = (priorityOrder[b.priority] || 0) - (priorityOrder[a.priority] || 0);
                break;
            case 'status':
                comparison = (statusOrder[a.status] || 0) - (statusOrder[b.status] || 0);
                break;
            case 'createdAt':
            default:
                comparison = new Date(b.createdAt) - new Date(a.createdAt);
                break;
        }

        return order === 'asc' ? -comparison : comparison;
    });
};

/**
 * Filter tasks by status
 * @param {Array} tasks - Array of tasks
 * @param {string} status - Status to filter by
 * @returns {Array} - Filtered tasks
 */
export const filterTasksByStatus = (tasks, status) => {
    if (!tasks || !status || status === 'all') return tasks;
    return tasks.filter(task => task.status?.toLowerCase() === status.toLowerCase());
};

/**
 * Generate a random color for avatars
 * @param {string} name - Name to generate color from
 * @returns {string} - CSS gradient class
 */
export const getAvatarColor = (name) => {
    const colors = [
        'from-blue-500 to-blue-600',
        'from-purple-500 to-purple-600',
        'from-green-500 to-green-600',
        'from-red-500 to-red-600',
        'from-yellow-500 to-yellow-600',
        'from-pink-500 to-pink-600',
        'from-indigo-500 to-indigo-600',
        'from-teal-500 to-teal-600',
    ];

    if (!name) return colors[0];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
};

/**
 * Debounce function for search inputs
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

/**
 * Format file size to readable string
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (!bytes || bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
