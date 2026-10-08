const express = require('express');
const router = express.Router();
const riskEngine = require('../services/riskEngine');

router.post('/analyze', async (req, res) => {
    try {
        const { userProfile, marketContext, marketData } = req.body;

        // Orchestrate the analysis
        const result = await riskEngine.processFullAnalysis(userProfile, marketContext, marketData);

        res.json(result);
    } catch (error) {
        console.error('Analysis Error:', error);
        res.status(500).json({ error: 'Internal Analysis Error', details: error.message });
    }
});

module.exports = router;
