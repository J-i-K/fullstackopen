import Header from './Header'
import Content from './Content'

const Course = ({ course }) => {
    console.log("Course props: ", course)
    return (
        <div>
            <Header course={course} />
            <Content course={course} />
        </div>
    )
}

export default Course