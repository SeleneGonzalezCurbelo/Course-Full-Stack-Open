import Part from './Part'

const Content = ({ parts }) => {
    const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        {parts.map(part =>
          <Part key={ part.id } part={ part } />
        )}
        <p><strong>Total of exercises: { totalExercises }</strong></p>
      </div>
    )
  }

  export default Content