export const API_PATHS = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        PROFILE: '/api/auth/profile',
        UPLOAD_IMAGE: '/api/auth/upload-image',
    },
    TASKS: {
        GET_ALL: '/api/tasks',
        GET_BY_ID: (id) => `/api/tasks/${id}`,
        CREATE: '/api/tasks',
        UPDATE: (id) => `/api/tasks/${id}`,
        DELETE: (id) => `/api/tasks/${id}`,
        UPDATE_CHECKLIST: (taskId, todoId) => `/api/tasks/${taskId}/todo/${todoId}`,
        DASHBOARD: '/api/tasks/dashboard',
        USER_DASHBOARD: '/api/tasks/user-dashboard',
    },
    USERS: {
        GET_ALL: '/api/user',
        GET_BY_ID: (id) => `/api/user/${id}`,
    },
    REPORTS: {
        EXPORT: '/api/reports/export',
    },
};
