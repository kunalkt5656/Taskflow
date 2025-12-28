import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../component/layout/DashboardLayout';
import SelectDropdown from '../../component/Inputs/SelectDropDown';
import SelectUser from '../../component/Inputs/SelectUser';
import TodoListInput from '../../component/Inputs/TodoListinput';
import AddAttachmentsInput from '../../component/Inputs/AddattachmentsInput';
import AvatarGroup from '../../component/layout/AvatarGroup';
import axiosInstance from '../../utils/axiosinstance';
import { API_PATHS } from '../../utils/apiPath';

const CreateTask = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'pending',
    dueDate: '',
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });


  // Priority options
  const priorityOptions = [
    { value: 'low', label: 'Low', icon: '🟢' },
    { value: 'medium', label: 'Medium', icon: '🟡' },
    { value: 'high', label: 'High', icon: '🔴' },
  ];

  // Status options
  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
  ];

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL);
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle dropdown changes
  const handleDropdownChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle checklist changes
  const handleChecklistChange = (items) => {
    setFormData(prev => ({ ...prev, todoChecklist: items }));
  };

  // Handle attachments changes
  const handleAttachmentsChange = (files) => {
    setFormData(prev => ({ ...prev, attachments: files }));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.dueDate) newErrors.dueDate = 'Due date is required';
    if (formData.assignedTo.length === 0) newErrors.assignedTo = 'Please assign at least one team member';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await axiosInstance.post(API_PATHS.TASKS.CREATE, formData);
      navigate('/admin/tasks');
    } catch (error) {
      console.error('Failed to create task:', error);
      setErrors({ submit: error.response?.data?.message || 'Failed to create task' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="max-w-4xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Create New Task</h1>
          <p className="text-gray-500 mt-1">Fill in the details to create a new task</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error Message */}
          {errors.submit && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
              <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-red-700">{errors.submit}</span>
            </div>
          )}

          {/* Main Info Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Task Information</h2>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Task Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter task title"
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
                    ${errors.title ? 'border-red-300' : 'border-gray-200'}
                  `}
                />
                {errors.title && <p className="mt-1.5 text-sm text-red-500">{errors.title}</p>}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Enter task description"
                  rows={4}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all resize-none
                    ${errors.description ? 'border-red-300' : 'border-gray-200'}
                  `}
                />
                {errors.description && <p className="mt-1.5 text-sm text-red-500">{errors.description}</p>}
              </div>

              {/* Priority & Status Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <SelectDropdown
                  label="Priority"
                  options={priorityOptions}
                  value={formData.priority}
                  onChange={(value) => handleDropdownChange('priority', value)}
                  error={errors.priority}
                />
                <SelectDropdown
                  label="Status"
                  options={statusOptions}
                  value={formData.status}
                  onChange={(value) => handleDropdownChange('status', value)}
                  error={errors.status}
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Due Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all
                    ${errors.dueDate ? 'border-red-300' : 'border-gray-200'}
                  `}
                />
                {errors.dueDate && <p className="mt-1.5 text-sm text-red-500">{errors.dueDate}</p>}
              </div>
            </div>
          </div>

          {/* Team Assignment Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Team Assignment</h2>

            <SelectUser
              label="Assign To"
              users={users}
              selectedUsers={formData.assignedTo}
              onChange={(value) => handleDropdownChange('assignedTo', value)}
              placeholder="Select team members to assign"
              error={errors.assignedTo}
            />
          </div>

          {/* Checklist Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Checklist (Optional)</h2>

            <TodoListInput
              items={formData.todoChecklist}
              onChange={handleChecklistChange}
              placeholder="Add a checklist item"
            />
          </div>

          {/* Attachments Card */}
          <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Attachments (Optional)</h2>

            <AddAttachmentsInput
              attachments={formData.attachments}
              onChange={handleAttachmentsChange}
              maxFiles={5}
              maxSizeMB={10}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 text-gray-700 font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Creating...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Create Task
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;