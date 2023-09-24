// utils/validations.js

const { body, param, query, validationResult } = require('express-validator');

// Validation middleware for creating a task
exports.validateCreateTask = [
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').optional(), // Description is optional
  body('status').not().isEmpty().withMessage('Status is required'),
];

// Validation middleware for updating a task
exports.validateUpdateTask = [
  param('id').isInt().withMessage('Task ID must be an integer'),
  body('title').not().isEmpty().withMessage('Title is required'),
  body('description').optional(), // Description is optional
  body('status').not().isEmpty().withMessage('Status is required'),
];

// Validation middleware for getting tasks with pagination
exports.validateGetTasks = [
  query('page').optional().isInt().withMessage('Page must be an integer'),
  query('perPage').optional().isInt().withMessage('PerPage must be an integer'),
];

// Validation middleware for deleting a task
exports.validateDeleteTask = [
  param('id').isInt().withMessage('Task ID must be an integer'),
];

// Validation middleware for getting task metrics
exports.validateGetMetrics = [];
