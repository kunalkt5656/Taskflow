import React, { useState } from 'react';

const TodoListInput = ({
    items = [],
    onChange,
    label,
    placeholder = 'Add a new item',
    error,
    disabled = false,
}) => {
    const [newItem, setNewItem] = useState('');

    // Add new item
    const handleAdd = () => {
        if (newItem.trim() && !disabled) {
            const newTodo = {
                text: newItem.trim(),
                completed: false,
            };
            onChange([...items, newTodo]);
            setNewItem('');
        }
    };

    // Handle enter key
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAdd();
        }
    };

    // Toggle item completion
    const toggleItem = (index) => {
        if (disabled) return;
        const updatedItems = [...items];
        updatedItems[index] = {
            ...updatedItems[index],
            completed: !updatedItems[index].completed,
        };
        onChange(updatedItems);
    };

    // Remove item
    const removeItem = (index) => {
        if (disabled) return;
        onChange(items.filter((_, i) => i !== index));
    };

    // Update item text
    const updateItemText = (index, text) => {
        if (disabled) return;
        const updatedItems = [...items];
        updatedItems[index] = { ...updatedItems[index], text };
        onChange(updatedItems);
    };

    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-gray-700 mb-2">
                    {label}
                </label>
            )}

            {/* Add Input */}
            <div className="flex gap-3 mb-4">
                <div className="flex-1 relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={placeholder}
                        disabled={disabled}
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all disabled:opacity-50"
                    />
                </div>
                <button
                    type="button"
                    onClick={handleAdd}
                    disabled={disabled || !newItem.trim()}
                    className="px-5 py-3 bg-gradient-to-r from-primary to-purple-600 text-white font-medium rounded-xl hover:shadow-lg hover:shadow-primary/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                >
                    Add
                </button>
            </div>

            {/* Todo List */}
            {items.length > 0 && (
                <div className="space-y-2">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`flex items-center gap-3 p-3 rounded-xl group transition-colors
                ${item.completed ? 'bg-emerald-50' : 'bg-gray-50 hover:bg-gray-100'}
              `}
                        >
                            {/* Checkbox */}
                            <button
                                type="button"
                                onClick={() => toggleItem(index)}
                                disabled={disabled}
                                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0
                  ${item.completed
                                        ? 'bg-emerald-500 border-emerald-500'
                                        : 'border-gray-300 hover:border-primary'
                                    }
                `}
                            >
                                {item.completed && (
                                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </button>

                            {/* Text */}
                            <input
                                type="text"
                                value={item.text}
                                onChange={(e) => updateItemText(index, e.target.value)}
                                disabled={disabled}
                                className={`flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-sm
                  ${item.completed ? 'line-through text-gray-400' : 'text-gray-700'}
                `}
                            />

                            {/* Delete Button */}
                            <button
                                type="button"
                                onClick={() => removeItem(index)}
                                disabled={disabled}
                                className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all disabled:opacity-0"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                            </button>
                        </div>
                    ))}

                    {/* Progress */}
                    <div className="flex items-center justify-between pt-2 text-sm">
                        <span className="text-gray-500">
                            {items.filter(i => i.completed).length} of {items.length} completed
                        </span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-300"
                                style={{ width: `${(items.filter(i => i.completed).length / items.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {items.length === 0 && (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <p className="text-gray-500 font-medium">No items yet</p>
                    <p className="text-gray-400 text-sm mt-1">Add items to create a checklist</p>
                </div>
            )}

            {error && (
                <p className="mt-1.5 text-sm text-red-500">{error}</p>
            )}
        </div>
    );
};

export default TodoListInput;
