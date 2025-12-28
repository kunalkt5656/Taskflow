import React from 'react';

const CustomLegend = ({ payload, onClick }) => {
    if (!payload || payload.length === 0) return null;

    return (
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            {payload.map((entry, index) => (
                <button
                    key={index}
                    onClick={() => onClick && onClick(entry)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer group"
                >
                    <div
                        className="w-3 h-3 rounded-full transition-transform group-hover:scale-110"
                        style={{ backgroundColor: entry.color || entry.payload?.fill }}
                    />
                    <span className="text-sm font-medium text-gray-600 group-hover:text-gray-900 transition-colors">
                        {entry.value}
                    </span>
                    {entry.payload?.value !== undefined && (
                        <span className="text-sm font-semibold text-gray-900">
                            ({entry.payload.value})
                        </span>
                    )}
                </button>
            ))}
        </div>
    );
};

export default CustomLegend;
