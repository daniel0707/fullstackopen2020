import patients from '../../data/patients';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';
import {v4} from 'uuid';

const pats: Array < Patient > = patients;

const getPats = (): Array<PublicPatient> => {
  return pats.map(
    ({ id, dateOfBirth, name, gender, occupation }) => ({
      id, dateOfBirth, name, gender, occupation
    })
  );
};

const addPatientEntry = (entry: NewEntry, id: string): Patient | undefined => {
  const newEntry: Entry = {
    id: v4(),
    ...entry
  };
  const patient = pats.find(p => p.id === id);
  if (!patient) {
    return undefined; 
  }
  const modifiedPatient = {
    ...patient,
    entries: [...patient.entries, newEntry]
  };
  pats.map(p => p.id === id ? modifiedPatient : p);
  return modifiedPatient;
};

const getPat = (id:string): Patient | undefined => {
  return pats.find(p=> p.id===id);
};

const addPat = (pat: NewPatient): Patient => {
  const newPat = {
    id: v4(),
    ...pat
  };

  pats.push(newPat);
  return newPat;
};

export default { getPats, addPat, getPat, addPatientEntry };