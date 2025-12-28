import React from 'react';

const AvatarGroup = ({
    users = [],
    maxDisplay = 3,
    size = 'md', // 'sm', 'md', 'lg'
    showTooltip = true,
    onAvatarClick,
}) => {
    const displayedUsers = users.slice(0, maxDisplay);
    const remainingCount = users.length - maxDisplay;

    const sizeClasses = {
        sm: 'w-6 h-6 text-xs',
        md: 'w-8 h-8 text-sm',
        lg: 'w-10 h-10 text-base',
    };

    const borderSizes = {
        sm: 'border',
        md: 'border-2',
        lg: 'border-2',
    };

    const overlapClasses = {
        sm: '-ml-2',
        md: '-ml-3',
        lg: '-ml-4',
    };

    if (users.length === 0) {
        return (
            <div className="flex items-center gap-2 text-gray-400">
                <div className={`${sizeClasses[size]} rounded-full bg-gray-200 flex items-center justify-center`}>
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>
                <span className="text-sm">Unassigned</span>
            </div>
        );
    }

    return (
        <div className="flex items-center">
            {displayedUsers.map((user, index) => (
                <div
                    key={user._id || index}
                    className={`relative ${index !== 0 ? overlapClasses[size] : ''}`}
                    title={showTooltip ? user.name : undefined}
                >
                    <button
                        type="button"
                        onClick={() => onAvatarClick?.(user)}
                        className={`${sizeClasses[size]} ${borderSizes[size]} border-white rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-medium overflow-hidden hover:z-10 hover:ring-2 hover:ring-primary/30 transition-all`}
                    >
                        {user.profileImageUrl ? (
                            <img
                                src={user.profileImageUrl}
                                alt={user.name}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            user.name?.charAt(0).toUpperCase() || 'U'
                        )}
                    </button>
                </div>
            ))}

            {remainingCount > 0 && (
                <div
                    className={`relative ${overlapClasses[size]}`}
                    title={showTooltip ? `+${remainingCount} more` : undefined}
                >
                    <div className={`${sizeClasses[size]} ${borderSizes[size]} border-white rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium`}>
                        +{remainingCount}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AvatarGroup;
