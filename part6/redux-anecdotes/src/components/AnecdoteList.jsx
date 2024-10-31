import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

    
    const dispatch = useDispatch()
    
    const { anecdotes, filter } = useSelector(state => state)

    const filteredAnecdotes = anecdotes
      .filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => b.votes - a.votes)
    
    const vote = (id) => {
        console.log('vote', id)
        dispatch(voteAnecdote(id)) 
    }

    return (
        <div>
            {filteredAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList