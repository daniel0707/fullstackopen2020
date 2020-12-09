import patients from '../../data/patients';
import { Patient, PublicPatient } from '../types';

const pats: Array < Patient > = patients;

const getPats = (): Array<PublicPatient> => {
  return pats.map(
    ({ id, dateOfBirth, name, gender, occupation }) => ({
      id, dateOfBirth, name, gender, occupation
    })
  );
};

export default { getPats };