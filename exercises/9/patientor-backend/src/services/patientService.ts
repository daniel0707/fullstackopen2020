import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient } from '../types';
import {v4} from 'uuid';

const pats: Array < Patient > = patients;

const getPats = (): Array<PublicPatient> => {
  return pats.map(
    ({ id, dateOfBirth, name, gender, occupation }) => ({
      id, dateOfBirth, name, gender, occupation
    })
  );
};

const addPat = (pat: NewPatient): Patient => {
  const newPat = {
    id: v4(),
    ...pat
  };

  pats.push(newPat);
  return newPat;
};

export default { getPats, addPat };