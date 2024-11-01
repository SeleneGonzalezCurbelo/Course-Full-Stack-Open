import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        console.log('addAnecdote')
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        // const newAnecdote = await anecdoteService.createNew(content)
        // dispatch(addAnecdote(newAnecdote))
        dispatch(createAnecdote(content))
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