import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Layers } from 'lucide-react';

const CapitalAllocationCard = ({ data }) => {
    if (!data) return null;

    const { equity_exposure, cash_allocation, defensive_allocation, scaling_guidance, reasoning } = data;

    const chartData = [
        { name: 'Equity', value: equity_exposure, color: '#00d1ff' }, // finance-accent
        { name: 'Cash', value: cash_allocation, color: '#16a34a' }, // Greenish
        { name: 'Defensive', value: defensive_allocation, color: '#ffd700' }, // Gold
    ];

    return (
        <div className="glass-panel p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-finance-green">
                    <Layers size={20} />
                    <h3 className="font-mono text-sm uppercase tracking-wider">Allocation Brain</h3>
                </div>
                <span className="text-xs px-2 py-1 bg-white/10 rounded uppercase font-bold text-white">
                    Action: <span className={scaling_guidance === 'reduce' ? 'text-red-400' : 'text-green-400'}>{scaling_guidance}</span>
                </span>
            </div>

            <div className="h-48 w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={chartData}
                            innerRadius={50}
                            outerRadius={70}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{ backgroundColor: '#161923', border: 'none', color: '#fff' }}
                            itemStyle={{ color: '#fff' }}
                            formatter={(value) => `${(value * 100).toFixed(0)}%`}
                        />
                    </PieChart>
                </ResponsiveContainer>
                {/* Center Text */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-2xl font-bold text-white">
                        {(equity_exposure * 100).toFixed(0)}%
                    </span>
                </div>
            </div>

            <div className="flex justify-center gap-4 text-xs font-mono mb-4 text-gray-400">
                {chartData.map(d => (
                    <div key={d.name} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                        {d.name}
                    </div>
                ))}
            </div>

            <p className="text-sm bg-white/5 p-3 rounded text-gray-300">
                {reasoning}
            </p>
        </div>
    );
};

export default CapitalAllocationCard;
