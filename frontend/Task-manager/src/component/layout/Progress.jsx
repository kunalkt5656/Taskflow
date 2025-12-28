import React from 'react';

const Progress = ({ value = 0, size = 'md', showLabel = true, color = 'primary' }) => {
    // Ensure value is between 0 and 100
    const percentage = Math.min(100, Math.max(0, value));

    // Size variants
    const sizeClasses = {
        sm: 'h-1.5',
        md: 'h-2.5',
        lg: 'h-4',
    };

    // Color variants
    const colorClasses = {
        primary: 'bg-gradient-to-r from-violet-500 to-purple-600',
        success: 'bg-gradient-to-r from-emerald-400 to-green-500',
        warning: 'bg-gradient-to-r from-amber-400 to-orange-500',
        danger: 'bg-gradient-to-r from-red-400 to-rose-500',
        blue: 'bg-gradient-to-r from-blue-400 to-indigo-500',
    };

    // Get color based on percentage (auto mode)
    const getAutoColor = () => {
        if (percentage >= 75) return colorClasses.success;
        if (percentage >= 50) return colorClasses.primary;
        if (percentage >= 25) return colorClasses.warning;
        return colorClasses.danger;
    };

    const barColor = color === 'auto' ? getAutoColor() : colorClasses[color] || colorClasses.primary;

    return (
        <div className="w-full">
            {showLabel && (
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-500">Progress</span>
                    <span className="text-xs font-semibold text-gray-700">{percentage}%</span>
                </div>
            )}
            <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${sizeClasses[size]}`}>
                <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${barColor}`}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
};

export default Progress;
