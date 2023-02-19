const Header = ({ course }) => {
    console.log("Header props: ", course)
    return (
        <h2>{course.name}</h2>
    )
}

export default Header