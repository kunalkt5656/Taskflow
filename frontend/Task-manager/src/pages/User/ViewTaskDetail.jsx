import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '../../component/layout/DashboardLayout';
import Progress from '../../component/layout/Progress';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';

const ViewTaskDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updating, setUpdating] = useState(false);

  // Fetch task on mount
  useEffect(() => {
    fetchTask();
  }, [id]);

  const fetchTask = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_BY_ID(id));
      setTask(response.data);
    } catch (err) {
      console.error('Failed to fetch task:', err);
      setError('Failed to load task details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Toggle checklist item
  const handleToggleChecklist = async (todoId, currentStatus) => {
    try {
      setUpdating(true);
      await axiosInstance.put(API_PATHS.TASKS.UPDATE_CHECKLIST(id, todoId), {
        isCompleted: !currentStatus
      });
      // Refetch task to get updated data
      await fetchTask();
    } catch (err) {
      console.error('Failed to update checklist:', err);
    } finally {
      setUpdating(false);
    }
  };

  // Priority configuration
  const priorityConfig = {
    low: { label: 'Low', color: 'bg-emerald-100 text-emerald-700 border-emerald-300', icon: '🟢' },
    medium: { label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300', icon: '🟡' },
    high: { label: 'High', color: 'bg-red-100 text-red-700 border-red-300', icon: '🔴' },
  };

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-500' },
    'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-500' },
    completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-500' },
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'No date set';
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Calculate progress
  const calculateProgress = () => {
    if (!task?.todoChecklist || task.todoChecklist.length === 0) return 0;
    const completed = task.todoChecklist.filter(item => item.isCompleted).length;
    return Math.round((completed / task.todoChecklist.length) * 100);
  };

  // Check if overdue
  const isOverdue = task?.dueDate && new Date(task.dueDate) < new Date() && task?.status !== 'completed';

  if (loading) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3" />
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-4 bg-gray-100 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-100 rounded w-2/3" />
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center">
            <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <h3 className="text-lg font-semibold text-red-800 mb-2">{error}</h3>
            <button
              onClick={fetchTask}
              className="text-red-600 hover:text-red-700 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!task) {
    return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-50 rounded-2xl p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-700">Task not found</h3>
            <button
              onClick={() => navigate('/user/tasks')}
              className="mt-4 text-primary hover:text-purple-700 font-medium"
            >
              Back to My Tasks
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const priority = priorityConfig[task.priority] || priorityConfig.medium;
  const status = statusConfig[task.status] || statusConfig.pending;
  const progress = calculateProgress();

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate('/user/tasks')}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to My Tasks
        </button>

        {/* Main Task Card */}
        <div className="bg-white rounded-2xl shadow-lg shadow-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary/5 to-purple-50 p-6 border-b border-gray-100">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium ${status.color}`}>
                    <span className={`w-2 h-2 rounded-full ${status.dot}`} />
                    {status.label}
                  </span>
                  <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium border ${priority.color}`}>
                    <span>{priority.icon}</span>
                    {priority.label} Priority
                  </span>
                  {isOverdue && (
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Overdue
                    </span>
                  )}
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">{task.title}</h1>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-2">Description</h3>
              <p className="text-gray-700 leading-relaxed">
                {task.description || 'No description provided for this task.'}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Due Date */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isOverdue ? 'bg-red-100' : 'bg-primary/10'}`}>
                    <svg className={`w-5 h-5 ${isOverdue ? 'text-red-600' : 'text-primary'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Due Date</p>
                    <p className={`text-sm font-semibold ${isOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                      {formatDate(task.dueDate)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Created At */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500 uppercase">Created</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatDate(task.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress Section */}
            {task.todoChecklist && task.todoChecklist.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                    Progress
                  </h3>
                  <span className="text-sm font-medium text-gray-600">
                    {task.todoChecklist.filter(i => i.isCompleted).length} of {task.todoChecklist.length} completed
                  </span>
                </div>
                <Progress value={progress} size="md" color="auto" showLabel={false} />
              </div>
            )}

            {/* Checklist */}
            {task.todoChecklist && task.todoChecklist.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Checklist
                </h3>
                <div className="space-y-2">
                  {task.todoChecklist.map((item) => (
                    <div
                      key={item._id}
                      onClick={() => !updating && handleToggleChecklist(item._id, item.isCompleted)}
                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${item.isCompleted
                          ? 'bg-emerald-50 border border-emerald-200'
                          : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                        } ${updating ? 'opacity-50 cursor-wait' : ''}`}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${item.isCompleted
                          ? 'bg-emerald-500 border-emerald-500'
                          : 'border-gray-300'
                        }`}>
                        {item.isCompleted && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className={`flex-1 text-sm ${item.isCompleted ? 'text-gray-500 line-through' : 'text-gray-700'
                        }`}>
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Attachments */}
            {task.attachments && task.attachments.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Attachments ({task.attachments.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {task.attachments.map((attachment, index) => (
                    <a
                      key={index}
                      href={attachment}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 border border-gray-200 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 truncate group-hover:text-primary transition-colors">
                          Attachment {index + 1}
                        </p>
                        <p className="text-xs text-gray-500">Click to view</p>
                      </div>
                      <svg className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Created By */}
            {task.createdBy && (
              <div className="pt-4 border-t border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold">
                    {task.createdBy.profileImageUrl ? (
                      <img
                        src={task.createdBy.profileImageUrl}
                        alt={task.createdBy.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      task.createdBy.name?.charAt(0).toUpperCase() || 'A'
                    )}
                  </div>
                  <div>
                    <p className="text-xs font-medium text-gray-500">Assigned by</p>
                    <p className="text-sm font-semibold text-gray-900">{task.createdBy.name}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewTaskDetail;