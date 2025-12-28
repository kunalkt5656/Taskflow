import React, { createContext, useContext, useEffect, useState } from "react";
import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axiosinstance";

export const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserContextProvider');
    }
    return context;
};

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user profile from API
    const fetchUser = async () => {
        const token = localStorage.getItem('token');

        // Don't fetch if no token
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await axiosInstance.get(API_PATHS.AUTH.PROFILE);
            setUser(response.data);
            setError(null);
        } catch (err) {
            console.error('Failed to fetch user:', err);
            setError(err.response?.data?.message || 'Failed to fetch user profile');
            setUser(null);

            // If unauthorized, clear storage
            if (err.response?.status === 401) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } finally {
            setLoading(false);
        }
    };

    // Update user data locally
    const updateUser = (userData) => {
        setUser(prevUser => ({
            ...prevUser,
            ...userData
        }));
        // Also update localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsed = JSON.parse(storedUser);
            localStorage.setItem('user', JSON.stringify({ ...parsed, ...userData }));
        }
    };

    // Login user - store token and fetch profile
    const login = async (token, userData) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setError(null);
    };

    // Logout user
    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setError(null);
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    // Check if user is authenticated
    const isAuthenticated = () => {
        return !!user && !!localStorage.getItem('token');
    };

    // Check if user is admin
    const isAdmin = () => {
        return user?.role === 'admin';
    };

    // Fetch user on mount
    useEffect(() => {
        fetchUser();
    }, []);

    // Context value
    const value = {
        user,
        loading,
        error,
        setUser,
        updateUser,
        fetchUser,
        login,
        logout,
        clearError,
        isAuthenticated,
        isAdmin,
    };

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    );
};

export default UserContextProvider;