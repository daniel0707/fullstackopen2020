import React from 'react'

const Header = (props) => {
    return (
      <>
        <h2>{props.course}</h2>
      </>
    )
  }
  
  const Content = ({ parts }) => {
    return (
      <div>
        {parts.map((part) => <Part part={part.name} exercises={part.exercises} />)}
      </div>
    )
  }
  
  const Total = (props) => {
    return (
      <>
        <p><b>total of exercises {props.parts.reduce((sum, current) => sum + current.exercises, 0)}</b></p>
      </>
    )
  }
  
  const Part = (props) => {
    return (
      <>
        <p>
          {props.part} {props.exercises}
        </p>
      </>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
    )
}
  
export default Course