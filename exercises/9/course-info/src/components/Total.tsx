import React from 'react';

interface Course {
    name: string;
    exerciseCount: number;
}

interface CourseProps {
  parts: Array<Course>
}

const Total: React.FC<CourseProps> = ({ parts }) => {
  return (
    <div>
      Total of exercises: {parts.reduce((sum,c)=> sum+c.exerciseCount,0)}
    </div>
  )
}

export default Total