import express from 'express';
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';
import cors, { CorsOptions } from 'cors';
const app = express();

const corsOptions: CorsOptions = {
  origin: 'http://localhost:3000'
}; 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('static'));

const PORT = 3001;

app.use('/api/diagnoses', diagnoseRouter);
app.use('/api/patients', patientRouter);
app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});