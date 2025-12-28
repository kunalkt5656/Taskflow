import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../component/layout/DashboardLayout';
import TaskCard from '../../component/Card/TaskCard';
import TaskStatusTab from '../../component/layout/TaskStatusTab';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';

const ManageTask = () => {
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
      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL);
      setTasks(response.data?.tasks || response.data || []);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setError('Failed to load tasks. Please try again.');
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

  return (
    <DashboardLayout activeMenu="Manage Tasks">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Manage Tasks</h1>
            <p className="text-gray-500 mt-1">
              {counts.all} total tasks • {counts.pending} pending • {counts['in-progress']} in progress
            </p>
          </div>

          {/* Create Task Button */}
          <button
            onClick={() => navigate('/admin/create-task')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create Task
          </button>
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
                placeholder="Search tasks..."
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
                  <div className="flex -space-x-2">
                    <div className="w-7 h-7 bg-gray-200 rounded-full" />
                    <div className="w-7 h-7 bg-gray-200 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredTasks.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 shadow-lg shadow-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {searchQuery ? 'No tasks found' : 'No tasks yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchQuery
                ? `No tasks match "${searchQuery}". Try a different search.`
                : 'Get started by creating your first task.'
              }
            </p>
            {!searchQuery && (
              <button
                onClick={() => navigate('/admin/create-task')}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary/90 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Create Task
              </button>
            )}
          </div>
        ) : (
          /* Tasks Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManageTask;