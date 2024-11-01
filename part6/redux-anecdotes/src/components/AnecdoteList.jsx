import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {

    const dispatch = useDispatch()
    
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const vote = (id) => {
        console.log('vote', id)
        const anecdote = anecdotes.find(anecdote => anecdote.id === id)
        dispatch(voteAnecdote(id)) 
        dispatch(setNotification(`You voted for '${anecdote.content}'`, 5))
    }

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )

    const sortedAnecdotes = [...filteredAnecdotes].sort((a, b) => b.votes - a.votes)

    return (
        <div>
            {sortedAnecdotes.length === 0 ? (
                <div>No anecdotes were found that matched the filter</div>
            ) : (
            sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default AnecdoteList