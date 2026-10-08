const {
    BASE_SYSTEM_PROMPT,
    RISK_IDENTITY_PROMPT,
    MARKET_REGIME_PROMPT,
    CAPITAL_ALLOCATION_PROMPT,
    BEHAVIORAL_ISOLATION_PROMPT,
    NARRATIVE_ANALYSIS_PROMPT
} = require('../utils/prompts');

const isMock = process.env.MOCK_MODE === 'true';

// Mock Logic Helper
const getMockResponse = (module, data) => {
    // Simple logic to vary mock output based on input if possible
    const isAggressive = JSON.stringify(data).toLowerCase().includes('aggressive') || JSON.stringify(data).toLowerCase().includes('high return');

    switch (module) {
        case 'RISK_IDENTITY':
            return {
                max_tolerable_drawdown: isAggressive ? 0.25 : 0.12,
                recovery_patience_months: isAggressive ? 6 : 18,
                income_dependence: "low",
                emotional_volatility_score: isAggressive ? 75 : 30,
                confidence_score: 0.85,
                risk_statement: isAggressive
                    ? "You seek high returns but show signs of impatience. Volatility capacity is high, but behavioral risk is elevated."
                    : "You are a capital preservationist. Downside protection is the primary constraint."
            };
        case 'MARKET_REGIME':
            return {
                regime_type: "high_volatility",
                crash_probability_6m: 0.35,
                regime_description: "Liquidity contracting due to central bank tightening. Correlation breakdown observed across asset classes."
            };
        case 'CAPITAL_ALLOCATION':
            return {
                equity_exposure: isAggressive ? 0.60 : 0.30,
                cash_allocation: isAggressive ? 0.30 : 0.50,
                defensive_allocation: 0.10, // Gold/Bonds
                scaling_guidance: "reduce",
                reasoning: "Market regime risk is elevated. Reducing equity beta while maintaining some asymmetric upside exposure."
            };
        case 'BEHAVIORAL_FIREWALL':
            return {
                alerts_triggered: ["FOMO Entry Detected", "Trade Frequency Spike"],
                intervention_required: true,
                max_position_cap_override: 0.05
            };
        case 'NARRATIVE_ANALYSIS':
            return {
                dominant_narrative: "AI Supercycle lasts forever",
                narrative_strength: 95,
                reality_gap: "high",
                assessment: "Theme is priced for perfection. Asymmetric downside risk is high."
            };
        default:
            return {};
    }
};

const generateModuleOutput = async (moduleName, prompt, data) => {
    if (isMock) {
        console.log(`[Mock AI] Generating ${moduleName}...`);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return getMockResponse(moduleName, data);
    }

    // TODO: Implement OpenAI Call here
    // const completion = await openai.chat.completions.create({...})
    console.warn("Real AI not implemented yet, falling back to mock");
    return getMockResponse(moduleName, data);
};

module.exports = {
    generateModuleOutput
};
