import express from 'express';
import patientService from '../services/patientService';
import toNewPatient, { isValidEntry } from '../utils';

const router = express.Router();

router.get('/:id', (req, res) => {
  if (typeof (req.params.id) === 'string') {
    try {
      const p = patientService.getPat(req.params.id);
      if (p) {
        for (const entry of p.entries) {
          isValidEntry(entry);
        }
        res.send(p);
      } else {
        res.status(404).send();
      }

    } catch (e) {
      res.status(500).send(e);
    }
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
    res.status(400).send(e);
  }
});

export default router;