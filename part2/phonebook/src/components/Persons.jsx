const Persons = (props) => {
    return (
        <ul>
            {props.filteredNumbers().map(person => {
                return (
                    <div key={person.id}>
                        <li> {person.name} {person.number}</li>
                        <button onClick={() => props.handleEraseButton(person.id, person.name)}>delete</button>
                    </div>
                )
            })}
        </ul>
    )
}

export default Persons