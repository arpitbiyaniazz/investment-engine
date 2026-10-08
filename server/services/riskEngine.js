const aiService = require('./aiService');
const {
    RISK_IDENTITY_PROMPT,
    MARKET_REGIME_PROMPT,
    CAPITAL_ALLOCATION_PROMPT,
    BEHAVIORAL_ISOLATION_PROMPT,
    NARRATIVE_ANALYSIS_PROMPT
} = require('../utils/prompts');

const processFullAnalysis = async (userProfile, marketContext, marketData) => {
    // 1. Parallel Execution of Independent Modules
    console.log("Starting analysis...");

    const [riskIdentity, marketRegime, narrativeAnalysis, behavioralAnalysis] = await Promise.all([
        aiService.generateModuleOutput('RISK_IDENTITY', RISK_IDENTITY_PROMPT, userProfile),
        aiService.generateModuleOutput('MARKET_REGIME', MARKET_REGIME_PROMPT, marketData),
        aiService.generateModuleOutput('NARRATIVE_ANALYSIS', NARRATIVE_ANALYSIS_PROMPT, marketContext),
        aiService.generateModuleOutput('BEHAVIORAL_FIREWALL', BEHAVIORAL_ISOLATION_PROMPT, userProfile)
    ]);

    // 2. Dependent Execution: Capital Allocation needs Risk ID + Market Regime
    const allocationInput = {
        risk_identity: riskIdentity,
        market_regime: marketRegime,
        current_portfolio: userProfile.portfolio || {}
    };

    const capitalAllocation = await aiService.generateModuleOutput(
        'CAPITAL_ALLOCATION',
        CAPITAL_ALLOCATION_PROMPT,
        allocationInput
    );

    // 3. Compile Master Response
    const executiveSummary = `Risk Identity: ${riskIdentity.risk_statement} Regime: ${marketRegime.regime_type}. Allocation: ${capitalAllocation.reasoning}`;

    return {
        risk_identity: riskIdentity,
        market_regime: marketRegime,
        capital_allocation: capitalAllocation,
        behavioral_alerts: behavioralAnalysis.alerts_triggered || [],
        behavioral_analysis: behavioralAnalysis, // Include full details
        narrative_analysis: narrativeAnalysis,
        executive_summary: executiveSummary
    };
};

module.exports = {
    processFullAnalysis
};
