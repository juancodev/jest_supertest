import express from 'express';
import {
  v4 as uuidv4
} from 'uuid';

const app = express();

app.use(express.json());

app.get('/', async (req, res, next) => {
  res.send('Hello World!');
});

app.get('/tasks', async (req, res, next) => {
  res.json([]);
});

app.post('/tasks', async (req, res, next) => {
  const {title, description} = req.body;

  if (!title || !description) return res.sendStatus(400);

  res.json({
    id: uuidv4(),
    title,
    description
  });
})

export default app;