const Total = ({ course }) => {
    console.log("Total props: ", course)
    let initialValue = 0;
    return (
        <b>Total number of exercises {course.parts.map(
            part => part.exercises).reduce((
            totalValue, currentValue) => 
            totalValue + currentValue, initialValue)}
        </b>
    )
}

export default Total