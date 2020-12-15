/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { v4 } from 'uuid';
import { Gender, NewPatient, HealthCheckEnum, NewEntry, Diagnosis, Entry, BaseEntry, HealthCheckRating} from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name: ${name}`);
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error(`Incorrect or missing ssn: ${ssn}`);
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation: ${occupation}`);
  }
  return occupation;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender ${gender}`);
  }
  return gender;
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date of birth: ${date}`);
  }
  return date;
};

export const isValidEntry = (entry: any): void => {
  if (!entry || !(entry.type in HealthCheckEnum)) throw new Error("Not a valid entry!");
};

const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error(`Incorrect or missing description: ${description}`);
  }
  return description;
};

const parseEventDate = (date: any): string => {
  if (!date || !isString(date)) {
    throw new Error(`Incorrect or missing date: ${date}`);
  }
  return date;
};

const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error(`Incorrect or missing description: ${specialist}`);
  }
  return specialist;
};

const parseDiagnosisCodes = (codes: any): Array<Diagnosis['code']> | undefined => {
  if (codes == null) {
    return undefined;
  }
  if (!Array.isArray(codes)) {
    throw new Error(`Diagnosis Codes must be of type Array, fund: ${codes}`);
  }
  codes.forEach((code) => {
    if (!code || !isString(code)){
      throw new Error(`Diagnosis Code must be of type String, found: ${code}`);
    }
  });
  return codes as Array<Diagnosis['code']>;
};

const parseRating = (rating: any): HealthCheckRating => {
  if (!rating || !(rating in HealthCheckRating)) {
    throw new Error(`Health check rating is missing or is malformed: ${rating}`);
  }
  return rating as HealthCheckRating; //typescript not picking up the above check?
};

const parseDischarge = (discharge: any): { date: string, criteria: string } | undefined => {
  if (!discharge || discharge==={}) {
    return undefined;
  }
  if (!discharge.date
    || !isString(discharge.date)
    || !isDate(discharge.date)
    || !discharge.criteria
    || !isString(discharge.criteria)) {
    throw new Error(`Discharge information is malformed or is missing properties: ${discharge}`);
  } 
    return {
      date: discharge.date as string,
      criteria: discharge.criteria as string //again typecript not picking up check from above
    };
};

const parseSickLeave = (leave: any): { startDate: string, endDate: string } | undefined => {
  if (!leave || leave==={}) {
    return undefined;
  }
  if (!leave.startDate
    || !isString(leave.startDate)
    || !isDate(leave.startDate)
    || !leave.endDate
    || !isString(leave.endDate)
    || !isDate(leave.endDate)) {
    throw new Error(`Sick leave information is malformed or is missing properties: ${leave}`);
  } 
    return {
      startDate: leave.startDate as string,
      endDate: leave.endDate as string //again typecript not picking up check from above
    };
};

const parseEmployerName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Employer name is missing or is malformed`);
  }
  return name;
};

export const toNewEntry = (entry: any): NewEntry => {
  const codes: Array<Diagnosis['code']> | undefined = parseDiagnosisCodes(entry.diagnosisCodes);
  const newBaseEntry: Omit<BaseEntry,"id"> = Object.assign({},
    {
      id: v4(),
      description: parseDescription(entry.description),
      date: parseEventDate(entry.date),
      specialist: parseSpecialist(entry.specialist)
    },
    entry.diagnosisCodes === undefined ? null : {
      diagnosisCodes: codes
    }
  );
  switch (entry.type) {
    case HealthCheckEnum.HealthCheck:
      return {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: parseRating(entry.healthCheckRating)
      };
    case HealthCheckEnum.Hospital:
      const discharge = parseDischarge(entry.discharge);
      return {
        ...newBaseEntry,
        ...discharge,
        type: "Hospital",
      };
    case HealthCheckEnum.OccupationalHealthcare:
      const leave = parseSickLeave(entry.sickLeave);
      return {
        type: "OccupationalHealthcare",
        ...newBaseEntry,
        ...leave,
        employerName: parseEmployerName(entry.employerName),
      };
    default:
      throw new Error(`Malformed entry or missing entry type: ${entry}`);
  }
};

const toNewPatient = (obj: any): NewPatient => {
  for (const entry of obj?.entries) {
    isValidEntry(entry);
  }
  const entries: Entry[] = obj.entries? obj.entries as Entry[] : [];
  return {
    name: parseName(obj.name),
    dateOfBirth: parseDate(obj.dateOfBirth),
    ssn: parseSsn(obj.ssn),
    gender: parseGender(obj.gender),
    occupation: parseOccupation(obj.occupation),
    entries: entries
  };
};

export default toNewPatient;