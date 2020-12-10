import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  console.log(req.params);
  if (typeof (req.params.id) === 'string') {
    res.send(patientService.getPat(req.params.id));
  } else {
    res.status(400).send({error: "Malformed query"});
  }
});
router.get('/', (_req, res) => {
  res.send(patientService.getPats());
});
router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);
    const addedPatient = patientService.addPat(newPatient);
    res.json(addedPatient);
  } catch (e) {
    console.log(e);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;