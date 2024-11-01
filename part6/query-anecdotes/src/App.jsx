import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, createAnecdote, updateAnecdote } from './requests'
import { useState } from 'react'

const App = () => {
  const [notification, setNotification] = useState('')
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      setNotification('Anecdote successfully added')
      setTimeout(() => {
        setNotification('') 
      }, 5000)
    },
  })

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => 
        oldAnecdotes.map(anecdote => 
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
        )
      )
      setNotification(`You voted for "${updatedAnecdote.content}"`)
      setTimeout(() => {
        setNotification('')
      }, 5000)
    },
  })

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false,
  })

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return <div>Anecdote service is not available due to server issues.</div>
  }

  const anecdotes = result.data

  const handleVote = (anecdote) => {
    console.log('vote')
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
  }

  const addAnecdote = (content) => {
    if (content.length < 5) {
      setNotification('The content of the anecdote must be at least 5 characters')
      setTimeout(() => {
        setNotification('')
      }, 5000)
      return
    }
    newAnecdoteMutation.mutate({ content, votes: 0 })
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification message={notification} /> {}
      <AnecdoteForm addAnecdote={addAnecdote} />
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App