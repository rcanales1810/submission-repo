const Filter = (props) => {
    return (
        <>
            <p>filter shown with</p>
            <div><input
                value={props.nameToFilter}
                onChange={props.handleFilterChange} />
            </div>
        </>
    )
}

export default Filter