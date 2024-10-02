import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const total = good + neutral + bad;
  const average = total > 0 ? ( good - bad ) / total : 0;
  const positive = total > 0 ?  ( good / total) * 100 : 0;

  const handleClick = (feedbackType) => {
    if (feedbackType === 'good') setGood(good + 1);
    if (feedbackType === 'neutral') setNeutral(neutral + 1);
    if (feedbackType === 'bad') setBad(bad + 1);
  };

  return (
    <div>
      <h3>Give feedback</h3>
      <button onClick={() => handleClick('good')}>Good</button>
      <button onClick={() => handleClick('neutral')}>Neutral</button>
      <button onClick={() => handleClick('bad')}>Bad</button>
      <h3>Statistics</h3>
      {total > 0 ? ( <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />      
      ) : ( <p>No feedback given</p>
      )}
    </div>
  )
}

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  return (
    <table>
      <StatisticLine text="Good: " value ={ good } />
      <StatisticLine text="Neutral: " value ={ neutral } />
      <StatisticLine text="Bad: " value ={ bad } />
      <StatisticLine text="All: " value ={ total } />
      <StatisticLine text="Average: " value ={ average } />
      <StatisticLine text="Positive" value ={ `${positive}%` } />
    </table>
  );
};

const StatisticLine = ( {text, value} ) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App