const Header = ({ course }) => {

    console.log(course)
    return (
      <div>
        <h1>{ course.name }</h1>
      </div>
    )
  }

  export default Header