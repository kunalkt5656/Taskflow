import React from 'react';

const InfoCard = ({
    title,
    value,
    icon,
    bgGradient = 'from-violet-500 to-purple-600',
    shadowColor = 'shadow-violet-200'
}) => {
    return (
        <div
            className={`relative overflow-hidden bg-white rounded-2xl p-6 shadow-lg ${shadowColor} hover:shadow-xl transition-all duration-300 group`}
        >
            {/* Background Decoration */}
            <div className={`absolute -right-4 -top-4 w-24 h-24 bg-gradient-to-br ${bgGradient} rounded-full opacity-10 group-hover:opacity-20 transition-opacity`} />

            <div className="relative">
                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${bgGradient} rounded-xl text-white shadow-lg mb-4`}>
                    {icon}
                </div>
                <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
                <p className="text-3xl font-bold text-gray-900">{value}</p>
            </div>
        </div>
    );
};

export default InfoCard;
