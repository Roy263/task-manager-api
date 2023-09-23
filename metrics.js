const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const { Sequelize } = require('sequelize');

// Get task metrics
router.get('/metrics', async (req, res) => {
  try {
    const metrics = await Task.findAll({
      attributes: [
        [Sequelize.fn('COUNT', Sequelize.literal('DISTINCT "Task"."id"')), 'total'],
        [Sequelize.literal('COUNT(CASE WHEN "Task"."status" = \'open\' THEN 1 END)'), 'open_tasks'],
        [Sequelize.literal('COUNT(CASE WHEN "Task"."status" = \'inprogress\' THEN 1 END)'), 'inprogress_tasks'],
        [Sequelize.literal('COUNT(CASE WHEN "Task"."status" = \'completed\' THEN 1 END)'), 'completed_tasks'],
        [Sequelize.literal('TO_CHAR("Task"."createdAt", \'Month YYYY\')'), 'date'],
      ],
      group: ['date'],
      order: [['date', 'ASC']],
    });

    return res.status(200).json(metrics);
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
