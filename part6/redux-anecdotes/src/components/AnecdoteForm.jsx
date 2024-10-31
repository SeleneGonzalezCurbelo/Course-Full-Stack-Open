import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleAddAnecdote = (event) => {
        console.log('addAnecdote')
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))

        dispatch(setNotification(`Added anecdote: "${content}"`))

        setTimeout(() => {
            dispatch(clearNotification())
        }, 5000)
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