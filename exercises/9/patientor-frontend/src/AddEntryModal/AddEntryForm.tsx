import React from 'react';
import { useStateValue } from '../state';
import { Grid, Button } from "semantic-ui-react";
import { Formik, Form, Field } from 'formik';
import { NewEntry, HealthCheckEnum, HealthCheckRating } from '../types';
import { DiagnosisSelection, TextField, NumberField } from './EntryFormField';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnosis }] = useStateValue();

  return (
    <Formik
      initialValues={{
        type: HealthCheckEnum.HealthCheck, //default to HealthCheck
        specialist: "",
        employerName: "",
        sickLeave: {
          startDate: "",
          endDate: ""
        },
        discharge: {
          date: "",
          criteria: ""
        },
        healthCheckRating: HealthCheckRating.Healthy,
        description: "",
        date: "",
        diagnosisCodes: Array<string>()
      }}
      onSubmit={onSubmit}
      validate={values => {
        const isDate = (date: string): boolean => {
          return Boolean(Date.parse(date));
        };
        const requiredError = "Field is required!";
        const dateError = "Not a valid date!";
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        } else if (!isDate(values.date)) {
          errors.date = dateError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.description) {
          errors.description = requiredError;
        }
        if (values.diagnosisCodes.length > 0) {
          values.diagnosisCodes.forEach(d => {
            if (!(d in diagnosis)) {
              errors.diagnosisCodes = `Not a valid diagnosis code: ${d}`;
            }
          });
        }
        switch (values.type) {
          case HealthCheckEnum.HealthCheck:
            if (!(values.healthCheckRating in HealthCheckRating)) {
              errors.healthCheckRating = `Value must be in range 0 : ${Object.keys(HealthCheckRating).length}`;
            }
            break;
          case HealthCheckEnum.Hospital:
            if (values.discharge.date || values.discharge.criteria) {
              if (!values.discharge.date) {
                errors["discharge.date"] = "Missing date";
              } else if (!isDate(values.discharge.date)) {
                errors["discharge.date"] = dateError;
              } else if (!values.discharge.criteria) {
                errors["discharge.requiredError"] = requiredError;
              }
            }
            break;
          case HealthCheckEnum.OccupationalHealthcare:
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (values.sickLeave.endDate || values.sickLeave.startDate) {
              if (!values.sickLeave.startDate) {
                errors["sickLeave.startDate"] = requiredError;
              } else if (!isDate(values.sickLeave.startDate)) {
                errors["sickLeave.startDate"] = dateError;
              } else if (!values.sickLeave.endDate) {
                errors["sickLeave.endDate"] = requiredError;
              } else if (!isDate(values.sickLeave.endDate)) {
                errors["sickLeave.endDate"] = dateError;
              }
            }
            break;
          default:
            console.log("wtf");
            break;
        }
        return errors;
      }}
    >
    {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {

      return (
        <Form className="form ui">
          <Field
            as="select"
            name="type"
            label="Entry type"
          >
            <option value={HealthCheckEnum.HealthCheck}>Health check</option>
            <option value={HealthCheckEnum.Hospital}>Hospital stay</option>
            <option value={HealthCheckEnum.OccupationalHealthcare}>Occupational healthcare service</option>
          </Field>
          <Field
            label="Specialist"
            placeholder="Specialist name"
            name="specialist"
            component={TextField}
          />
          <Field
            label="Description"
            placeholder="describe entry here"
            name="description"
            component={TextField}
          />
          <Field
            label="Date"
            placeholder="MM/DD/YYYY"
            name="date"
            component={TextField}
          />
          <DiagnosisSelection
            setFieldValue={setFieldValue}
            setFieldTouched={setFieldTouched}
            diagnoses={Object.values(diagnosis)}
          /> 
          {values.type === HealthCheckEnum.HealthCheck &&
            <Field
            label="Health check rating"
            name="healthCheckRating"
            min={0}
            max={Object.keys(HealthCheckRating).length}
            component={NumberField}
          />
          }
          {values.type === HealthCheckEnum.Hospital &&
            <Field
            label="Discharge date"
            placeholder="MM/DD/YYYY"
            name="discharge.date"
            component={TextField}
          />
          }
          {values.type === HealthCheckEnum.Hospital &&
            <Field
            label="Discharge criteria"
            placeholder="criteria"
            name="discharge.criteria"
            component={TextField}
          />
          }
          {values.type === HealthCheckEnum.OccupationalHealthcare &&
            <Field
            label="Employer name"
            placeholder="name"
            name="employerName"
            component={TextField}
          /> 
          }
          {values.type === HealthCheckEnum.OccupationalHealthcare &&
            <Field
            label="Sick leave start date"
            placeholder="MM/DD/YYYY"
            name="sickLeave.startDate"
            component={TextField}
          /> 
          }
          {values.type === HealthCheckEnum.OccupationalHealthcare &&
            <Field
            label="Sick leave end date"
            placeholder="MM/DD/YYYY"
            name="sickLeave.endDate"
            component={TextField}
          /> 
          }
          <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
        </Form>
      );
    }}
  </Formik>
  );
};