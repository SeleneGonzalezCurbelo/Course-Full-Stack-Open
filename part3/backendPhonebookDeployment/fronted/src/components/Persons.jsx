import '../index.css';

const Persons = ({ persons, handleDelete }) => {
  return (
    <div>
      {persons.map(person => (
        <div className='Numbers' key={person.id} style={{ display: 'flex'}}>
          <p>{person.name} {person.number}</p>
          <button className="Delete-button" onClick={() => handleDelete(person.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default Persons;
