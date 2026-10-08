import React from 'react';
import { Activity } from 'lucide-react';

const MarketRegimeCard = ({ data }) => {
    if (!data) return null;

    const { regime_type, crash_probability_6m, regime_description } = data;

    return (
        <div className="glass-panel p-6">
            <div className="flex items-center gap-2 mb-4 text-finance-gold">
                <Activity size={20} />
                <h3 className="font-mono text-sm uppercase tracking-wider">Market Regime</h3>
            </div>

            <div className="space-y-4">
                <div>
                    <p className="text-gray-400 text-xs uppercase mb-1">Current State</p>
                    <p className="text-lg font-bold text-white uppercase">{regime_type.replace('_', ' ')}</p>
                </div>

                <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Crash Probability (6m)</span>
                        <span>{(crash_probability_6m * 100).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                        <div
                            className={`h-full ${crash_probability_6m > 0.3 ? 'bg-finance-red' : 'bg-finance-green'}`}
                            style={{ width: `${crash_probability_6m * 100}%` }}
                        ></div>
                    </div>
                </div>

                <p className="text-xs text-gray-400 leading-relaxed border-t border-white/10 pt-3">
                    {regime_description}
                </p>
            </div>
        </div>
    );
};

export default MarketRegimeCard;
