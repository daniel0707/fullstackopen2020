import React from 'react';
import Header from './components/Header'
import Total from './components/Total'

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  /**
   * Helper function for exhaustive type checking
   */
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
  // new types
  interface CoursePartBase {
    name: string;
    exerciseCount: number;
  }
  interface CoursePartDescribed extends CoursePartBase{
    description: string;
  }
  interface CoursePartOne extends CoursePartDescribed {
    name: "Fundamentals";
  } 

  interface CoursePartTwo extends CoursePartBase {
    name: "Using props to pass data";
    groupProjectCount: number;
  }

  interface CoursePartThree extends CoursePartDescribed {
    name: "Deeper type usage";
    exerciseSubmissionLink: string;
  }

  interface CoursePartFour extends CoursePartDescribed {
    name: "With teacher";
    teacher: "New guy";
  }

  type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

  interface CourseProps {
    parts: Array<CoursePart>,
  }

  const Content: React.FC<CourseProps> = ({ parts }) => {
    return (
      <div>
        {parts.map(c => {
          return (
            <div key={c.name}>
              <Part course={c} />
            </div>
          )
        })}
      </div>
    )
  }

  interface CoursePartProps {
    course: CoursePart
  }

  const Part: React.FC<CoursePartProps> = ({ course }) => {
    switch (course.name) {
      case "Deeper type usage":
        return (
          <p>
            name: {course.name}<br />
            exercises: {course.exerciseCount}<br />
            description: {course.description}<br />
            exerciseSubmissionLink: {course.exerciseSubmissionLink}
          </p>
        )
      case "Fundamentals":
        return (
          <p>
            name: {course.name}<br />
            description: {course.description}<br />
            exercises: {course.exerciseCount}<br />
          </p>
        )
      case "Using props to pass data":
        return (
          <p>
            name: {course.name}<br />
            exercises: {course.exerciseCount}<br />
            groupProjectCount: {course.groupProjectCount}
          </p>
        )
      case "With teacher":
        return (
          <p>
            name: {course.name}<br />
            exercises: {course.exerciseCount}<br />
            description: {course.description}<br />
            teacher: {course.teacher}
          </p>
        )
      default:
        return assertNever(course)
    }
}
  
  
// this is the new coursePart variable
const courseParts: CoursePart[] = [
  {
    name: "Fundamentals",
    exerciseCount: 10,
    description: "This is an awesome course part"
  },
  {
    name: "Using props to pass data",
    exerciseCount: 7,
    groupProjectCount: 3
  },
  {
    name: "Deeper type usage",
    exerciseCount: 14,
    description: "Confusing description",
    exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
  },
  {
    name: "With teacher",
    exerciseCount: 10,
    description: "This is an awesome course part",
    teacher: "New guy"
  },
];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts}/>
      <Total parts={courseParts}/>
    </div>
/*     <div>
      <h1>{courseName}</h1>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
      <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div> */
  );
};

export default App;
