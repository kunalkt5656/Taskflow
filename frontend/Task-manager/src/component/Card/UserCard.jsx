import React from 'react';

const UserCard = ({ user, onViewDetails, onEdit, onDelete }) => {
    // Role configuration
    const roleConfig = {
        admin: {
            label: 'Admin',
            color: 'bg-purple-100 text-purple-700 border-purple-200',
            icon: '👑',
        },
        member: {
            label: 'Member',
            color: 'bg-blue-100 text-blue-700 border-blue-200',
            icon: '👤',
        },
        user: {
            label: 'User',
            color: 'bg-gray-100 text-gray-700 border-gray-200',
            icon: '👤',
        },
    };

    const role = roleConfig[user.role] || roleConfig.user;

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'Unknown';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        });
    };

    // Get initials
    const getInitials = (name) => {
        if (!name) return 'U';
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    return (
        <div className="group bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 border border-gray-100 hover:border-gray-200">
            {/* Header - Avatar & Role */}
            <div className="flex items-start justify-between mb-4">
                {/* Avatar */}
                <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-lg font-bold overflow-hidden shadow-lg shadow-primary/20">
                        {user.profileImageUrl ? (
                            <img
                                src={user.profileImageUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            getInitials(user.name)
                        )}
                    </div>
                    {/* Online indicator */}
                    {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white" />
                    )}
                </div>

                {/* Role Badge */}
                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${role.color}`}>
                    <span>{role.icon}</span>
                    {role.label}
                </div>
            </div>

            {/* User Info */}
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors truncate">
                    {user.name}
                </h3>
                <p className="text-sm text-gray-500 truncate">
                    {user.email}
                </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-gray-900">{user.pendingTasks || 0}</p>
                    <p className="text-xs text-gray-500">Pending</p>
                </div>
                <div className="bg-emerald-50 rounded-xl p-3 text-center">
                    <p className="text-xl font-bold text-emerald-600">{user.completedTasks || 0}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                </div>
            </div>

            {/* Join Date */}
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Joined {formatDate(user.createdAt)}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                    onClick={() => onViewDetails?.(user)}
                    className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View
                </button>
                <button
                    onClick={() => onEdit?.(user)}
                    className="flex items-center justify-center p-2 text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
                    title="Edit user"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                </button>
                <button
                    onClick={() => onDelete?.(user)}
                    className="flex items-center justify-center p-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors"
                    title="Delete user"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default UserCard;
