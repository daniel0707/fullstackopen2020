import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Header, Icon, SemanticICONS, Loader, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { apiBaseUrl } from "../constants";
import { Patient, Gender, NewEntry } from '../types';
import { useStateValue, addPatient } from "../state";
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';

const PatientDetailsPage: React.FC = () => {
  const [patientDetails, setPatientDetails] = useState<Patient | null>(null);
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnosis }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: modifiedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addPatient(modifiedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };

  const getPatient = async () => {
    try {
      const patient = await axios.get(`${apiBaseUrl}/patients/${id}`);
      dispatch(addPatient(patient.data));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
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
    return (<Loader>Loading...</Loader>);
  }
  return (
    <div>
      <Header as='h1'>{patientDetails.name}<Icon name={genderToIcon(patientDetails.gender)} /></Header>
      <p>ssn: {patientDetails.ssn}</p>
      <p>birthday: {patientDetails.dateOfBirth}</p>
      <p>occupation: {patientDetails.occupation}</p>
      {patientDetails.entries.length > 0 && <Header as='h3'>Entries</Header> }
      {patientDetails.entries.map(entry =>{
        if (Object.keys(diagnosis).length > 0) {
          return <EntryDetails key={entry.id} entry={entry} />;
        } else {
          return <Loader key={entry.id}/>;
        }
      }
      )}
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>

    </div>
  );
};

export default PatientDetailsPage;