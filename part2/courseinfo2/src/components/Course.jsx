const Course = (props) => {
  console.log(props)
  return (
    <div>
      {
        props.courses.map(course =>
          <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Stats course={course.parts} />
          </div>
        )
      }
    </div>
  )
}

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      {props.parts.map(part =>
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Stats = (props) => {
  const total = props.course.reduce(function (sum, part) {
    console.log(sum, part.exercises);
    return sum + part.exercises
  }, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

export default Course