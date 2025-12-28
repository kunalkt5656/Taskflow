import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../component/layout/DashboardLayout';
import InfoCard from '../../component/Card/InfoCard';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.TASKS.DASHBOARD);
      setDashboardData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  // Status color mapping
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-emerald-100 text-emerald-700';
      case 'in-progress':
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
        return 'text-red-500';
      case 'medium':
        return 'text-amber-500';
      case 'low':
        return 'text-emerald-500';
      default:
        return 'text-gray-500';
    }
  };

  // Stats cards data
  const statsCards = [
    {
      title: 'Total Tasks',
      value: dashboardData?.totalTasks || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      bgGradient: 'from-violet-500 to-purple-600',
      shadowColor: 'shadow-violet-200',
    },
    {
      title: 'In Progress',
      value: dashboardData?.inProgressTasks || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgGradient: 'from-blue-500 to-cyan-500',
      shadowColor: 'shadow-blue-200',
    },
    {
      title: 'Completed',
      value: dashboardData?.completedTasks || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgGradient: 'from-emerald-500 to-teal-500',
      shadowColor: 'shadow-emerald-200',
    },
    {
      title: 'Pending',
      value: dashboardData?.pendingTasks || 0,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgGradient: 'from-amber-500 to-orange-500',
      shadowColor: 'shadow-amber-200',
    },
  ];

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <p className="text-gray-500 font-medium">Loading dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Track your team's progress and manage tasks efficiently</p>
          </div>
          <button
            onClick={() => window.location.href = '/admin/create-task'}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Task
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700">{error}</span>
          </div>
        )}

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsCards.map((card, index) => (
            <InfoCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              bgGradient={card.bgGradient}
              shadowColor={card.shadowColor}
            />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Task Status Distribution */}
          <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Task Distribution</h3>

            <div className="space-y-4">
              {[
                { label: 'Completed', value: dashboardData?.completedTasks || 0, color: 'bg-emerald-500', total: dashboardData?.totalTasks || 1 },
                { label: 'In Progress', value: dashboardData?.inProgressTasks || 0, color: 'bg-blue-500', total: dashboardData?.totalTasks || 1 },
                { label: 'Pending', value: dashboardData?.pendingTasks || 0, color: 'bg-amber-500', total: dashboardData?.totalTasks || 1 },
              ].map((item, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-600">{item.label}</span>
                    <span className="text-sm font-semibold text-gray-900">{item.value}</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full transition-all duration-500`}
                      style={{ width: `${(item.value / item.total) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-6">
                {[
                  { label: 'Completed', color: 'bg-emerald-500' },
                  { label: 'In Progress', color: 'bg-blue-500' },
                  { label: 'Pending', color: 'bg-amber-500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-xs text-gray-500">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Tasks */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Recent Tasks</h3>
              <a
                href="/admin/tasks"
                className="text-sm font-medium text-primary hover:text-purple-700 transition-colors"
              >
                View All
              </a>
            </div>

            <div className="space-y-4">
              {dashboardData?.recentTasks?.length > 0 ? (
                dashboardData.recentTasks.slice(0, 5).map((task, index) => (
                  <div
                    key={task._id || index}
                    className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
                  >
                    {/* Task Icon */}
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-purple-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>

                    {/* Task Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-primary transition-colors">
                        {task.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-0.5 truncate">
                        {task.assignedTo?.length || 0} team member(s) assigned
                      </p>
                    </div>

                    {/* Priority */}
                    <div className={`flex items-center gap-1 ${getPriorityColor(task.priority)}`}>
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                      <span className="text-xs font-medium capitalize">{task.priority}</span>
                    </div>

                    {/* Status Badge */}
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(task.status)}`}>
                      {task.status}
                    </span>

                    {/* Arrow Icon */}
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <p className="text-gray-500 font-medium">No tasks yet</p>
                  <p className="text-gray-400 text-sm mt-1">Create your first task to get started</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Team Members Quick View */}
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Team Members</h3>
            <a
              href="/admin/user"
              className="text-sm font-medium text-primary hover:text-purple-700 transition-colors"
            >
              Manage Team
            </a>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {dashboardData?.teamMembers?.slice(0, 6).map((member, index) => (
              <div
                key={member._id || index}
                className="flex flex-col items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-white font-semibold text-lg shadow-lg overflow-hidden mb-3">
                  {member.profileImageUrl ? (
                    <img
                      src={member.profileImageUrl}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    member.name?.charAt(0).toUpperCase() || 'U'
                  )}
                </div>
                <p className="text-sm font-medium text-gray-900 text-center truncate w-full group-hover:text-primary transition-colors">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{member.role}</p>
              </div>
            )) || (
                <div className="col-span-full text-center py-8">
                  <p className="text-gray-500">No team members found</p>
                </div>
              )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;