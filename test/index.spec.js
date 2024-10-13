import app from '../src/app.js';
import request from 'supertest';

describe('GET /tasks', () => {
  test('should respond with a 200 status code', async() => {
    const response = await request(app).get('/tasks').send();
    expect(response.statusCode).toBe(200);
  });

  test('Should respond with an array', async () => {
    const response = await request(app).get('/tasks').send();
    expect(response.body).toBeInstanceOf(Array);
  })
})

describe('POST /tasks', ()=> {

  const newTask = {
    title: "test task",
    description: "test description"
  }

  describe('when given a title and a description', () => {
    test('should respond with a 200 status code', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.statusCode).toBe(200);
    });

    test('should respond in the header with a content-type of application/json', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
    });

    test('should respond with a ID', async () => {
      const response = await request(app).post('/tasks').send(newTask);
      expect(response.body.id).toBeDefined();
    })
  })

  describe('when title and description is missing', () => {

    const fields = [
      {},
      {title: 'title'},
      {description: 'description'},
    ]

    test('should respond with a 400 status code', async () => {

      for (const body of fields) {
        const response = await request(app).post('/tasks').send(body);
        expect(response.statusCode).toBe(400);
      }
    })
  })

})