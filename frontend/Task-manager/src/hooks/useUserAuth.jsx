import { useContext, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/Usercontext';
import axiosInstance from '../utils/axiosinstance';
import { API_PATHS } from '../utils/apiPath';

/**
 * Custom hook for user authentication
 * Provides login, logout, signup functions and auth state
 */
const useUserAuth = () => {
    const navigate = useNavigate();
    const {
        user,
        loading,
        error,
        setUser,
        updateUser,
        fetchUser,
        login: contextLogin,
        logout: contextLogout,
        clearError,
        isAuthenticated,
        isAdmin,
    } = useContext(UserContext);

    /**
     * Login user with email and password
     */
    const login = useCallback(async (email, password) => {
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email,
                password,
            });

            if (response.data) {
                const { token, ...userData } = response.data;
                await contextLogin(token, userData);

                // Redirect based on role
                if (userData.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/userdashboard');
                }

                return { success: true, data: response.data };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
            return { success: false, error: errorMessage };
        }
    }, [contextLogin, navigate]);

    /**
     * Register new user
     */
    const signup = useCallback(async (userData) => {
        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, userData);

            if (response.data) {
                const { token, ...user } = response.data;
                await contextLogin(token, user);

                // Redirect based on role
                if (user.role === 'admin') {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/user/userdashboard');
                }

                return { success: true, data: response.data };
            }
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Registration failed. Please try again.';
            return { success: false, error: errorMessage };
        }
    }, [contextLogin, navigate]);

    /**
     * Logout user and redirect to login page
     */
    const logout = useCallback(() => {
        contextLogout();
        navigate('/login');
    }, [contextLogout, navigate]);

    /**
     * Upload profile image
     */
    const uploadProfileImage = useCallback(async (imageFile) => {
        if (!imageFile) return null;

        const formData = new FormData();
        formData.append('image', imageFile);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.UPLOAD_IMAGE, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data?.imageUrl || null;
        } catch (error) {
            console.error('Image upload failed:', error);
            return null;
        }
    }, []);

    /**
     * Get redirect path based on user role
     */
    const getRedirectPath = useCallback(() => {
        if (!user) return '/login';
        return user.role === 'admin' ? '/admin/dashboard' : '/user/userdashboard';
    }, [user]);

    /**
     * Check if current user has a specific role
     */
    const hasRole = useCallback((role) => {
        return user?.role === role;
    }, [user]);

    return {
        // State
        user,
        loading,
        error,
        isAuthenticated: isAuthenticated(),
        isAdmin: isAdmin(),

        // Actions
        login,
        signup,
        logout,
        updateUser,
        fetchUser,
        clearError,
        uploadProfileImage,

        // Helpers
        getRedirectPath,
        hasRole,
    };
};

export default useUserAuth;
