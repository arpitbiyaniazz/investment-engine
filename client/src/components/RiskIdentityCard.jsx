import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';

const RiskIdentityCard = ({ data }) => {
    if (!data) return null; // Loading state handled by parent

    const { max_tolerable_drawdown, recovery_patience_months, income_dependence, risk_statement } = data;

    return (
        <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4 text-finance-accent">
                <Shield size={20} />
                <h3 className="font-mono text-sm uppercase tracking-wider">Risk Identity</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-gray-400 text-xs uppercase mb-1">Risk Statement</p>
                    <p className="text-sm border-l-2 border-finance-accent pl-3 text-white italic">"{risk_statement}"</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-3 rounded">
                        <p className="text-gray-400 text-xs">Max Drawdown</p>
                        <p className="text-xl font-bold text-finance-red">{(max_tolerable_drawdown * 100).toFixed(1)}%</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded">
                        <p className="text-gray-400 text-xs">Patience</p>
                        <p className="text-xl font-bold text-white">{recovery_patience_months} <span className="text-sm font-normal text-gray-400">mo</span></p>
                    </div>
                </div>

                <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">Income Dependence</span>
                    <span className={`px-2 py-0.5 rounded text-xs uppercase ${income_dependence === 'high' ? 'bg-red-500/20 text-red-300' : 'bg-green-500/20 text-green-300'}`}>
                        {income_dependence}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default RiskIdentityCard;
