import diagnoses from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diags: Array<Diagnosis> = diagnoses;

const getDiags = (): Array<Diagnosis> => {
  return diags;
};

export default { getDiags };