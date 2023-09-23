const express = require('express');
const router = express.Router();
const Task = require('./models/Task');
const { Sequelize } = require('sequelize');

// Create a new task
router.post('/', async (req, res) => {
    try {
        const task = await Task.create(req.body);
        return res.status(201).json(task);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Server error' });
    }
});

// Update a task
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.update(req.body);
        return res.status(200).json(task);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

// Get all tasks with pagination
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Current page, default to 1
        const perPage = parseInt(req.query.perPage) || 10; // Items per page, default to 10

        const offset = (page - 1) * perPage;

        const tasks = await Task.findAll({
            limit: perPage,
            offset: offset,
        });

        return res.status(200).json(tasks);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});


// Delete a task
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        await task.destroy();
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get('/metrics', async (req, res) => {
    try {
      const metrics = await Task.findAll({
        attributes: [
          [Sequelize.fn('COUNT', Sequelize.literal('DISTINCT `Task`.`id`')), 'total'],
          [Sequelize.literal('COUNT(CASE WHEN `Task`.`status` = \'open\' THEN 1 END)'), 'open_tasks'],
          [Sequelize.literal('COUNT(CASE WHEN `Task`.`status` = \'inprogress\' THEN 1 END)'), 'inprogress_tasks'],
          [Sequelize.literal('COUNT(CASE WHEN `Task`.`status` = \'completed\' THEN 1 END)'), 'completed_tasks'],
          [Sequelize.literal('DATE_FORMAT(`Task`.`createdAt`, \'%M %Y\')'), 'date'],
        ],
        group: ['date'],
        order: [['date', 'ASC']],
      });
  
      return res.status(200).json(metrics);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Server error' });
    }
  });
  

module.exports = router;
