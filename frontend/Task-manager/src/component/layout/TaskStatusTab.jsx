import React from 'react';

const TaskStatusTab = ({ tabs, activeTab, onTabChange }) => {
    // Default status tabs with counts
    const defaultTabs = [
        { key: 'all', label: 'All Tasks', count: 0 },
        { key: 'pending', label: 'Pending', count: 0 },
        { key: 'in-progress', label: 'In Progress', count: 0 },
        { key: 'completed', label: 'Completed', count: 0 },
    ];

    const statusTabs = tabs || defaultTabs;

    // Status color mapping
    const getStatusColor = (key, isActive) => {
        const colors = {
            all: isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100',
            pending: isActive ? 'bg-amber-500 text-white' : 'text-amber-600 hover:bg-amber-50',
            inprogress: isActive ? 'bg-blue-500 text-white' : 'text-blue-600 hover:bg-blue-50',
            completed: isActive ? 'bg-emerald-500 text-white' : 'text-emerald-600 hover:bg-emerald-50',
        };
        return colors[key] || (isActive ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-100');
    };

    // Status dot colors
    const getStatusDot = (key) => {
        const dots = {
            pending: 'bg-amber-400',
            inprogress: 'bg-blue-400',
            completed: 'bg-emerald-400',
        };
        return dots[key] || null;
    };

    return (
        <div className="flex flex-wrap gap-2">
            {statusTabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`
                        flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                        transition-all duration-200 ease-out
                        ${getStatusColor(tab.key, activeTab === tab.key)}
                        ${activeTab === tab.key ? 'shadow-md' : ''}
                    `}
                >
                    {/* Status dot indicator */}
                    {getStatusDot(tab.key) && (
                        <span className={`w-2 h-2 rounded-full ${getStatusDot(tab.key)}`} />
                    )}

                    <span>{tab.label}</span>

                    {/* Count badge */}
                    {tab.count !== undefined && (
                        <span className={`
                            px-2 py-0.5 rounded-full text-xs font-semibold
                            ${activeTab === tab.key
                                ? 'bg-white/20'
                                : 'bg-gray-100 text-gray-500'
                            }
                        `}>
                            {tab.count}
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default TaskStatusTab;
