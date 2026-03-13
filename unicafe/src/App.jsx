import { useState } from 'react'

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>
const Header = () => <h1>give feedback, bucko</h1>
const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const Stats = (props) => (
  <>
    <h1>stats</h1>

    {props.total === 0 ? (<p>No feedback given</p>) :
      (
        <table>
          <tbody>
            <Statistic text={'good'} value={props.good} />
            <Statistic text={'neutral'} value={props.neutral} />
            <Statistic text={'bad'} value={props.bad} />
            <Statistic text={'all'} value={props.total} />
            <Statistic text={'average'} value={props.average} />
            <Statistic text={'positive'} value={props.positive + '%'} />
          </tbody>
        </table>
      )}
  </>
)



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // save the total clicks made
  const sum = good + bad + neutral

  // compute the average
  const average = ((good - bad) / sum).toFixed(1)

  // compute the positive rating percentage
  const positive = (100 * (good / sum)).toFixed(1)


  const handleGood = () => setGood(good + 1)

  const handleNeutral = () => setNeutral(neutral + 1)

  const handleBad = () => setBad(bad + 1)

  return (
    <>
      <Header />
      <Button onClick={handleGood} text={'good'} />
      <Button onClick={handleNeutral} text={'neutral'} />
      <Button onClick={handleBad} text={'bad'} />
      <Stats good={good} neutral={neutral} total={sum} bad={bad} average={average} positive={positive} />
    </>
  )
}

export default App
