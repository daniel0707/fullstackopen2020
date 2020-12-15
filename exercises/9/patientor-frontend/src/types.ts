export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export enum HealthCheckEnum {
  HealthCheck="HealthCheck",
  Hospital="Hospital",
  OccupationalHealthcare="OccupationalHealthcare",
}

export interface HealthCheckEntry extends BaseEntry {
  type: HealthCheckEnum.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface HospitalEntry extends BaseEntry {
  type: HealthCheckEnum.Hospital;
  discharge?: {
    date: string;
    criteria: string;
  };
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: HealthCheckEnum.OccupationalHealthcare;
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface NewEntry extends Omit<HospitalEntry, "type"|"id">,
Omit<OccupationalHealthcareEntry,"type"|"id">,
Omit<HealthCheckEntry,"type"|"id">{
  type: HealthCheckEnum;
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}
