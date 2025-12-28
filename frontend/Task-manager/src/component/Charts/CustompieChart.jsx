import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import CustomTooltip from './Customtooltip';
import CustomLegend from './CustomLegend';

// Default color palette
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const CustomPieChart = ({
    data = [],
    colors = COLORS,
    innerRadius = 60,
    outerRadius = 100,
    showLegend = true,
    showTooltip = true,
    showLabel = false,
    height = 300,
    title,
    dataKey = 'value',
    nameKey = 'name',
    onSliceClick,
}) => {
    // Calculate total for percentage display
    const total = data.reduce((sum, item) => sum + (item[dataKey] || 0), 0);

    // Custom label renderer
    const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, name }) => {
        if (!showLabel || percent < 0.05) return null;

        const RADIAN = Math.PI / 180;
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="white"
                textAnchor="middle"
                dominantBaseline="central"
                className="text-xs font-semibold"
            >
                {`${(percent * 100).toFixed(0)}%`}
            </text>
        );
    };

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
                {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
                <div
                    className="flex flex-col items-center justify-center text-gray-400"
                    style={{ height }}
                >
                    <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    <p className="text-sm font-medium">No data available</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
            {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}

            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={innerRadius}
                        outerRadius={outerRadius}
                        paddingAngle={2}
                        dataKey={dataKey}
                        nameKey={nameKey}
                        labelLine={false}
                        label={showLabel ? renderLabel : false}
                        onClick={onSliceClick}
                        className="cursor-pointer"
                    >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color || colors[index % colors.length]}
                                className="hover:opacity-80 transition-opacity"
                            />
                        ))}
                    </Pie>

                    {showTooltip && <Tooltip content={<CustomTooltip />} />}
                    {showLegend && <Legend content={<CustomLegend />} />}
                </PieChart>
            </ResponsiveContainer>

            {/* Center Text */}
            {innerRadius > 0 && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    style={{ marginTop: title ? '44px' : '0' }}
                >
                    <div className="text-3xl font-bold text-gray-900">{total}</div>
                    <div className="text-sm text-gray-500">Total</div>
                </div>
            )}
        </div>
    );
};

export default CustomPieChart;
