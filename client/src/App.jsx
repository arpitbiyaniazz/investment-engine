import React, { useState } from 'react';
import { analyzeProfile } from './services/api';
import RiskIdentityCard from './components/RiskIdentityCard';
import MarketRegimeCard from './components/MarketRegimeCard';
import CapitalAllocationCard from './components/CapitalAllocationCard';
import { Play, RotateCcw, AlertOctagon, TrendingUp, Cpu } from 'lucide-react';
import clsx from 'clsx';

function App() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [inputs, setInputs] = useState({
    description: "I am a growth investor but I hate losing more than 15%. I panic when markets drop.",
    marketData: "Volatility is rising, central banks are tightening liquidity.",
    narrative: "Everyone is saying AI is the future and tech stocks will go up forever."
  });

  const handleAnalyze = async () => {
    setLoading(true);
    try {
      // Mock data expansion to match server schema
      const payload = {
        userProfile: { description: inputs.description },
        marketData: { summary: inputs.marketData }, // API handles parsing
        marketContext: inputs.narrative
      };

      const data = await analyzeProfile(payload);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen p-8 bg-finance-dark font-sans text-gray-200 selection:bg-finance-accent selection:text-black">
      <header className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Cpu className="text-finance-accent" size={32} />
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white uppercase">Antigravity</h1>
            <p className="text-xs text-gray-500 font-mono tracking-widest uppercase">Investment Intelligence Engine</p>
          </div>
        </div>

        {/* Connection Status Indicator could go here */}
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          <span className="text-xs font-mono text-gray-400">SYSTEM ONLINE</span>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* INPUT SECTION */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-6 border-l-4 border-finance-accent">
            <h2 className="text-sm font-mono uppercase text-gray-400 mb-4">Core Signals Input</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">Investor Profile / Behavior</label>
                <textarea
                  className="w-full bg-black/30 border border-white/10 rounded h-24 p-2 text-sm focus:border-finance-accent focus:outline-none transition-colors"
                  value={inputs.description}
                  onChange={(e) => setInputs({ ...inputs, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">Market Data Signals</label>
                <textarea
                  className="w-full bg-black/30 border border-white/10 rounded h-20 p-2 text-sm focus:border-finance-accent focus:outline-none transition-colors"
                  value={inputs.marketData}
                  onChange={(e) => setInputs({ ...inputs, marketData: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-gray-500 mb-2">Narrative / News Context</label>
                <textarea
                  className="w-full bg-black/30 border border-white/10 rounded h-20 p-2 text-sm focus:border-finance-accent focus:outline-none transition-colors"
                  value={inputs.narrative}
                  onChange={(e) => setInputs({ ...inputs, narrative: e.target.value })}
                />
              </div>
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading}
              className="mt-6 w-full bg-finance-accent hover:bg-cyan-400 text-black font-bold py-3 rounded flex items-center justify-center gap-2 transition-all"
            >
              {loading ? (
                <RotateCcw className="animate-spin" size={20} />
              ) : (
                <>
                  <Play size={20} />
                  <span>Execute Analysis</span>
                </>
              )}
            </button>
          </div>

          {/* BEHAVIORAL FIREWALL ALERTS */}
          {result?.behavioral_alerts?.length > 0 && (
            <div className="glass-panel p-6 border-l-4 border-finance-red bg-red-900/10">
              <div className="flex items-center gap-2 mb-4 text-finance-red">
                <AlertOctagon size={20} />
                <h3 className="font-mono text-sm uppercase tracking-wider">Behavioral Firewall</h3>
              </div>
              <ul className="space-y-2">
                {result.behavioral_alerts.map((alert, i) => (
                  <li key={i} className="text-sm text-red-200 bg-red-500/10 px-3 py-2 rounded flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                    {alert}
                  </li>
                ))}
              </ul>
              {result.behavioral_analysis?.intervention_required && (
                <div className="mt-4 text-center">
                  <span className="inline-block px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/50 rounded text-xs font-bold uppercase animate-pulse">
                    Intervention Required
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* OUTPUT DASHBOARD */}
        <div className="lg:col-span-8 space-y-6">
          {!result && !loading && (
            <div className="h-full flex flex-col items-center justify-center opacity-30">
              <Cpu size={64} />
              <p className="mt-4 font-mono text-sm">AWAITING INPUT SIGNALS</p>
            </div>
          )}

          {result && (
            <>
              {/* TOP ROW: Risk + Regime */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <RiskIdentityCard data={result.risk_identity} />
                <MarketRegimeCard data={result.market_regime} />
              </div>

              {/* MIDDLE ROW: Allocation + Narrative */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CapitalAllocationCard data={result.capital_allocation} />

                {/* Narrative Panel (Inline for now) */}
                <div className="glass-panel p-6">
                  <div className="flex items-center gap-2 mb-4 text-purple-400">
                    <TrendingUp size={20} />
                    <h3 className="font-mono text-sm uppercase tracking-wider">Narrative vs Reality</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-3 rounded">
                      <p className="text-gray-400 text-xs uppercase">Dominant Narrative</p>
                      <p className="text-sm text-white">{result.narrative_analysis.dominant_narrative}</p>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-3 rounded">
                      <p className="text-gray-400 text-xs uppercase">Reality Gap</p>
                      <p className={`text-sm font-bold uppercase ${result.narrative_analysis.reality_gap === 'high' ? 'text-finance-red' : 'text-gray-300'
                        }`}>{result.narrative_analysis.reality_gap}</p>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {result.narrative_analysis.assessment}
                    </p>
                  </div>
                </div>
              </div>

              {/* EXECUTIVE SUMMARY */}
              <div className="glass-panel p-6 border-t-2 border-white/20">
                <h3 className="font-mono text-xs uppercase text-gray-500 mb-2">Executive Summary</h3>
                <p className="text-lg text-white font-light">
                  {result.executive_summary}
                </p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
