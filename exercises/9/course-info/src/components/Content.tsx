import React from 'react';

interface Course {
    name: string;
    exerciseCount: number;
}

interface CourseProps {
  parts: Array<Course>
}

const Content: React.FC<CourseProps> = ({ parts }) => {
  return (
    <div>
      {parts.map(c => {
        return(<p key={c.name}>
          name: {c.name}<br />
          exercises: {c.exerciseCount}<br/>
        </p>)
      })}
    </div>
  )
}

export default Content