import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator, args } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({
      error: "malformatted parameters"
    });
  }
  const bmi = calculateBmi(height, weight);
  return res.send({
    weight: weight,
    height: height,
    bmi: bmi
  });
});

app.post('/exercise', (req, res) => {
  const { hours, target } = req.body as args;
  if (hours === null || target === null) res.status(400).send({
    error: "paremeters missing"
  });
  try {
    if (hours.some(isNaN)) throw new Error();
    const x = exerciseCalculator(target, hours);
    res.send(x);
  } catch (e) {
    res.status(400).send({
      error: "malformatted parameters"
    });
  }
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});