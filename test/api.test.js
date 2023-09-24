const { expect } = require('chai');
const request = require('supertest');
const app = require('../app'); 

describe('Task API Tests', () => {
  let taskId; // Store the created task's ID for testing

  // Test the creation of a task
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({
        title: 'Test Task',
        description: 'This is a test task',
        status: 'open',
      });

    expect(res.status).to.equal(201);
    expect(res.body).to.be.an('object');
    expect(res.body.title).to.equal('Test Task');
    expect(res.body.description).to.equal('This is a test task');
    expect(res.body.status).to.equal('open');

    // Store the created task's ID for later tests
    taskId = res.body.id;
  });

  // Test updating a task
  it('should update a task', async () => {
    const res = await request(app)
      .put(`/tasks/${taskId}`)
      .send({
        title: 'Updated Task',
        description: 'This task has been updated',
        status: 'completed',
      });

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('object');
    expect(res.body.title).to.equal('Updated Task');
    expect(res.body.description).to.equal('This task has been updated');
    expect(res.body.status).to.equal('completed');
  });

  // Test getting all tasks with pagination
  it('should get all tasks with pagination', async () => {
    const res = await request(app).get('/tasks?page=1&perPage=10');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    
  });

  // Test deleting a task
  it('should delete a task', async () => {
    const res = await request(app).delete(`/tasks/${taskId}`);

    expect(res.status).to.equal(204);
  });

  // Test getting task metrics
  it('should get task metrics', async () => {
    const res = await request(app).get('/tasks/metrics');

    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
    
  });
});
