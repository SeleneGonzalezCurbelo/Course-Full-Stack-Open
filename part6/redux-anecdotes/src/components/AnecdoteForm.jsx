import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        console.log('addAnecdote')
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`Added anecdote: '${content}'`, 5))
    }
  
    return (
    <div>
        <h2>Create New Anecdote</h2>
        <form onSubmit={handleAddAnecdote}>
        <div><input name="anecdote" /></div>
        <button type="submit">Create</button>
        </form>
    </div>
    )
}
  export default AnecdoteForm