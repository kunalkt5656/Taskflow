import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg border border-gray-100">
                {label && (
                    <p className="text-sm font-semibold text-gray-900 mb-2">{label}</p>
                )}
                <div className="space-y-1">
                    {payload.map((entry, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: entry.color || entry.payload?.fill }}
                            />
                            <span className="text-sm text-gray-600">
                                {entry.name || entry.dataKey}:
                            </span>
                            <span className="text-sm font-semibold text-gray-900">
                                {entry.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
    return null;
};

export default CustomTooltip;
