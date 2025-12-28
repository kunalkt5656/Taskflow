import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Cell
} from 'recharts';
import CustomTooltip from './Customtooltip';
import CustomLegend from './CustomLegend';

// Default color palette
const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

const CustomBarChart = ({
    data = [],
    bars = [{ dataKey: 'value', name: 'Value', color: '#8b5cf6' }],
    xAxisKey = 'name',
    showGrid = true,
    showLegend = false,
    showTooltip = true,
    height = 300,
    title,
    layout = 'horizontal', // 'horizontal' or 'vertical'
    barRadius = 6,
    barSize = 40,
    stacked = false,
    colors = COLORS,
    onBarClick,
}) => {
    const isVertical = layout === 'vertical';

    if (data.length === 0) {
        return (
            <div className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-100">
                {title && <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>}
                <div
                    className="flex flex-col items-center justify-center text-gray-400"
                    style={{ height }}
                >
                    <svg className="w-16 h-16 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                <BarChart
                    data={data}
                    layout={layout}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    {showGrid && (
                        <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#e5e7eb"
                            vertical={!isVertical}
                            horizontal={isVertical}
                        />
                    )}

                    {isVertical ? (
                        <>
                            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#6b7280', fontSize: 12 }} />
                            <YAxis
                                dataKey={xAxisKey}
                                type="category"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                                width={80}
                            />
                        </>
                    ) : (
                        <>
                            <XAxis
                                dataKey={xAxisKey}
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 12 }}
                            />
                        </>
                    )}

                    {showTooltip && <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.1)' }} />}
                    {showLegend && <Legend content={<CustomLegend />} />}

                    {bars.map((bar, index) => (
                        <Bar
                            key={bar.dataKey}
                            dataKey={bar.dataKey}
                            name={bar.name || bar.dataKey}
                            fill={bar.color || colors[index % colors.length]}
                            radius={[barRadius, barRadius, barRadius, barRadius]}
                            maxBarSize={barSize}
                            stackId={stacked ? 'stack' : undefined}
                            onClick={onBarClick}
                            className="cursor-pointer"
                        >
                            {/* If single bar with per-item colors */}
                            {bars.length === 1 && data.map((entry, idx) => (
                                <Cell
                                    key={`cell-${idx}`}
                                    fill={entry.color || colors[idx % colors.length]}
                                    className="hover:opacity-80 transition-opacity"
                                />
                            ))}
                        </Bar>
                    ))}
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
