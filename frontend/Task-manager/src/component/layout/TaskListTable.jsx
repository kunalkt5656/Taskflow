import React from 'react';

const TaskListTable = ({
    tasks = [],
    onViewTask,
    onEditTask,
    onDeleteTask,
    loading = false,
    emptyMessage = "No tasks found"
}) => {
    // Status color mapping
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed':
                return 'bg-emerald-100 text-emerald-700';
            case 'in progress':
                return 'bg-blue-100 text-blue-700';
            case 'pending':
                return 'bg-amber-100 text-amber-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    // Priority color mapping
    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high':
                return 'text-red-500 bg-red-50';
            case 'medium':
                return 'text-amber-500 bg-amber-50';
            case 'low':
                return 'text-emerald-500 bg-emerald-50';
            default:
                return 'text-gray-500 bg-gray-50';
        }
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    if (loading) {
        return (
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 overflow-hidden">
                <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                        <p className="text-gray-500 font-medium">Loading tasks...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 overflow-hidden">
                <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <p className="text-gray-500 font-medium">{emptyMessage}</p>
                    <p className="text-gray-400 text-sm mt-1">Create a new task to get started</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">
                            <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">Task</th>
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Priority</th>
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Status</th>
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Due Date</th>
                            <th className="text-left py-4 px-4 text-sm font-semibold text-gray-600">Assigned To</th>
                            <th className="text-center py-4 px-4 text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {tasks.map((task) => (
                            <tr
                                key={task._id}
                                className="hover:bg-gray-50/50 transition-colors group"
                            >
                                {/* Task Title & Description */}
                                <td className="py-4 px-6 max-w-xs">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center flex-shrink-0">
                                            <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                            </svg>
                                        </div>
                                        <div className="min-w-0">
                                            <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                                                {task.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 truncate max-w-[200px]">
                                                {task.description || 'No description'}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Priority */}
                                <td className="py-4 px-4">
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium ${getPriorityColor(task.priority)}`}>
                                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                        </svg>
                                        <span className="capitalize">{task.priority || 'N/A'}</span>
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="py-4 px-4">
                                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                                        {task.status}
                                    </span>
                                </td>

                                {/* Due Date */}
                                <td className="py-4 px-4">
                                    <span className="text-sm text-gray-600">
                                        {formatDate(task.dueDate)}
                                    </span>
                                </td>

                                {/* Assigned To */}
                                <td className="py-4 px-4">
                                    <div className="flex -space-x-2">
                                        {task.assignedTo?.slice(0, 3).map((member, idx) => (
                                            <div
                                                key={idx}
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white text-xs font-medium border-2 border-white"
                                                title={member.name || 'User'}
                                            >
                                                {member.profileImageUrl ? (
                                                    <img
                                                        src={member.profileImageUrl}
                                                        alt={member.name}
                                                        className="w-full h-full rounded-full object-cover"
                                                    />
                                                ) : (
                                                    member.name?.charAt(0).toUpperCase() || 'U'
                                                )}
                                            </div>
                                        ))}
                                        {task.assignedTo?.length > 3 && (
                                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xs font-medium border-2 border-white">
                                                +{task.assignedTo.length - 3}
                                            </div>
                                        )}
                                        {(!task.assignedTo || task.assignedTo.length === 0) && (
                                            <span className="text-sm text-gray-400">Unassigned</span>
                                        )}
                                    </div>
                                </td>

                                {/* Actions */}
                                <td className="py-4 px-4">
                                    <div className="flex items-center justify-center gap-2">
                                        {onViewTask && (
                                            <button
                                                onClick={() => onViewTask(task)}
                                                className="p-2 text-gray-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors"
                                                title="View Task"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                            </button>
                                        )}
                                        {onEditTask && (
                                            <button
                                                onClick={() => onEditTask(task)}
                                                className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                title="Edit Task"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </button>
                                        )}
                                        {onDeleteTask && (
                                            <button
                                                onClick={() => onDeleteTask(task)}
                                                className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Delete Task"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
                {tasks.map((task) => (
                    <div key={task._id} className="p-4 hover:bg-gray-50/50 transition-colors">
                        <div className="flex items-start justify-between gap-4 mb-3">
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center flex-shrink-0">
                                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-semibold text-gray-900 truncate">{task.title}</h4>
                                    <p className="text-xs text-gray-500 truncate">{task.description || 'No description'}</p>
                                </div>
                            </div>
                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full whitespace-nowrap ${getStatusColor(task.status)}`}>
                                {task.status}
                            </span>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded ${getPriorityColor(task.priority)}`}>
                                    <span className="capitalize">{task.priority || 'N/A'}</span>
                                </span>
                                <span>Due: {formatDate(task.dueDate)}</span>
                            </div>

                            <div className="flex items-center gap-1">
                                {onViewTask && (
                                    <button
                                        onClick={() => onViewTask(task)}
                                        className="p-2 text-gray-400 hover:text-primary rounded-lg"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </button>
                                )}
                                {onEditTask && (
                                    <button
                                        onClick={() => onEditTask(task)}
                                        className="p-2 text-gray-400 hover:text-blue-600 rounded-lg"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                        </svg>
                                    </button>
                                )}
                                {onDeleteTask && (
                                    <button
                                        onClick={() => onDeleteTask(task)}
                                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TaskListTable;
