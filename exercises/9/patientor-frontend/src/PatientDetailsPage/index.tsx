import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Icon, SemanticICONS } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient, Gender } from '../types';
import { useStateValue, addPatient } from "../state";

const PatientDetailsPage: React.FC = () => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();

  const getPatient = async () => {
    try {
      const patient = await axios.get(`${apiBaseUrl}/patients/${id}`);
      dispatch(addPatient(patient.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    console.log(patientDetails);
    if (patients) {
      if (patients[id]?.ssn !== undefined) {
        setPatientDetails(patients[id]);
      } else {
        getPatient();
      }
    }
  }, [patients]);
  
  const genderToIcon = (gender: Gender): SemanticICONS => {
    switch (gender) {
      case 'male':
        return 'mars';
      case 'female':
        return 'venus';
      default:
        return 'genderless';
    }
  };
  if (!patientDetails) {
    return (<div>Loading...</div>);
  }
  return (
    <div>
      <Header as='h1'>{patientDetails.name}<Icon name={genderToIcon(patientDetails.gender)} /></Header>
      <p>ssn: {patientDetails.ssn}</p>
      <p>birthday: {patientDetails.dateOfBirth}</p>
      <p>occupation: {patientDetails.occupation}</p>
      {patientDetails.entries.length > 0 && <Header as='h3'>entries</Header> }
      {patientDetails.entries.map(entry => {
          return (
            <div key={entry.id}>
              <p>
                <b>{entry.date} </b>
                <i>{entry.description}</i>
              </p>
              <ul>
                {entry.diagnosisCodes?.map(code => {
                  return (
                    <li key={code}>
                      {code} {diagnosis[code].name}
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
    </div>
  );
};

export default PatientDetailsPage;