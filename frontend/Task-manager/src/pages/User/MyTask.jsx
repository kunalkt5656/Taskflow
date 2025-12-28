import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../component/layout/DashboardLayout';
import TaskStatusTab from '../../component/layout/TaskStatusTab';
import Progress from '../../component/layout/Progress';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';

const MyTask = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeStatus, setActiveStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL);
      setTasks(response.data?.tasks || response.data || []);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load your tasks. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Calculate counts for each status
  const getStatusCounts = () => {
    return {
      all: tasks.length,
      pending: tasks.filter(t => t.status === 'pending').length,
      'in-progress': tasks.filter(t => t.status === 'in-progress').length,
      completed: tasks.filter(t => t.status === 'completed').length,
    };
  };

  const counts = getStatusCounts();

  // Tabs configuration
  const statusTabs = [
    { key: 'all', label: 'All Tasks', count: counts.all },
    { key: 'pending', label: 'Pending', count: counts.pending },
    { key: 'in-progress', label: 'In Progress', count: counts['in-progress'] },
    { key: 'completed', label: 'Completed', count: counts.completed },
  ];

  // Filter tasks
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = activeStatus === 'all' || task.status === activeStatus;
    const matchesSearch = task.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Priority configuration
  const priorityConfig = {
    low: { label: 'Low', color: 'bg-emerald-50 text-emerald-600 border-emerald-200', icon: '🟢' },
    medium: { label: 'Medium', color: 'bg-amber-50 text-amber-600 border-amber-200', icon: '🟡' },
    high: { label: 'High', color: 'bg-red-50 text-red-600 border-red-200', icon: '🔴' },
  };

  // Status configuration
  const statusConfig = {
    pending: { label: 'Pending', color: 'bg-amber-100 text-amber-700', dot: 'bg-amber-400' },
    'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700', dot: 'bg-blue-400' },
    completed: { label: 'Completed', color: 'bg-emerald-100 text-emerald-700', dot: 'bg-emerald-400' },
  };

  // Calculate progress from checklist
  const calculateProgress = (task) => {
    if (!task.todoChecklist || task.todoChecklist.length === 0) return 0;
    const completed = task.todoChecklist.filter(item => item.isCompleted).length;
    return Math.round((completed / task.todoChecklist.length) * 100);
  };

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

    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const isOverdue = (task) => task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'completed';

  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-gray-500 mt-1">
              {counts.all} total • {counts.pending} pending • {counts['in-progress']} in progress • {counts.completed} completed
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-xl border border-amber-200">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm font-medium text-amber-700">{counts.pending} Pending</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-sm font-medium text-emerald-700">{counts.completed} Done</span>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl p-4 lg:p-6 shadow-lg shadow-gray-100">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Status Tabs */}
            <div className="flex-1">
              <TaskStatusTab
                tabs={statusTabs}
                activeTab={activeStatus}
                onTabChange={setActiveStatus}
              />
            </div>

            {/* Search Input */}
            <div className="relative lg:w-72">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search your tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700">{error}</span>
            <button
              onClick={fetchTasks}
              className="ml-auto text-sm font-medium text-red-600 hover:text-red-700"
            >
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 shadow-lg shadow-gray-100 animate-pulse">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-6 w-20 bg-gray-200 rounded-lg" />
                  <div className="h-6 w-16 bg-gray-200 rounded-lg" />
                </div>
                <div className="h-5 bg-gray-200 rounded mb-2" />
                <div className="h-4 bg-gray-100 rounded w-3/4 mb-4" />
                <div className="h-2 bg-gray-100 rounded-full mb-4" />
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="h-4 w-24 bg-gray-200 rounded" />
                  <div className="h-8 w-20 bg-gray-200 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 shadow-lg shadow-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No tasks found' : 'No tasks assigned yet'}
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No tasks match "${searchQuery}". Try a different search.`
                : 'Tasks assigned to you by your admin will appear here.'
              }
            </p>
          </div>
        ) : (
          /* Tasks Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => {
              const priority = priorityConfig[task.priority] || priorityConfig.medium;
              const status = statusConfig[task.status] || statusConfig.pending;
              const progress = calculateProgress(task);

              return (
                <div
                  key={task._id}
                  onClick={() => navigate(`/user/task-details/${task._id}`)}
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
                        {task.todoChecklist.filter(i => i.isCompleted).length} of {task.todoChecklist.length} subtasks
                      </p>
                    </div>
                  )}

                  {/* Footer - Date & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    {/* Due Date */}
                    <div className={`flex items-center gap-1.5 text-xs ${isOverdue(task) ? 'text-red-500' : 'text-gray-500'}`}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="font-medium">{formatDate(task.dueDate)}</span>
                    </div>

                    {/* View Details Button */}
                    <button className="flex items-center gap-1 text-xs font-medium text-primary hover:text-purple-700 transition-colors">
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
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
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyTask;