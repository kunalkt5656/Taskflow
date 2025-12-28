import React from 'react';
import { useNavigate } from 'react-router-dom';
import Progress from '../layout/Progress';
import AvatarGroup from '../layout/AvatarGroup';

const TaskCard = ({ task }) => {
    const navigate = useNavigate();

    // Priority configuration
    const priorityConfig = {
        low: {
            label: 'Low',
            color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
            icon: '🟢',
        },
        medium: {
            label: 'Medium',
            color: 'bg-amber-50 text-amber-600 border-amber-200',
            icon: '🟡',
        },
        high: {
            label: 'High',
            color: 'bg-red-50 text-red-600 border-red-200',
            icon: '🔴',
        },
    };

    // Status configuration
    const statusConfig = {
        pending: {
            label: 'Pending',
            color: 'bg-amber-100 text-amber-700',
            dot: 'bg-amber-400',
        },
        'in-progress': {
            label: 'In Progress',
            color: 'bg-blue-100 text-blue-700',
            dot: 'bg-blue-400',
        },
        completed: {
            label: 'Completed',
            color: 'bg-emerald-100 text-emerald-700',
            dot: 'bg-emerald-400',
        },
    };

    const priority = priorityConfig[task.priority] || priorityConfig.medium;
    const status = statusConfig[task.status] || statusConfig.pending;

    // Calculate progress from checklist
    const calculateProgress = () => {
        if (!task.todoChecklist || task.todoChecklist.length === 0) return 0;
        const completed = task.todoChecklist.filter(item => item.completed).length;
        return Math.round((completed / task.todoChecklist.length) * 100);
    };

    const progress = calculateProgress();

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'No due date';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = date - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Overdue';
        if (diffDays === 0) return 'Due today';
        if (diffDays === 1) return 'Due tomorrow';
        if (diffDays <= 7) return `Due in ${diffDays} days`;

        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
        });
    };

    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

    return (
        <div
            onClick={() => navigate(`/admin/tasks/${task._id}`)}
            className="group bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 hover:shadow-xl hover:shadow-gray-200 transition-all duration-300 cursor-pointer border border-gray-100 hover:border-gray-200"
        >
            {/* Header - Status & Priority */}
            <div className="flex items-center justify-between mb-4">
                <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium ${status.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                    {status.label}
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${priority.color}`}>
                    <span>{priority.icon}</span>
                    {priority.label}
                </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                {task.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                {task.description || 'No description provided'}
            </p>

            {/* Progress */}
            {task.todoChecklist && task.todoChecklist.length > 0 && (
                <div className="mb-4">
                    <Progress value={progress} size="sm" color="auto" />
                    <p className="text-xs text-gray-400 mt-1.5">
                        {task.todoChecklist.filter(i => i.completed).length} of {task.todoChecklist.length} tasks
                    </p>
                </div>
            )}

            {/* Footer - Date & Assignees */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                {/* Due Date */}
                <div className={`flex items-center gap-1.5 text-xs ${isOverdue ? 'text-red-500' : 'text-gray-500'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="font-medium">{formatDate(task.dueDate)}</span>
                </div>

                {/* Assignees */}
                {task.assignedTo && task.assignedTo.length > 0 && (
                    <AvatarGroup users={task.assignedTo} maxDisplay={3} size="sm" />
                )}
            </div>

            {/* Attachments indicator */}
            {task.attachments && task.attachments.length > 0 && (
                <div className="flex items-center gap-1.5 mt-3 text-xs text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    <span>{task.attachments.length} attachment{task.attachments.length > 1 ? 's' : ''}</span>
                </div>
            )}
        </div>
    );
};

export default TaskCard;
