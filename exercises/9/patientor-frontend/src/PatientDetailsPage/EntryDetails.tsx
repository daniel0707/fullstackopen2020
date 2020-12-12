import React from 'react';
import { Card, Icon, SemanticICONS, SemanticCOLORS, Header } from 'semantic-ui-react';
import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEnum, HealthCheckRating } from '../types';
import { useStateValue } from '../state';

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  const [{ diagnosis }] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  const entryTypeToIcon = (entryType: HealthCheckEnum): SemanticICONS => {
    switch (entryType) {
      case HealthCheckEnum.HealthCheck:
        return "clipboard check";
      case HealthCheckEnum.Hospital:
        return "hospital";
      case HealthCheckEnum.OccupationalHealthcare:
        return "user md";
      default:
        return assertNever(entryType);
    }
  };

  const BaseEntryDetails: React.FC<{ entry: Entry; children?: React.ReactElement }> = (props) => {
    return (
      <Card>
        <Card.Content>
        <Card.Header>
          {props.entry.date} <Icon name={entryTypeToIcon(entry.type)} />
        </Card.Header>
        <Card.Meta>
          <strong>Specialist:</strong>
          {entry.specialist}
        </Card.Meta>
        <Card.Description>
          {entry.description}
        </Card.Description>
        </Card.Content>
        {entry.diagnosisCodes &&
          <Card.Content>
          <Header as="h4">Diagnosed codes:</Header>
          <ul style={{ listStyleType: "none", padding:"0" }}>
            {entry.diagnosisCodes.map(code => {
              return (
                <li key={code}>
                  {code} {diagnosis[code].name}
                </li>
              );
            })}
          </ul>
        </Card.Content>
        }
        {props.children &&
          <Card.Content >
            {props.children}
          </Card.Content>
        }
      </Card>
    );
  };
  const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
    const HealthCheckRatingToIcon =
      (rating: HealthCheckRating):
        { icon: SemanticICONS; color: SemanticCOLORS } => {
      switch (rating) {
        case HealthCheckRating.Healthy:
          return {
            icon: "heart",
            color: "green"
          };
        case HealthCheckRating.LowRisk:
          return {
            icon: "heart",
            color: "yellow"
          };
        case HealthCheckRating.HighRisk:
          return {
            icon: "heart",
            color: "orange"
          };
        case HealthCheckRating.CriticalRisk:
          return {
            icon: "heart",
            color: "red"
          };
        default:
          return assertNever(rating);
      }
      };
    
    return (
      <BaseEntryDetails entry={entry}>
        <Icon
          name={HealthCheckRatingToIcon(entry.healthCheckRating).icon}
          color={HealthCheckRatingToIcon(entry.healthCheckRating).color}
          />
      </BaseEntryDetails>
    );
  };

  const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
    return (
      <BaseEntryDetails entry={entry}>
        {entry.discharge && 
          <p>
            <strong>Discharged:</strong><br />
            {entry.discharge.date}: <em>{entry.discharge.criteria}</em>
          </p>
        }
      </BaseEntryDetails>
    );
  };

  const OccupationalHealthcareEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
    return (
      <BaseEntryDetails entry={entry}>
        <div>
          <strong>{entry.employerName}</strong>
          {entry.sickLeave && 
          <p>Sick leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
          }
        </div>
      </BaseEntryDetails>
    );
  };

  switch (entry.type) {
    case HealthCheckEnum.HealthCheck:
      return HealthCheckEntryDetails({ entry });
    case HealthCheckEnum.Hospital:
      return HospitalEntryDetails({ entry });
    case HealthCheckEnum.OccupationalHealthcare:
      return OccupationalHealthcareEntryDetails({ entry });
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;