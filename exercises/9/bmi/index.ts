import express from 'express'
import { calculateBmi } from './bmiCalculator'
const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  let height = Number(req.query.height)
  let weight = Number(req.query.weight)
  if (isNaN(height) || isNaN(weight)) {
    return res.status(400).send({
      error: "malformatted parameters"
    })
  }
  const bmi = calculateBmi(height, weight)
  return res.send({
    weight: weight,
    height: height,
    bmi: bmi
  })
})

const PORT = 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})