import React, { useState, useRef, useEffect } from 'react';

const SelectUser = ({
    users = [],
    selectedUsers = [],
    onChange,
    placeholder = 'Select team members',
    label,
    error,
    disabled = false,
    maxDisplay = 3,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Filter users based on search
    const filteredUsers = users.filter(user =>
        user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Check if user is selected
    const isSelected = (userId) => selectedUsers.includes(userId);

    // Toggle user selection
    const toggleUser = (userId) => {
        if (isSelected(userId)) {
            onChange(selectedUsers.filter(id => id !== userId));
        } else {
            onChange([...selectedUsers, userId]);
        }
    };

    // Get selected users' data
    const selectedUsersData = users.filter(user => selectedUsers.includes(user._id));

    // Remove user
    const removeUser = (userId, e) => {
        e.stopPropagation();
        onChange(selectedUsers.filter(id => id !== userId));
    };

    return (
        <div className="w-full" ref={dropdownRef}>
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Trigger */}
                <div
                    onClick={() => !disabled && setIsOpen(!isOpen)}
                    className={`min-h-[48px] px-4 py-2.5 bg-gray-50 border rounded-xl transition-all duration-200 cursor-pointer
            ${error ? 'border-red-300' : 'border-gray-200'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'}
            ${isOpen ? 'ring-2 ring-primary/20 border-primary' : ''}
          `}
                >
                    {selectedUsersData.length > 0 ? (
                        <div className="flex flex-wrap gap-2">
                            {selectedUsersData.slice(0, maxDisplay).map((user) => (
                                <div
                                    key={user._id}
                                    className="flex items-center gap-2 px-2 py-1 bg-primary/10 rounded-lg"
                                >
                                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-medium overflow-hidden">
                                        {user.profileImageUrl ? (
                                            <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                                        ) : (
                                            user.name?.charAt(0).toUpperCase() || 'U'
                                        )}
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{user.name}</span>
                                    <button
                                        type="button"
                                        onClick={(e) => removeUser(user._id, e)}
                                        className="p-0.5 text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                            {selectedUsersData.length > maxDisplay && (
                                <div className="flex items-center px-2 py-1 bg-gray-200 rounded-lg">
                                    <span className="text-sm font-medium text-gray-600">
                                        +{selectedUsersData.length - maxDisplay} more
                                    </span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <span className="text-gray-400">{placeholder}</span>
                    )}
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                        {/* Search */}
                        <div className="p-2 border-b border-gray-100">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search team members..."
                                className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                                autoFocus
                            />
                        </div>

                        {/* User List */}
                        <div className="max-h-60 overflow-y-auto">
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <button
                                        key={user._id}
                                        type="button"
                                        onClick={() => toggleUser(user._id)}
                                        className={`w-full px-4 py-3 text-left transition-colors flex items-center gap-3
                      ${isSelected(user._id)
                                                ? 'bg-primary/10'
                                                : 'hover:bg-gray-50'
                                            }
                    `}
                                    >
                                        {/* Checkbox */}
                                        <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                      ${isSelected(user._id)
                                                ? 'bg-primary border-primary'
                                                : 'border-gray-300'
                                            }
                    `}>
                                            {isSelected(user._id) && (
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            )}
                                        </div>

                                        {/* Avatar */}
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-medium overflow-hidden">
                                            {user.profileImageUrl ? (
                                                <img src={user.profileImageUrl} alt={user.name} className="w-full h-full object-cover" />
                                            ) : (
                                                user.name?.charAt(0).toUpperCase() || 'U'
                                            )}
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                                            <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                        </div>

                                        {/* Role Badge */}
                                        {user.role && (
                                            <span className={`px-2 py-0.5 text-xs font-medium rounded-full capitalize
                        ${user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}
                      `}>
                                                {user.role}
                                            </span>
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center">
                                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                    <p className="text-sm text-gray-500">No team members found</p>
                                </div>
                            )}
                        </div>

                        {/* Selection Count */}
                        {selectedUsers.length > 0 && (
                            <div className="px-4 py-2 border-t border-gray-100 bg-gray-50">
                                <span className="text-sm text-gray-600">
                                    {selectedUsers.length} member{selectedUsers.length > 1 ? 's' : ''} selected
                                </span>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default SelectUser;
