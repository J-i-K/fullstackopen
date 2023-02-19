const Part = ({ part }) => {
    console.log("Part props: ", part)
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
}

export default Part